# 프로덕션 배포 가이드

## 1단계: 사전 준비

### 환경 변수 생성
```bash
# NEXTAUTH_SECRET 생성 (32바이트 난수)
openssl rand -base64 32

# 또는 Node.js 사용
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 필수 환경 변수 확인
- [ ] `NOTION_API_KEY`: 노션 통합 API 키
- [ ] `NOTION_DATABASE_ID`: 견적서 데이터베이스 ID
- [ ] `ADMIN_EMAIL`: 관리자 이메일
- [ ] `ADMIN_PASSWORD`: 관리자 비밀번호 (프로덕션에서는 해싱 권장)
- [ ] `NEXTAUTH_SECRET`: 생성한 난수 (절대 Git에 커밋하지 말기)
- [ ] `NEXTAUTH_URL`: 프로덕션 도메인 (예: https://notion-cms.example.com)

## 2단계: Vercel 배포 설정

### 프로젝트 생성
1. [Vercel](https://vercel.com) 접속
2. "New Project" 클릭
3. GitHub 리포지토리 연결
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`

### 환경 변수 설정
Vercel 프로젝트 설정 → Environment Variables에서:

```
NOTION_API_KEY = <your-notion-api-key>
NOTION_DATABASE_ID = <your-database-id>
ADMIN_EMAIL = <admin-email>
ADMIN_PASSWORD = <admin-password>
NEXTAUTH_SECRET = <generated-secret>
NEXTAUTH_URL = https://<your-domain>.com
NODE_ENV = production
```

### 배포 전 빌드 테스트
```bash
# 로컬 프로덕션 빌드 테스트
npm run build
npm run start

# http://localhost:3000 에서 확인
```

## 3단계: 도메인 연결

### DNS 설정
**Option A: Vercel 네임서버 사용 (권장)**
1. Vercel에서 도메인 추가
2. 도메인 레지스트라에서 네임서버 변경:
   ```
   ns1.vercel.com
   ns2.vercel.com
   ```

**Option B: CNAME 레코드 사용**
도메인 레지스트라에서 CNAME 레코드 추가:
```
CNAME: <your-domain>.vercel.app
```

### SSL 인증서
- Vercel이 자동으로 Let's Encrypt 인증서 발급 및 갱신
- 배포 후 약 5분 내 HTTPS 활성화

## 4단계: CI/CD 파이프라인 설정

### GitHub Actions 워크플로우 (선택사항)
`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy

on:
  push:
    branches: [main, master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
      
      # E2E 테스트 (선택사항)
      - run: npx playwright install --with-deps
      - run: npm run test:e2e || true
      
      # Vercel 배포는 GitHub 연결로 자동 수행
```

## 5단계: 배포 후 검증

### 기본 기능 테스트
- [ ] 홈페이지 정상 렌더링
- [ ] `/robots.txt` 접근 가능
- [ ] `/sitemap.xml` 접근 가능
- [ ] 로그인 페이지 정상 작동
- [ ] 관리자 대시보드 접근 가능
- [ ] 견적서 조회 정상 작동
- [ ] PDF 다운로드 정상 작동

### 보안 검증
```bash
# SSL 인증서 확인
curl -I https://<your-domain>.com | grep "Strict-Transport-Security"

# 보안 헤더 확인
curl -I https://<your-domain>.com | grep -E "X-Content-Type|X-Frame|X-XSS"

# SEO 메타데이터 확인
curl -s https://<your-domain>.com | grep -o '<meta property="og:[^"]*"'
```

