import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

type ActivityStatus = "success" | "warning" | "info";

interface Activity {
  id: number;
  action: string;
  time: string;
  status: ActivityStatus;
}

interface DashboardPageProps {
  searchParams: Promise<{ tab?: string }>;
}

// Next.js 16: searchParams는 Promise 타입이므로 반드시 await 사용
export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { tab = "overview" } = await searchParams;

  const stats = [
    {
      id: 1,
      title: "총 사용자",
      value: "1,234",
      icon: Users,
      trend: "+12%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      title: "활성 세션",
      value: "567",
      icon: Activity,
      trend: "+8%",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      title: "총 수익",
      value: "$45,231",
      icon: TrendingUp,
      trend: "+23%",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      title: "전환율",
      value: "3.45%",
      icon: BarChart3,
      trend: "-1.2%",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentActivity: Activity[] = [
    { id: 1, action: "새 사용자 가입", time: "5분 전", status: "success" },
    { id: 2, action: "페이 결제 완료", time: "12분 전", status: "success" },
    { id: 3, action: "시스템 업데이트", time: "1시간 전", status: "info" },
    { id: 4, action: "API 한계 도달", time: "2시간 전", status: "warning" },
    { id: 5, action: "백업 완료", time: "5시간 전", status: "success" },
  ];

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground mt-2">
          시스템 성능 및 활동 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <Badge variant="outline" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue={tab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="reports">리포트</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>지난 24시간의 주요 활동</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === "success"
                          ? "default"
                          : item.status === "warning"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {item.status === "success"
                        ? "성공"
                        : item.status === "warning"
                          ? "경고"
                          : "정보"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 분석 탭 */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>분석 데이터</CardTitle>
              <CardDescription>상세 분석 데이터는 여기에 표시됩니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center text-muted-foreground">
                분석 차트를 여기에 추가하세요
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 리포트 탭 */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>리포트</CardTitle>
              <CardDescription>정기 리포트 내용이 여기에 표시됩니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center text-muted-foreground">
                리포트 데이터를 여기에 추가하세요
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
