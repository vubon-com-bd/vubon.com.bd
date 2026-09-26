import { Injectable } from '@nestjs/common';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

@Injectable()
export class MilvusProvider extends VectorDbAbstract {
  readonly provider = 'milvus';
  private readonly client: MilvusClient;

  constructor() {
    super();
    this.client = new MilvusClient({
      address: process.env.MILVUS_URL ?? 'localhost:19530',
    });
  }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    await this.client.createCollection({
      collection_name: config.name,
      fields: [
        { name: 'id', data_type: 'VarChar', is_primary_key: true, max_length: 128 },
        { name: 'vector', data_type: 'FloatVector', dim: config.dimension },
      ],
    });
  }

  async deleteIndex(name: string): Promise<void> {
    await this.client.dropCollection({ collection_name: name });
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    await this.client.upsert({
      collection_name: indexName,
      data: records.map((r) => ({ id: r.id, vector: [...r.values] })),
    });
    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    await this.client.deleteEntities({ collection_name: indexName, expr: `id in [${ids.map((i) => `'${i}'`).join(',')}]` });
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const result = await this.client.search({
      collection_name: indexName,
      data: [[...input.vector]],
      limit: input.topK,
    });

    const matches = (result.results ?? []).map((m) => ({
      id: String((m as { id: string }).id),
      score: (m as { score?: number }).score ?? 0,
    }));

    return { matches, tookMs: Date.now() - start };
  }
}