### 성능 측정
1. [Google PageSpeed Insights](https://pagespeed.web.dev/)에서 성능 측정
   - 모바일: 90점 이상 목표
   - 데스크톱: 95점 이상 목표

2. [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)에서 모바일 친화성 확인

3. [SSL Labs](https://www.ssllabs.com/ssltest/) 인증서 점수 확인
   - 목표: A 등급 이상

## 6단계: 모니터링 설정

### Vercel Analytics 활성화
Vercel 프로젝트 설정 → Analytics에서:
- [ ] Web Analytics 활성화
- [ ] Speed Insights 활성화

### Sentry 통합 (에러 추적)
```bash
npm install @sentry/nextjs

# next.config.ts에 Sentry 래퍼 추가
# https://docs.sentry.io/platforms/javascript/guides/nextjs/
```

Sentry 설정:
```javascript
// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = { /* ... */ };

export default withSentryConfig(nextConfig, {
  org: "your-org",
  project: "your-project",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

### 환경 변수 (Sentry)
```
SENTRY_AUTH_TOKEN = <your-sentry-token>
NEXT_PUBLIC_SENTRY_DSN = https://<key>@<org>.ingest.sentry.io/<project>
```

## 7단계: 백업 및 장애 대응

### 노션 데이터베이스 백업
```bash
# 정기적 백업 스크립트 (cron job으로 설정)
#!/bin/bash
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# 노션 API를 통한 전체 내보내기
# 또는 노션 UI에서 "Export" 기능 사용
```

### 롤백 절차
1. Vercel 프로젝트 → Deployments
2. 이전 배포 버전 선택
3. "Promote to Production" 클릭

## 8단계: 보안 최종 체크

### OWASP 체크리스트
- [x] 접근 제어 (미들웨어 기반 라우트 보호)
- [x] 암호화 (HTTPS, HttpOnly 쿠키)
- [x] 인젝션 방지 (입력 검증, 자동 이스케이프)
- [x] 인증 (next-auth, 세션 관리)
- [x] 보안 설정 (보안 헤더, 환경 변수)
- [ ] 로깅/모니터링 (Sentry, Vercel Analytics)

### 보안 헤더 확인
```bash
curl -I https://<your-domain>.com | grep -i "X-\|Referrer\|Permissions\|Content-Security\|Strict-Transport"
```

예상 결과:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 트러블슈팅

### 배포 실패
**증상**: Build failed 에러
**해결책**:
1. Vercel 대시보드에서 빌드 로그 확인
2. 로컬에서 `npm run build` 테스트
3. 환경 변수 설정 확인

### 노션 API 연결 실패
**증상**: 대시보드에 견적서가 보이지 않음
**해결책**:
1. `NOTION_API_KEY` 유효성 확인
2. `NOTION_DATABASE_ID` 정확성 확인
3. Vercel 서버 로그 확인 (Vercel → Function Logs)

### HTTPS 리다이렉트 이슈
**증상**: 혼합 콘텐츠 경고
**해결책**:
1. `NEXTAUTH_URL`이 https://로 시작하는지 확인
2. OG 이미지 URL도 https://인지 확인
3. 브라우저 캐시 비우기

## 보안 업데이트 체계

### 월별 점검
- [ ] npm 의존성 업데이트 확인: `npm outdated`
- [ ] 보안 취약점 스캔: `npm audit`
- [ ] Next.js 최신 버전 확인

### 정기 보안 감시
- 의존성 취약점: npm advisory 구독
- Next.js 보안: [Next.js Security Releases](https://github.com/vercel/next.js/security/advisories)
- 노션 API: [Notion Changelog](https://developers.notion.com/changelog)

## 예상 비용

| 항목 | 무료 | 비용 |
|------|------|------|
| Vercel 호스팅 | ≤ 100GB 대역폭 | $20+/월 |
| 도메인 | - | $10-15/년 |
| Sentry | 5K 이벤트/월 | $29+/월 |
| Notion API | 무료 티어 | - |

## 완료 체크리스트

배포 완료 시 아래 항목을 모두 확인하세요:

- [ ] 프로덕션 빌드 성공
- [ ] 모든 환경 변수 설정 (Git 제외)
- [ ] HTTPS 활성화 및 인증서 유효
- [ ] 기본 기능 테스트 완료
- [ ] 보안 헤더 확인
- [ ] PageSpeed Insights 90점 이상
- [ ] Mobile-Friendly Test 합격
- [ ] SSL Labs A 등급 이상
- [ ] Sentry 모니터링 설정 (선택)
- [ ] 백업 절차 구성 (선택)
