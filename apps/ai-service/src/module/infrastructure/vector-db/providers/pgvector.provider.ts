import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma/prisma.service';
import { VectorDbAbstract } from '../vector-db.abstract';
import type {
  VectorIndexConfig,
  VectorRecord,
  VectorSearchInput,
  VectorSearchOutput,
  VectorUpsertOutput,
} from '../vector-db.types';

@Injectable()
export class PgVectorProvider extends VectorDbAbstract {
  readonly provider = 'pgvector';

  constructor(private readonly prisma: PrismaService) { super(); }

  async createIndex(config: VectorIndexConfig): Promise<void> {
    const table = `"ai_vector_${config.name}"`;
    await this.prisma.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS ${table} (id TEXT PRIMARY KEY, embedding vector(${config.dimension}), metadata JSONB)`,
    );
    await this.prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS ${config.name}_embedding_idx ON ${table} USING ivfflat (embedding vector_cosine_ops)`,
    );
  }

  async deleteIndex(name: string): Promise<void> {
    await this.prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "ai_vector_${name}"`);
  }

  async upsert(indexName: string, records: readonly VectorRecord[]): Promise<VectorUpsertOutput> {
    const start = Date.now();
    const table = `"ai_vector_${indexName}"`;
    for (const record of records) {
      const vec = `[${record.values.join(',')}]`;
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO ${table} (id, embedding, metadata) VALUES ($1, $2::vector, $3::jsonb)
         ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding, metadata = EXCLUDED.metadata`,
        record.id,
        vec,
        JSON.stringify(record.metadata ?? {}),
      );
    }
    return { upsertedCount: records.length, tookMs: Date.now() - start };
  }

  async delete(indexName: string, ids: readonly string[]): Promise<number> {
    const table = `"ai_vector_${indexName}"`;
    for (const id of ids) {
      await this.prisma.$executeRawUnsafe(`DELETE FROM ${table} WHERE id = $1`, id);
    }
    return ids.length;
  }

  async search(indexName: string, input: VectorSearchInput): Promise<VectorSearchOutput> {
    const start = Date.now();
    const table = `"ai_vector_${indexName}"`;
    const vec = `[${input.vector.join(',')}]`;
    const result = await this.prisma.$queryRawUnsafe<Array<{ id: string; score: number }>>(
      `SELECT id, 1 - (embedding <=> $1::vector) AS score
       FROM ${table}
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      vec,
      input.topK,
    );
    const matches = result
      .map((r) => ({ id: r.id, score: Number(r.score) }))
      .filter((m) => (input.threshold !== undefined ? m.score >= input.threshold : true));
    return { matches, tookMs: Date.now() - start };
  }
}
