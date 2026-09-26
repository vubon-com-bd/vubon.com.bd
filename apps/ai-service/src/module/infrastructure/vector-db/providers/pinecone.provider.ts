import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

type PineconeMetric = 'cosine' | 'euclidean' | 'dotproduct';

@Injectable()
export class PineconeProvider extends VectorDbAbstract {
  readonly provider = 'pinecone';
  private client: Pinecone | null = null;

  private async ensureClient(): Promise<Pinecone> {
    if (!this.client) {
      this.client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY ?? '',
      });
    }
    return this.client;
  }

  private mapMetric(metric: VectorIndexConfig['metric']): PineconeMetric {
    if (metric === 'dot') return 'dotproduct';
    return metric;
  }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    const client = await this.ensureClient();
    await client.createIndex({
      name: config.name,
      dimension: config.dimension,
      metric: this.mapMetric(config.metric),
      spec: { serverless: { cloud: 'aws', region: 'us-east-1' } },
      suppressConflicts: true,
    });
  }

  async deleteIndex(name: string): Promise<void> {
    const client = await this.ensureClient();
    await client.deleteIndex(name);
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    const client = await this.ensureClient();
    const index = client.index(indexName);

    await index.upsert({
      records: records.map((r) => ({
        id: r.id,
        values: [...r.values],
        metadata: r.metadata ? { ...r.metadata } : {},
      })),
    });

    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    const client = await this.ensureClient();
    const index = client.index(indexName);
    await index.deleteMany([...ids]);
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const client = await this.ensureClient();
    const index = client.index(indexName);

    const result = await index.query({
      vector: [...input.vector],
      topK: input.topK,
      includeMetadata: true,
      filter: input.filter ? { ...input.filter } : undefined,
    });

    const matches = (result.matches ?? [])
      .map((m) => ({
        id: m.id,
        score: m.score ?? 0,
        metadata: m.metadata as Readonly<Record<string, string | number | boolean>> | undefined,
      }))
      .filter((m) => (input.threshold !== undefined ? m.score >= input.threshold : true));

    return { matches, tookMs: Date.now() - start };
  }
}
