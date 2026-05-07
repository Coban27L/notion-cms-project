import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "개인정보 보호",
  description: "개인정보 보호 정책",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 헤더 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">개인정보 보호 정책</h1>
        <p className="text-lg text-muted-foreground">
          당사는 개인정보 보호를 매우 중요하게 생각합니다. 이 정책은 귀하의
          정보가 어떻게 수집, 사용 및 보호되는지 설명합니다.
        </p>
      </section>

      {/* 정책 섹션 */}
      <div className="space-y-6">
        {/* 수집하는 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>수집하는 정보</CardTitle>
            <CardDescription>우리가 수집하는 개인정보의 종류</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              우리는 다음과 같은 정보를 수집할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>이름, 이메일 주소, 전화번호 등의 연락처 정보</li>
              <li>계정 생성 및 관리에 필요한 정보</li>
              <li>서비스 이용 기록 및 활동 데이터</li>
              <li>기술 정보 (IP 주소, 브라우저 유형, 기기 정보 등)</li>
            </ul>
          </CardContent>
        </Card>

        {/* 정보 사용 목적 */}
        <Card>
          <CardHeader>
            <CardTitle>정보 사용 목적</CardTitle>
            <CardDescription>
              수집된 정보는 다음의 목적으로 사용됩니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              수집된 개인정보는 다음과 같은 목적으로만 사용됩니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>서비스 제공 및 개선</li>
              <li>사용자 지원 및 고객 서비스</li>
              <li>법적 의무 이행</li>
              <li>통신 및 알림 발송</li>
              <li>보안 및 사기 방지</li>
            </ul>
          </CardContent>
        </Card>

        {/* 정보 보호 */}
        <Card>
          <CardHeader>
            <CardTitle>정보 보호</CardTitle>
            <CardDescription>당사의 보안 조치</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              당사는 귀하의 개인정보를 보호하기 위해 업계 표준의 보안 조치를
              취합니다. 여기에는 암호화, 보안 서버, 그리고 접근 제어가
              포함됩니다. 다만, 인터넷 전송의 완전한 보안을 보장할 수 없음을
              이해하시기 바랍니다.
            </p>
          </CardContent>
        </Card>

        {/* 보유 기간 */}
        <Card>
          <CardHeader>
            <CardTitle>정보 보유 기간</CardTitle>
            <CardDescription>개인정보 보관 기간</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              당사는 법률이 요구하지 않는 한 필요한 기간 동안만 개인정보를
              보관합니다. 서비스 목적이 달성되거나 사용자가 요청하면 개인정보는
              삭제 또는 익명화됩니다.
            </p>
          </CardContent>
        </Card>

        {/* 권리 */}
        <Card>
          <CardHeader>
            <CardTitle>귀하의 권리</CardTitle>
            <CardDescription>개인정보에 대한 접근 및 관리 권리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">귀하는 다음과 같은 권리를 가집니다:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>귀하의 정보 접근 권리</li>
              <li>부정확한 정보 수정 권리</li>
              <li>정보 삭제 요청 권리</li>
              <li>정보 처리 제한 요청 권리</li>
            </ul>
            <p className="text-sm mt-4">
              이러한 권리를 행사하려면 당사에 문의하시기 바랍니다.
            </p>
          </CardContent>
        </Card>

        {/* 문의 */}
        <Card>
          <CardHeader>
            <CardTitle>문의</CardTitle>
            <CardDescription>개인정보 관련 문의</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              개인정보 보호 정책에 대한 질문이 있으시거나 개인정보 요청이 있으신
              경우, 언제든지 당사에 문의해 주시기 바랍니다.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 정책 업데이트 */}
      <div className="rounded-lg border border-muted bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          마지막 업데이트: 2026년 4월. 당사는 이 정책을 수시로 업데이트할 수
          있습니다. 변경사항은 이 페이지에 게시되며, 귀하는 정기적으로 확인할
          것을 권장합니다.
        </p>
      </div>
    </div>
  );
}
