import { Injectable } from '@nestjs/common';
import weaviate, { type WeaviateClient } from 'weaviate-ts-client';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

@Injectable()
export class WeaviateProvider extends VectorDbAbstract {
  readonly provider = 'weaviate';
  private client: WeaviateClient;

  constructor() {
    super();
    const url = process.env.WEAVIATE_URL ?? 'http://localhost:8080';
    this.client = weaviate.client({
      scheme: url.startsWith('https') ? 'https' : 'http',
      host: url.replace(/^https?:\/\//, ''),
      apiKey: process.env.WEAVIATE_API_KEY
        ? { apiKey: process.env.WEAVIATE_API_KEY }
        : undefined,
    });
  }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    const schemaConfig = {
      class: config.name,
      vectorizer: 'none',
      vectorIndexConfig: {
        distance: config.metric === 'cosine' ? 'cosine' : 'l2-squared',
      },
    };
    await this.client.schema.classCreator().withClass(schemaConfig as never).do();
  }

  async deleteIndex(name: string): Promise<void> {
    await this.client.schema.classDeleter().withClassName(name).do();
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    const batcher = this.client.batch.objectsBatcher();
    for (const record of records) {
      batcher.withObject({
        class: indexName,
        id: record.id,
        vector: [...record.values],
        properties: record.metadata ?? {},
      } as never);
    }
    await batcher.do();
    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    const batcher = this.client.batch.objectsBatcher();
    for (const id of ids) {
      batcher.withObject({ class: indexName, id } as never);
    }
    await batcher.do();
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const result = await this.client.graphql
      .get()
      .withClassName(indexName)
      .withNearVector({ vector: [...input.vector] })
      .withLimit(input.topK)
      .withFields('_additional { id distance }')
      .do();

    const raw = result.data?.Get?.[indexName] ?? [];
    const matches = (raw as Array<Record<string, unknown>>)
      .map((r) => {
        const additional = r._additional as { id?: string; distance?: number } | undefined;
        const score = additional?.distance ? 1 / (1 + additional.distance) : 0;
        return { id: additional?.id ?? '', score };
      })
      .filter((m) => (input.threshold !== undefined ? m.score >= input.threshold : true));

    return { matches, tookMs: Date.now() - start };
  }
}
