import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-2xl font-semibold mt-2">
            페이지를 찾을 수 없습니다
          </p>
        </div>
        <p className="text-muted-foreground max-w-sm">
          죄송합니다. 요청하신 견적서나 페이지를 찾을 수 없거나 삭제되었습니다.
        </p>
        <Link href="/">
          <Button size="lg">홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
