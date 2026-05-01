/**
 * 환경 변수 검증
 * - 필수 환경 변수가 모두 설정되었는지 확인
 * - NEXT_PUBLIC_* 변수가 민감한 정보를 포함하지 않는지 검증
 */

const requiredEnvVars = [
  'NOTION_API_KEY',
  'NOTION_DATABASE_ID',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
];

const publicEnvVars = Object.keys(process.env).filter((key) =>
  key.startsWith('NEXT_PUBLIC_')
);

/**
 * 민감한 정보가 포함될 수 없는 환경 변수들
 */
const sensitiveVarNames = [
  'SECRET',
  'KEY',
  'PASSWORD',
  'TOKEN',
  'CREDENTIAL',
];

/**
 * 모든 필수 환경 변수가 설정되어 있는지 확인
 */
export function validateEnvironmentVariables() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missing.join(', ')}`
    );
  }

  // 공개 환경 변수에서 민감한 정보 검증
  publicEnvVars.forEach((varName) => {
    const lowerVarName = varName.toLowerCase();
    const isSensitive = sensitiveVarNames.some((sensitive) =>
      lowerVarName.includes(sensitive.toLowerCase())
    );

    if (isSensitive) {
      console.warn(
        `⚠️ 주의: ${varName}은(는) 공개 환경 변수입니다. 민감한 정보를 포함하면 안 됩니다.`
      );
    }
  });

  return true;
}

/**
 * 프로덕션 환경에서의 보안 검증
 */
export function validateProductionSecurity() {
  if (process.env.NODE_ENV === 'production') {
    // NEXTAUTH_SECRET가 개발용 기본값이 아닌지 확인
    if (
      process.env.NEXTAUTH_SECRET === 'development-secret-key' ||
      !process.env.NEXTAUTH_SECRET
    ) {
      throw new Error(
        '프로덕션 환경에서는 NEXTAUTH_SECRET을 안전한 값으로 설정해야 합니다'
      );
    }

    // NEXTAUTH_URL이 https로 설정되어 있는지 확인
    if (
      process.env.NEXTAUTH_URL &&
      !process.env.NEXTAUTH_URL.startsWith('https://')
    ) {
      throw new Error(
        '프로덕션 환경에서는 NEXTAUTH_URL이 https://로 시작해야 합니다'
      );
    }
  }
}
