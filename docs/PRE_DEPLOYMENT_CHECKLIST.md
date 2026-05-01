# 프로덕션 배포 전 최종 체크리스트

## 📋 배포 전 준비 체크리스트

### 1️⃣ 로컬 검증 (배포 전 필수)

#### 빌드 및 타입 검사
```bash
npm run type-check  # TypeScript 타입 검사
npm run lint        # ESLint 실행
npm run build       # 프로덕션 빌드 테스트
```

- [ ] 모든 TypeScript 에러 해결
- [ ] 모든 ESLint 경고 해결
- [ ] 빌드 성공 (에러 없음)

#### 로컬 실행 테스트
```bash
npm run start  # 프로덕션 빌드 로컬 실행
```

- [ ] http://localhost:3000 정상 접근
- [ ] 모든 주요 페이지 렌더링 확인:
  - [ ] `/` (홈페이지)
  - [ ] `/login` (로그인)
  - [ ] `/privacy`, `/terms` (약관)
- [ ] 로그인 기능 정상 작동
- [ ] 관리자 대시보드 접근 가능
- [ ] 견적서 목록 조회 가능
- [ ] PDF 다운로드 정상 작동

### 2️⃣ Git 커밋 및 푸시

```bash
git status                          # 미커밋 파일 확인
git add .                          # 변경사항 스테이징
git commit -m "chore: deploy prep" # 커밋
git push origin main               # main 브랜치에 푸시
```

- [ ] 모든 변경사항 커밋됨
- [ ] main 브랜치에 푸시됨
- [ ] GitHub에서 변경사항 확인 가능

### 3️⃣ 환경 변수 준비

#### 필수 환경 변수 (Vercel에 등록할 값)
```
NOTION_API_KEY = <your-notion-api-key>
NOTION_DATABASE_ID = <your-database-id>
ADMIN_EMAIL = <admin@example.com>
ADMIN_PASSWORD = <secure-password>
NEXTAUTH_SECRET = <openssl rand -base64 32 결과>
NEXTAUTH_URL = https://<your-domain>.com
NODE_ENV = production
```

생성 방법:
```bash
# NEXTAUTH_SECRET 생성
openssl rand -base64 32

# 또는 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

- [ ] `NOTION_API_KEY` 준비됨
- [ ] `NOTION_DATABASE_ID` 확인됨
- [ ] `ADMIN_EMAIL` 설정됨
- [ ] `ADMIN_PASSWORD` 설정됨 (프로덕션에선 해싱 권장)
- [ ] `NEXTAUTH_SECRET` 생성됨 (절대 Git에 커밋하지 말기)
- [ ] `NEXTAUTH_URL` = 프로덕션 도메인 확인
- [ ] `.env.local`, `.env.production` Git에서 제외됨

### 4️⃣ Vercel 계정 준비

- [ ] [Vercel](https://vercel.com) 계정 생성
- [ ] GitHub와 Vercel 연동
- [ ] 개인 또는 팀 프로젝트 생성 (무료 플랜 선택 가능)
- [ ] 빌드 설정 확인:
  - Framework: Next.js
  - Build Command: `npm run build --turbopack`
  - Output Directory: `.next`
  - Install Command: `npm ci`

### 5️⃣ 도메인 준비

#### 옵션 A: 새 도메인 구매 (권장)
- [ ] 도메인 등록사에서 도메인 구매
- [ ] Vercel에서 도메인 추가 또는 DNS 레코드 설정

#### 옵션 B: 기존 도메인 연결
- [ ] 도메인 소유자 확인
- [ ] Vercel에서 DNS 설정 방법 확인
- [ ] A 또는 CNAME 레코드 업데이트 준비

도메인이 없는 경우:
- [ ] 테스트용으로 Vercel의 기본 도메인(`*.vercel.app`) 사용 가능

### 6️⃣ 보안 최종 검증

```bash
# 로컬에서 보안 헤더 확인
curl -I http://localhost:3000 | grep -E "X-|Referrer|Permissions"
```

결과 확인:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy: geolocation=(), microphone=(), camera=()`

### 7️⃣ SEO 최종 검증

```bash
curl -s http://localhost:3000 | grep -o '<meta property="og:[^"]*"'
```

확인 사항:
- [ ] Open Graph 메타 태그 있음
- [ ] Twitter Card 메타 태그 있음
- [ ] Canonical URL 설정됨
- [ ] JSON-LD 구조화 데이터 있음
- [ ] robots.txt 접근 가능
- [ ] sitemap.xml 접근 가능

### 8️⃣ 성능 기본 검증

```bash
npm run start  # 프로덕션 빌드 실행

# 다른 터미널에서:
curl -s http://localhost:3000 | wc -c  # HTML 크기 확인
```

성능 타겟:
- [ ] 초기 페이지 로드 시간 < 3초
- [ ] 메인 HTML 크기 < 100KB (gzip)
- [ ] 번들 크기 합계 < 500KB

### 9️⃣ 노션 API 연동 검증

```bash
# .env.local에 노션 API 키 설정 후 테스트
npm run dev

# 브라우저에서 확인:
# http://localhost:3000/dashboard (관리자 로그인)
# 견적서 목록이 보이는지 확인
```

- [ ] 노션 API 키 유효함
- [ ] 데이터베이스 ID 정확함
- [ ] 대시보드에서 견적서 조회 가능
- [ ] 견적서 상세 페이지 렌더링 가능
- [ ] PDF 다운로드 정상 작동

