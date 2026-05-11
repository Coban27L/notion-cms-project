import { getQuoteByToken } from "@/lib/notion/queries";
import { getMockQuoteByToken } from "@/lib/mock/quotes";

async function getBrowser() {
  // 로컬 개발 환경: 전체 puppeteer (Chrome 자동 탐색)
  if (process.env.NODE_ENV === "development") {
    const puppeteer = await import("puppeteer");
    return puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
    });
  }

  // 프로덕션 환경 (Vercel 등 서버리스): puppeteer-core + chromium-min
  const puppeteer = await import("puppeteer-core");
  const chromium = await import("@sparticuz/chromium-min");

  const executablePath = await chromium.default.executablePath(
    "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar",
  );

  return puppeteer.default.launch({
    args: chromium.default.args || [],
    defaultViewport: { width: 1280, height: 720 },
    executablePath,
    headless: true,
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  try {
    console.log(`[PDF] PDF 생성 시작 - token: ${token}`);

    // 견적서 데이터 존재 확인
    let quote = await getQuoteByToken(token);
    if (!quote) {
      console.warn(`[PDF] Notion에서 찾을 수 없음, mock 데이터 시도`);
      const mockQuote = getMockQuoteByToken(token);
      if (mockQuote) {
        quote = mockQuote;
        console.log(`[PDF] Mock 데이터 사용: ${mockQuote.title}`);
      } else {
        return new Response("견적서를 찾을 수 없습니다.", { status: 404 });
      }
    }

    // Puppeteer로 PDF 생성
    const browser = await getBrowser();
    let page;

    try {
      page = await browser.newPage();

      // 페이지 방문
      const pageUrl = `${request.url.split("/api/")[0]}/quotes/${token}`;
      console.log(`[PDF] 페이지 로드 중: ${pageUrl}`);

      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // 한글 폰트 명시적 로드 및 강제 렌더링
      await page.addStyleTag({
        content: `
          * {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif !important;
          }
          body {
            font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          }
          @font-face {
            font-family: "Noto Sans KR";
            src: url("https://fonts.gstatic.com/s/notosanskr/v42/-F6sfjtqLzI2JPCgQBnw7HFQYwhYHg.woff2") format("woff2");
            font-weight: 400;
            font-display: block;
          }
          @font-face {
            font-family: "Noto Sans KR";
            src: url("https://fonts.gstatic.com/s/notosanskr/v42/-F6_fjtqLzI2JPCgQBnw7HFQYwhYHg.woff2") format("woff2");
            font-weight: 700;
            font-display: block;
          }
        `,
      });

      // 한글 폰트 로드 대기 및 강제 리페인트
      await page.evaluate(() => {
        document.body.style.opacity = "1";
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("[PDF] 한글 폰트 로드 완료");

      // PDF 생성 (Tailwind CSS 포함 렌더링)
      const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
          top: "20mm",
          right: "20mm",
          bottom: "20mm",
          left: "20mm",
        },
        printBackground: true,
      });

      console.log(`[PDF] PDF 생성 완료 - 크기: ${pdfBuffer.length}bytes`);

      // 파일명 생성
      const issuedDate = quote.issuedDate
        ? new Date(quote.issuedDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const sanitizedClientName =
        quote.clientName.replace(/[^a-zA-Z0-9_-]/g, "") || "quote";
      const asciiFilename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;
      const encodedClientName = encodeURIComponent(quote.clientName);
      const rfc5987Filename = `QT-${issuedDate}-${quote.id}_${encodedClientName}.pdf`;

      return new Response(Buffer.from(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${rfc5987Filename}`,
          "Content-Length": pdfBuffer.length.toString(),
        },
      });
    } finally {
      // 브라우저 리소스 정리
      if (page) {
        await page.close();
      }
      await browser.close();
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[PDF] PDF 생성 실패:", errorMessage);
    console.error("[PDF] 전체 에러:", error);
    return new Response(`PDF 생성에 실패했습니다: ${errorMessage}`, {
      status: 500,
    });
  }
}
