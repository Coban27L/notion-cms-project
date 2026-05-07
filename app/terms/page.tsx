import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "이용약관",
  description: "이용약관 및 서비스 약관",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 헤더 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">이용약관</h1>
        <p className="text-lg text-muted-foreground">
          당사 서비스 이용 시 다음의 약관에 동의하는 것으로 간주됩니다. 서비스를
          사용하기 전에 약관을 주의 깊게 읽어주시기 바랍니다.
        </p>
      </section>

      {/* 약관 섹션 */}
      <div className="space-y-6">
        {/* 서비스 사용 조건 */}
        <Card>
          <CardHeader>
            <CardTitle>서비스 사용 조건</CardTitle>
            <CardDescription>기본적인 사용 규칙</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              당사는 당 서비스를 &quot;있는 그대로&quot; 제공합니다. 귀하는 다음
              조건에 동의합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>서비스는 개인적, 비상업적 목적으로만 사용</li>
              <li>불법적인 활동에 서비스 사용 금지</li>
              <li>다른 사용자의 권리 침해 금지</li>
              <li>당사가 정한 규칙 및 정책 준수</li>
              <li>16세 이상의 나이 요구</li>
            </ul>
          </CardContent>
        </Card>

        {/* 사용자 계정 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 계정</CardTitle>
            <CardDescription>계정 생성 및 관리 규칙</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              계정을 생성하신 경우, 다음의 책임이 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>정확한 정보로 계정 등록</li>
              <li>계정 보안 유지</li>
              <li>계정 활동에 대한 책임</li>
              <li>암호 기밀유지</li>
              <li>불법적 또는 부정행위 금지</li>
            </ul>
          </CardContent>
        </Card>

        {/* 지적재산권 */}
        <Card>
          <CardHeader>
            <CardTitle>지적재산권</CardTitle>
            <CardDescription>콘텐츠 및 저작권</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              당사 서비스에 포함된 모든 콘텐츠는 당사의 지적재산권으로
              보호됩니다. 여기에는 텍스트, 그래픽, 로고, 이미지, 소프트웨어 및
              기타 콘텐츠가 포함됩니다.
            </p>
            <p className="text-sm">
              당사의 명시적 동의 없이 콘텐츠의 수정, 복제, 배포 또는 사용을
              금지합니다.
            </p>
          </CardContent>
        </Card>

        {/* 사용자 콘텐츠 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 콘텐츠</CardTitle>
            <CardDescription>귀하가 게시한 콘텐츠에 대한 규칙</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              당사 서비스에 콘텐츠를 게시함으로써 귀하는:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>콘텐츠에 대한 모든 권리를 소유함을 나타냅니다</li>
              <li>당사에 콘텐츠 사용 권한을 부여합니다</li>
              <li>게시된 콘텐츠에 대한 책임을 집니다</li>
              <li>불법적 또는 해로운 콘텐츠 게시 금지</li>
            </ul>
          </CardContent>
        </Card>

        {/* 책임 제한 */}
        <Card>
          <CardHeader>
            <CardTitle>책임 제한</CardTitle>
            <CardDescription>
              서비스 이용으로 인한 손해배상 제한
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              어떤 상황에서도 당사는 다음에 대해 책임을 지지 않습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>간접적, 특수한, 부수적 손해</li>
              <li>이익 손실</li>
              <li>데이터 손상</li>
              <li>서비스 중단으로 인한 손해</li>
            </ul>
            <p className="text-sm mt-4">
              일부 지역에서는 책임 제한을 허용하지 않을 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 서비스 변경 및 중단 */}
        <Card>
          <CardHeader>
            <CardTitle>서비스 변경 및 중단</CardTitle>
            <CardDescription>서비스 수정 및 종료 권리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">당사는 다음의 권리를 보유합니다:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>통지 없이 서비스 수정 또는 중단</li>
              <li>특정 기능 추가 또는 제거</li>
              <li>서비스 운영 중단</li>
              <li>사용자 계정 중단 또는 종료</li>
            </ul>
          </CardContent>
        </Card>

        {/* 약관 변경 */}
        <Card>
          <CardHeader>
            <CardTitle>약관 변경</CardTitle>
            <CardDescription>이용약관 업데이트</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              당사는 언제든지 이 약관을 변경할 권리를 보유합니다. 변경사항은 이
              페이지에 게시되며, 변경된 약관 사용은 동의를 의미합니다. 중요한
              변경사항에 대해서는 사전 통지를 제공할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 문의 및 분쟁 해결 */}
        <Card>
          <CardHeader>
            <CardTitle>문의 및 분쟁 해결</CardTitle>
            <CardDescription>약관 관련 문의</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              이용약관에 대한 질문이나 분쟁이 있는 경우, 먼저 당사에 문의해
              주시기 바랍니다. 대부분의 문제는 직접 통신을 통해 해결될 수
              있습니다.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 약관 동의 */}
      <div className="rounded-lg border border-muted bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          당사 서비스를 계속 사용함으로써 귀하는 이 약관의 모든 조건에 동의하는
          것입니다. 약관에 동의하지 않으실 경우, 서비스 사용을 중단해 주시기
          바랍니다. 마지막 업데이트: 2026년 4월.
        </p>
      </div>
    </div>
  );
}
