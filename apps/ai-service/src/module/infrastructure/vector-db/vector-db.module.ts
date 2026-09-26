import { Module } from '@nestjs/common';
import { PineconeProvider } from './providers/pinecone.provider';
import { WeaviateProvider } from './providers/weaviate.provider';
import { QdrantProvider } from './providers/qdrant.provider';
import { MilvusProvider } from './providers/milvus.provider';
import { PgVectorProvider } from './providers/pgvector.provider';
import { ChromaProvider } from './providers/chroma.provider';
import { VectorDbFactory } from './vector-db.factory';

@Module({
  providers: [
    PineconeProvider,
    WeaviateProvider,
    QdrantProvider,
    MilvusProvider,
    PgVectorProvider,
    ChromaProvider,
    VectorDbFactory,
  ],
  exports: [VectorDbFactory],
})
export class VectorDbModule {}
