import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { CTASection } from "@/components/sections/cta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "노션 CMS 견적서 시스템",
  description:
    "노션을 CMS로 활용하여 견적서를 작성하고, 클라이언트가 고유 링크로 웹에서 확인 및 PDF 다운로드할 수 있는 시스템",
  url: "https://notion-cms.example.com",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  creator: {
    "@type": "Organization",
    name: "견적서쓰",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
