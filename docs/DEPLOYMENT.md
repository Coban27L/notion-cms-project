# 배포 가이드

노션 CMS 견적서 시스템을 Vercel에 배포하는 방법을 설명합니다.

## 사전 준비

### 1. Notion API 설정

1. [Notion 통합 페이지](https://www.notion.so/profile/integrations)로 이동
2. 새 통합 생성 → "Internal Integration Token" 복사
3. 견적서 데이터베이스 선택 → 통합 권한 부여

### 2. 환경 변수 준비

`.env.example` 파일을 참고하여 다음 정보를 준비합니다:

```bash
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxx
NOTION_ITEMS_DATABASE_ID=xxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=strong-password-here
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-jwt-secret-key
```

**프로덕션 보안 주의:**
- `ADMIN_PASSWORD`: 강력한 비밀번호 사용
- `NEXTAUTH_SECRET`: `openssl rand -base64 32` 로 생성
- 모든 민감정보는 Vercel Secrets에 저장 (Git에 커밋하지 않기)

## Vercel 배포

### 1. Vercel 프로젝트 생성

```bash
# 방법 1: 터미널에서 배포
npm install -g vercel
vercel

# 방법 2: Vercel 대시보드에서
# https://vercel.com/dashboard → Add New → Project → GitHub 연동
```

### 2. 환경 변수 설정

Vercel 대시보드에서:
1. Project Settings → Environment Variables
2. 각 환경에서 변수 설정:
   - **Production**: `NEXTAUTH_URL=https://yourdomain.com`
   - **Preview**: `NEXTAUTH_URL=https://[deployment-url]`
   - **Development**: `NEXTAUTH_URL=http://localhost:3000`

### 3. 배포

```bash
git push origin main
# 또는
vercel --prod
```

## 운영 환경 체크리스트

### 보안

- [ ] HTTPS/SSL 인증서 유효 (Vercel 자동 설정)
- [ ] `NEXTAUTH_SECRET` 강력한 값으로 설정
- [ ] `ADMIN_PASSWORD` 복잡한 비밀번호 사용
- [ ] `.env.local` Git에 추가되지 않음 (`.gitignore` 확인)
- [ ] Notion API 토큰 유출 방지 (Secret Manager 사용)

### 성능

- [ ] Lighthouse 점수 측정 (Core Web Vitals 확인)
- [ ] API 응답 시간 모니터링
- [ ] 캐싱 전략 동작 확인 (1시간 캐시)
- [ ] Rate Limit 모니터링

### SEO

- [ ] `robots.txt` 생성 (`/robots.ts`)
- [ ] `sitemap.xml` 생성 (`/sitemap.ts`)
- [ ] 메타 데이터 설정 (`generateMetadata`)
- [ ] Open Graph 이미지 설정
- [ ] 구조화된 데이터 (JSON-LD) 추가

### 모니터링

- [ ] Sentry 에러 추적 통합
- [ ] Vercel Analytics 활성화
- [ ] 로깅 시스템 구축 (로그 수집)
- [ ] 성능 모니터링 대시보드 설정

## 트러블슈팅

### Notion API 오류

```
Error: NOTION_API_KEY not provided
```
→ Vercel 환경 변수 확인

### 인증 오류

```
Error: NEXTAUTH_SECRET not provided
```
→ `NEXTAUTH_SECRET` 설정 확인 (프로덕션 필수)

### 데이터베이스 접근 오류

```
Error: Database not found
```
→ Notion 데이터베이스 ID 확인 및 통합 권한 재설정

## 자동 배포

Vercel은 GitHub과 자동 연동:

1. `main` 브랜치 push → 프로덕션 배포
2. PR 생성 → 미리보기 배포 (Preview URL)
3. 배포 상태 → GitHub PR 댓글로 표시

## 롤백 (배포 이전 버전으로 복구)

1. Vercel 대시보드 → Deployments
2. 이전 배포 선택 → "Promote to Production"
3. 자동으로 프로덕션 URL 변경

## 커스텀 도메인

1. Vercel Project Settings → Domains
2. 도메인 추가
3. DNS 레코드 설정:
   - A Record: `76.75.176.0` (Vercel IP)
   - CNAME: `cname.vercel-dns.com.`

더 자세한 정보: [Vercel 공식 문서](https://vercel.com/docs)