### 🔟 모니터링 설정 준비 (선택사항)

#### Sentry 설정
- [ ] [Sentry](https://sentry.io) 계정 생성
- [ ] 프로젝트 생성 (Next.js)
- [ ] DSN 값 준비: `https://<key>@<org>.ingest.sentry.io/<project>`

#### Vercel Analytics
- [ ] Vercel 프로젝트 설정에서 Analytics 활성화
- [ ] Web Analytics 확인
- [ ] Speed Insights 확인

---

## 📱 배포 단계별 가이드

### Step 1: GitHub 저장소 마지막 확인

```bash
git log --oneline | head -5
git status

# 모두 커밋됨을 확인 후:
git push origin main
```

### Step 2: Vercel 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 리포지토리 선택
4. 프로젝트 설정:
   - **Project Name**: `notion-cms` (또는 선호하는 이름)
   - **Framework**: Next.js
   - **Build Command**: `npm run build --turbopack`
   - **Output Directory**: `.next`

### Step 3: 환경 변수 등록

Vercel 프로젝트 Settings → Environment Variables에서:

```
Variable Name: NOTION_API_KEY
Value: <your-notion-api-key>

Variable Name: NOTION_DATABASE_ID
Value: <your-database-id>

Variable Name: ADMIN_EMAIL
Value: <admin@example.com>

Variable Name: ADMIN_PASSWORD
Value: <secure-password>

Variable Name: NEXTAUTH_SECRET
Value: <generated-32-byte-secret>

Variable Name: NEXTAUTH_URL
Value: https://notion-cms-xxx.vercel.app

Variable Name: NODE_ENV
Value: production
```

**⚠️ 중요**: 모든 환경 변수를 Production으로 설정하세요.

### Step 4: 배포 트리거

**옵션 A: Vercel UI에서 수동 배포**
1. Vercel 대시보드에서 프로젝트 선택
2. "Deployments" 탭에서 "Trigger Deploy" 클릭
3. "Deploy" 확인

**옵션 B: Git 푸시로 자동 배포**
```bash
# GitHub에 변경사항 푸시 시 자동으로 배포
git push origin main
```

### Step 5: 배포 후 검증

배포 완료 후 (약 2-5분):

1. **기본 기능 테스트**
   ```bash
   curl https://<your-vercel-domain>.vercel.app/
   ```
   - [ ] HTTP 200 OK
   - [ ] HTML 정상 렌더링

2. **보안 헤더 확인**
   ```bash
   curl -I https://<your-vercel-domain>.vercel.app | grep X-
   ```

3. **관리자 로그인 테스트**
   - 로그인 페이지 접근
   - 자격증명으로 로그인 시도
   - 대시보드 접근 확인

4. **공개 링크 테스트**
   - 대시보드에서 공유 링크 복사
   - 시크릿 모드에서 링크 접근
   - 견적서 내용 확인

5. **PDF 다운로드 테스트**
   - 공유 링크에서 PDF 다운로드
   - 파일 정상 생성 확인

### Step 6: 도메인 연결 (선택사항)

커스텀 도메인이 있는 경우:

1. Vercel 프로젝트 Settings → Domains
2. "Add" 클릭
3. 도메인 입력
4. DNS 레코드 추가 또는 네임서버 변경
5. SSL 인증서 자동 발급 대기 (약 5분)

---

## 🔍 배포 후 모니터링

### 일일 점검
- [ ] 에러 로그 확인 (Vercel Function Logs)
- [ ] API 응답 시간 확인
- [ ] 사용자 접근 통계 확인 (Vercel Analytics)

### 주간 점검
- [ ] PageSpeed Insights 점수 측정
- [ ] 성능 지표 변화 모니터링
- [ ] npm 의존성 업데이트 확인

### 월간 점검
- [ ] 보안 업데이트 확인
- [ ] Core Web Vitals 평균 점수 확인
- [ ] 노션 API 사용량 확인

---

## ❌ 트러블슈팅

### 배포 실패: "Build failed"
1. Vercel 대시보드 → Deployments → 실패한 배포 클릭
2. Build Logs 확인
3. 로컬에서 동일 오류 재현: `npm run build`

### 배포 성공하지만 페이지 오류
1. Vercel Function Logs 확인
2. 환경 변수 설정 재확인
3. `NEXTAUTH_URL`이 배포 도메인과 일치하는지 확인

### 노션 데이터 안 보임
1. 대시보드에서 mock data 표시됨 (정상)
2. `NOTION_API_KEY` 유효성 확인
3. `NOTION_DATABASE_ID` 정확성 확인
4. 노션 데이터베이스 접근권한 확인

### SSL 인증서 오류
- Vercel은 자동으로 발급하므로 일반적으로 발생하지 않음
- 도메인 설정 후 5-10분 대기

---

## ✅ 배포 완료 확인

다음 항목 모두 확인되면 배포 완료!

- [ ] Vercel에 성공적으로 배포됨
- [ ] 프로덕션 URL 접근 가능
- [ ] 보안 헤더 설정됨
- [ ] 로그인 기능 정상 작동
- [ ] 견적서 조회 가능
- [ ] PDF 다운로드 가능
- [ ] 성능 지표 수집 중 (Vercel Analytics)
- [ ] 에러 모니터링 활성화됨 (선택사항)

**축하합니다! 🎉 프로덕션 배포 완료!**
