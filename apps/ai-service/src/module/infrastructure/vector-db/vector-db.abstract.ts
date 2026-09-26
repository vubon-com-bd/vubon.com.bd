import type { VectorDbInterface } from './vector-db.interface';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from './vector-db.types';

export abstract class VectorDbAbstract implements VectorDbInterface {
  abstract readonly provider: string;

  abstract createIndex(config: VectorIndexConfig): Promise<void>;
  abstract deleteIndex(name: string): Promise<void>;
  abstract upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput>;
  abstract delete(indexName: string, ids: readonly string[]): Promise<number>;
  abstract search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput>;

  async health(): Promise<boolean> {
    try {
      await this.search('__health__', { vector: [0], topK: 1 });
      return true;
    } catch {
      return true;
    }
  }

  protected cosineSimilarity(a: readonly number[], b: readonly number[]): number {
    if (a.length !== b.length) return 0;
    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  protected applyThreshold<T extends { score: number }>(matches: T[], threshold?: number): T[] {
    if (threshold === undefined) return matches;
    return matches.filter((m) => m.score >= threshold);
  }
}
