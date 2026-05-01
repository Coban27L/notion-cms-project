# 배포 가이드

노션 CMS 견적서 시스템을 프로덕션 환경에 배포하기 위한 단계별 가이드입니다.

## 사전 준비

### 1. Notion 통합 설정

1. [Notion Integrations](https://www.notion.so/profile/integrations/internal/)에서 새 통합 생성
2. 통합 이름: "견적서쓰" (또는 원하는 이름)
3. 다음 권한 활성화: Read, Update, Create

### 2. 환경 변수 설정

`.env.production` 파일 생성 (커밋하지 말 것):

```bash
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_ITEMS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password_here
NEXTAUTH_SECRET=openssl rand -base64 32로 생성된 값
NEXTAUTH_URL=https://yourdomain.com
```

## Vercel 배포

### 1. GitHub 저장소에 푸시

```bash
git push origin main
```

### 2. Vercel 대시보드에서 임포트

https://vercel.com/dashboard → Import Project → GitHub 저장소 선택

### 3. 환경 변수 설정

Vercel 프로젝트 → Settings → Environment Variables에 위 변수들 추가

### 4. 도메인 설정

Vercel 프로젝트 → Domains → 커스텀 도메인 추가 → DNS 레코드 설정

### 5. 배포

```bash
vercel deploy --prod
```

## 배포 후 확인

- ✅ 로그인 기능
- ✅ 대시보드 접근
- ✅ PDF 다운로드
- ✅ HTTPS 활성화
- ✅ Lighthouse 성능 > 80

## 트러블슈팅

**Notion API 오류**: DATABASE_ID 확인, 통합 공유 확인
**NEXTAUTH 오류**: NEXTAUTH_SECRET 32자 이상 확인
**PDF 생성 오류**: public/fonts/ 디렉토리 확인

자세한 정보는 README.md와 CLAUDE.md 참조.
