import { Injectable } from '@nestjs/common';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

interface QdrantPoint {
  readonly id: string;
  readonly score?: number;
  readonly payload?: Record<string, unknown>;
}

interface QdrantClientLike {
  createCollection(name: string, config: unknown): Promise<unknown>;
  deleteCollection(name: string): Promise<unknown>;
  upsert(name: string, options: unknown): Promise<unknown>;
  delete(name: string, options: unknown): Promise<unknown>;
  search(name: string, options: unknown): Promise<QdrantPoint[]>;
}

@Injectable()
export class QdrantProvider extends VectorDbAbstract {
  readonly provider = 'qdrant';
  private client: QdrantClientLike | null = null;

  private async ensureClient(): Promise<QdrantClientLike> {
    if (!this.client) {
      const mod = await import('@qdrant/js-client-rest');
      const Client = mod.QdrantClient;
      this.client = new Client({
        url: process.env.QDRANT_URL ?? 'http://localhost:6333',
        apiKey: process.env.QDRANT_API_KEY,
      }) as unknown as QdrantClientLike;
    }
    return this.client;
  }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    const client = await this.ensureClient();
    const distance =
      config.metric === 'cosine' ? 'Cosine' : config.metric === 'dot' ? 'Dot' : 'Euclid';
    await client.createCollection(config.name, {
      vectors: { size: config.dimension, distance },
    });
  }

  async deleteIndex(name: string): Promise<void> {
    const client = await this.ensureClient();
    await client.deleteCollection(name);
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    const client = await this.ensureClient();
    await client.upsert(indexName, {
      wait: true,
      points: records.map((r) => ({
        id: r.id,
        vector: [...r.values],
        payload: r.metadata ? { ...r.metadata } : {},
      })),
    });
    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    const client = await this.ensureClient();
    await client.delete(indexName, { wait: true, points: [...ids] });
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const client = await this.ensureClient();
    const result = await client.search(indexName, {
      vector: [...input.vector],
      limit: input.topK,
      score_threshold: input.threshold,
    });

    const matches = result.map((m) => ({
      id: String(m.id),
      score: m.score ?? 0,
      metadata: m.payload as Readonly<Record<string, string | number | boolean>> | undefined,
    }));

    return { matches, tookMs: Date.now() - start };
  }
}
