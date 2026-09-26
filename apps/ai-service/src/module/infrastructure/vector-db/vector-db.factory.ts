import { Injectable } from '@nestjs/common';
import type { VectorDbInterface } from './vector-db.interface';
import { PineconeProvider } from './providers/pinecone.provider';
import { WeaviateProvider } from './providers/weaviate.provider';
import { QdrantProvider } from './providers/qdrant.provider';
import { MilvusProvider } from './providers/milvus.provider';
import { PgVectorProvider } from './providers/pgvector.provider';
import { ChromaProvider } from './providers/chroma.provider';

@Injectable()
export class VectorDbFactory {
  private readonly providers: ReadonlyMap<string, VectorDbInterface>;

  constructor(
    pinecone: PineconeProvider,
    weaviate: WeaviateProvider,
    qdrant: QdrantProvider,
    milvus: MilvusProvider,
    pgvector: PgVectorProvider,
    chroma: ChromaProvider,
  ) {
    this.providers = new Map<string, VectorDbInterface>([
      ['pinecone', pinecone],
      ['weaviate', weaviate],
      ['qdrant', qdrant],
      ['milvus', milvus],
      ['pgvector', pgvector],
      ['chroma', chroma],
    ]);
  }

  get(provider: string): VectorDbInterface {
    const db = this.providers.get(provider);
    if (!db) throw new Error(`Unknown vector DB provider: ${provider}`);
    return db;
  }

  list(): readonly string[] {
    return [...this.providers.keys()];
  }

  default(): VectorDbInterface {
    const name = process.env.VECTOR_DEFAULT_PROVIDER ?? 'pinecone';
    return this.get(name);
  }
}
