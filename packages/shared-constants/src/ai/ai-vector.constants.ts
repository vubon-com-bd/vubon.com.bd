export const AI_VECTOR_DB = {
  PINECONE: 'pinecone',
  WEAVIATE: 'weaviate',
  QDRANT: 'qdrant',
  MILVUS: 'milvus',
  CHROMA: 'chroma',
  PGVECTOR: 'pgvector',
  REDIS_VECTOR: 'redis_vector',
  ELASTICSEARCH: 'elasticsearch',
  FAISS: 'faiss',
} as const;

export const AI_VECTOR_INDEX_TYPE = {
  FLAT: 'flat',
  IVF_FLAT: 'ivf_flat',
  IVF_PQ: 'ivf_pq',
  HNSW: 'hnsw',
  ANNOY: 'annoy',
  SCANN: 'scann',
} as const;

export const AI_VECTOR_METRIC = {
  COSINE: 'cosine',
  EUCLIDEAN: 'euclidean',
  DOT_PRODUCT: 'dot_product',
  MANHATTAN: 'manhattan',
} as const;

export const AI_VECTOR = {
  DB: AI_VECTOR_DB,
  INDEX_TYPE: AI_VECTOR_INDEX_TYPE,
  METRIC: AI_VECTOR_METRIC,
  DEFAULT_DB: AI_VECTOR_DB.PGVECTOR,
  DEFAULT_INDEX: AI_VECTOR_INDEX_TYPE.HNSW,
  DEFAULT_METRIC: AI_VECTOR_METRIC.COSINE,
  MAX_VECTORS: 10000000,
  MAX_DIMENSION: 4096,
  MAX_BATCH_SIZE: 1000,
  HNSW_M: 16,
  HNSW_EF_CONSTRUCTION: 200,
  HNSW_EF_SEARCH: 100,
} as const;

export type AiVectorType = typeof AI_VECTOR;
