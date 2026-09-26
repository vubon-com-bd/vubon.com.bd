import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from './vector-db.types';

export interface VectorDbInterface {
  readonly provider: string;

  createIndex(config: VectorIndexConfig): Promise<void>;
  deleteIndex(name: string): Promise<void>;

  upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput>;
  delete(indexName: string, ids: readonly string[]): Promise<number>;

  search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput>;
  health(): Promise<boolean>;
}
