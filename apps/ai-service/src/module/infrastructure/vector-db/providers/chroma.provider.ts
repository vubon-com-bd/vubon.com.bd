import { Injectable } from '@nestjs/common';
import { ChromaClient } from 'chromadb';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

@Injectable()
export class ChromaProvider extends VectorDbAbstract {
  readonly provider = 'chroma';
  private readonly client: ChromaClient;

  constructor() {
    super();
    this.client = new ChromaClient({ path: process.env.CHROMA_URL ?? 'http://localhost:8000' });
  }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    await this.client.getOrCreateCollection({ name: config.name });
  }

  async deleteIndex(name: string): Promise<void> {
    await this.client.deleteCollection({ name });
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    const collection = await this.client.getOrCreateCollection({ name: indexName });
    await collection.upsert({
      ids: records.map((r) => r.id),
      embeddings: records.map((r) => [...r.values]),
      metadatas: records.map((r) => (r.metadata ? { ...r.metadata } : {})),
    });
    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    const collection = await this.client.getOrCreateCollection({ name: indexName });
    await collection.delete({ ids: [...ids] });
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const collection = await this.client.getOrCreateCollection({ name: indexName });
    const result = await collection.query({
      queryEmbeddings: [[...input.vector]],
      nResults: input.topK,
    });

    const ids = result.ids[0] ?? [];
    const distances = result.distances?.[0] ?? [];
    const matches = ids
      .map((id, idx) => ({ id, score: 1 / (1 + (distances[idx] ?? 0)) }))
      .filter((m) => (input.threshold !== undefined ? m.score >= input.threshold : true));

    return { matches, tookMs: Date.now() - start };
  }
}
