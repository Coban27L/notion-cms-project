import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseIcon, LinkIcon, FileDownIcon } from 'lucide-react';

const features = [
  {
    id: 1,
    title: '노션 CMS 연동',
    description: '노션 데이터베이스에서 견적서를 작성하면 웹에서 자동으로 렌더링됩니다. 별도의 코딩 없이 노션만으로 견적서를 관리하세요.',
    icon: DatabaseIcon,
  },
  {
    id: 2,
    title: '고유 링크 공유',
    description: 'UUID 기반의 고유 링크를 생성하여 클라이언트에게 전달하세요. 로그인 없이도 견적서를 확인할 수 있습니다.',
    icon: LinkIcon,
  },
  {
    id: 3,
    title: 'PDF 다운로드',
    description: '견적서를 PDF 파일로 다운로드할 수 있습니다. 한글 폰트를 지원하며 인쇄에 최적화된 레이아웃을 제공합니다.',
    icon: FileDownIcon,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">핵심 기능</h2>
          <p className="text-lg text-muted-foreground">
            프리랜서와 소규모 팀을 위한 견적서 관리의 모든 것
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="mb-3 p-2 w-fit rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
