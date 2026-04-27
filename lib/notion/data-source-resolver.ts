import { notion } from './client';

/**
 * Database 컨테이너에서 첫 번째 Data Source ID를 가져옵니다.
 * 결과는 모듈 메모리에 캐싱하여 매 요청마다 retrieve를 반복하지 않습니다.
 *
 * 노트:
 * - 2025-09-03 API에서 Database는 여러 Data Source를 가질 수 있지만,
 *   기존 단일 DB에서 마이그레이션된 경우 첫 번째(인덱스 0)가 원본 데이터에 해당합니다.
 * - 만약 견적서/항목 DB가 다중 데이터 소스를 사용한다면 이름이나 ID로 매핑하도록 확장하세요.
 */
const cache = new Map<string, string>();

export async function resolveDataSourceId(databaseId: string): Promise<string> {
  const cached = cache.get(databaseId);
  if (cached) return cached;

  const db = await notion.databases.retrieve({ database_id: databaseId });

  // v5 SDK 응답에는 data_sources 배열이 포함됩니다.
  const sources = (db as unknown as { data_sources?: Array<{ id: string; name?: string }> })
    .data_sources;

  if (!sources || sources.length === 0) {
    throw new Error(
      `[Notion] database ${databaseId} 에서 data_source를 찾지 못했습니다. ` +
        `Integration이 DB에 연결되어 있는지, 2025-09-03 이상 API를 사용 중인지 확인하세요.`,
    );
  }

  const dataSourceId = sources[0].id;
  cache.set(databaseId, dataSourceId);
  console.log(`[Notion] Database ${databaseId} → Data Source ${dataSourceId} 매핑 완료`);
  return dataSourceId;
}
