/**
 * AI Vector Constants
 * Configuration for vector operations and vector databases
 */

export const AI_VECTOR = {
  // Vector Types
  TYPES: {
    DENSE: 'dense',
    SPARSE: 'sparse',
    BINARY: 'binary',
    QUANTIZED: 'quantized',
    HYBRID: 'hybrid',
    MULTIMODAL: 'multimodal',
  } as const,

  // Vector Status
  STATUSES: {
    PENDING: 'pending',
    GENERATING: 'generating',
    INDEXING: 'indexing',
    COMPLETED: 'completed',
    CACHED: 'cached',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
  } as const,

  // Vector Database Types
  DB_TYPES: {
    PINECONE: 'pinecone',
    WEAVIATE: 'weaviate',
    QDRANT: 'qdrant',
    MILVUS: 'milvus',
    CHROMA: 'chroma',
    LANCEDB: 'lancedb',
    FAISS: 'faiss',
    ELASTICSEARCH: 'elasticsearch',
    OPENSEARCH: 'opensearch',
    REDIS: 'redis',
    PGVECTOR: 'pgvector',
    COUCHBASE: 'couchbase',
  } as const,

  // Vector Index Types
  INDEX_TYPES: {
    FLAT: 'flat',
    IVF_FLAT: 'ivf_flat',
    IVF_PQ: 'ivf_pq',
    HNSW: 'hnsw',
    ANNOY: 'annoy',
    LSH: 'lsh',
    PQ: 'pq',
    BIN_IVF_FLAT: 'bin_ivf_flat',
  } as const,

  // Vector Distance Metrics
  DISTANCE_METRICS: {
    COSINE: 'cosine',
    EUCLIDEAN: 'euclidean',
    DOT_PRODUCT: 'dot_product',
    MANHATTAN: 'manhattan',
    JACCARD: 'jaccard',
    HAMMING: 'hamming',
    CHEBYSHEV: 'chebyshev',
    MINKOWSKI: 'minkowski',
  } as const,

  // Vector Storage Formats
  STORAGE_FORMATS: {
    FLOAT32: 'float32',
    FLOAT16: 'float16',
    INT8: 'int8',
    BINARY: 'binary',
    COMPRESSED: 'compressed',
  } as const,

  // Vector Operations
  OPERATIONS: {
    SEARCH: 'search',
    SIMILARITY: 'similarity',
    AGGREGATION: 'aggregation',
    FILTERING: 'filtering',
    RANKING: 'ranking',
    CLUSTERING: 'clustering',
    CLASSIFICATION: 'classification',
    RECOMMENDATION: 'recommendation',
  } as const,

  // Vector Limits
  LIMITS: {
    MAX_BATCH_SIZE: 100,
    MAX_VECTOR_DIMENSION: 10000,
    MIN_VECTOR_DIMENSION: 1,
    MAX_VECTORS_PER_BATCH: 1000,
    DEFAULT_TOP_K: 10,
    MAX_TOP_K: 1000,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    INDEXING_BATCH_SIZE: 100,
  } as const,

  // Vector Metrics
  METRICS: {
    SEARCH_LATENCY: 'search_latency',
    INDEXING_LATENCY: 'indexing_latency',
    MEMORY_USAGE: 'memory_usage',
    STORAGE_SIZE: 'storage_size',
    QUERY_ACCURACY: 'query_accuracy',
    RECALL: 'recall',
    PRECISION: 'precision',
    QPS: 'qps',
    INDEXING_RATE: 'indexing_rate',
  } as const,

  // Vector Normalization
  NORMALIZATION: {
    NONE: 'none',
    L2: 'l2',
    L1: 'l1',
    UNIT: 'unit',
    STANDARD: 'standard',
  } as const,

  // Vector Cache
  CACHE: {
    TTL: 3600,
    MAX_SIZE: 100000,
    ENABLED: true,
    STORAGE: 'memory',
  } as const,

  // Vector Defaults
  DEFAULTS: {
    DIMENSION: 768,
    TOP_K: 10,
    BATCH_SIZE: 10,
    DISTANCE_METRIC: 'cosine',
    INDEX_TYPE: 'hnsw',
    STORAGE_FORMAT: 'float32',
  } as const,
} as const;

// Vector Types
export type AIVectorType = (typeof AI_VECTOR.TYPES)[keyof typeof AI_VECTOR.TYPES];

// Vector Status
export type AIVectorStatus = (typeof AI_VECTOR.STATUSES)[keyof typeof AI_VECTOR.STATUSES];

// Vector Database Types
export type AIVectorDBType = (typeof AI_VECTOR.DB_TYPES)[keyof typeof AI_VECTOR.DB_TYPES];

// Vector Index Types
export type AIVectorIndexType = (typeof AI_VECTOR.INDEX_TYPES)[keyof typeof AI_VECTOR.INDEX_TYPES];

// Vector Distance Metrics
export type AIVectorDistanceMetric =
  (typeof AI_VECTOR.DISTANCE_METRICS)[keyof typeof AI_VECTOR.DISTANCE_METRICS];

// Vector Storage Formats
export type AIVectorStorageFormat =
  (typeof AI_VECTOR.STORAGE_FORMATS)[keyof typeof AI_VECTOR.STORAGE_FORMATS];

// Vector Operations
export type AIVectorOperation = (typeof AI_VECTOR.OPERATIONS)[keyof typeof AI_VECTOR.OPERATIONS];

// Vector Limits
export type AIVectorLimit = (typeof AI_VECTOR.LIMITS)[keyof typeof AI_VECTOR.LIMITS];

// Vector Metrics
export type AIVectorMetric = (typeof AI_VECTOR.METRICS)[keyof typeof AI_VECTOR.METRICS];

// Vector Normalization
export type AIVectorNormalization =
  (typeof AI_VECTOR.NORMALIZATION)[keyof typeof AI_VECTOR.NORMALIZATION];

// Vector Defaults
export type AIVectorDefault = (typeof AI_VECTOR.DEFAULTS)[keyof typeof AI_VECTOR.DEFAULTS];

// Utility Functions
export function getVectorTypeLabel(type: AIVectorType): string {
  const labels: Record<AIVectorType, string> = {
    [AI_VECTOR.TYPES.DENSE]: 'Dense',
    [AI_VECTOR.TYPES.SPARSE]: 'Sparse',
    [AI_VECTOR.TYPES.BINARY]: 'Binary',
    [AI_VECTOR.TYPES.QUANTIZED]: 'Quantized',
    [AI_VECTOR.TYPES.HYBRID]: 'Hybrid',
    [AI_VECTOR.TYPES.MULTIMODAL]: 'Multimodal',
  };
  return labels[type] || 'Unknown';
}

export function getVectorStatusLabel(status: AIVectorStatus): string {
  const labels: Record<AIVectorStatus, string> = {
    [AI_VECTOR.STATUSES.PENDING]: 'Pending',
    [AI_VECTOR.STATUSES.GENERATING]: 'Generating',
    [AI_VECTOR.STATUSES.INDEXING]: 'Indexing',
    [AI_VECTOR.STATUSES.COMPLETED]: 'Completed',
    [AI_VECTOR.STATUSES.CACHED]: 'Cached',
    [AI_VECTOR.STATUSES.FAILED]: 'Failed',
    [AI_VECTOR.STATUSES.EXPIRED]: 'Expired',
    [AI_VECTOR.STATUSES.ARCHIVED]: 'Archived',
    [AI_VECTOR.STATUSES.OPTIMIZED]: 'Optimized',
  };
  return labels[status] || 'Unknown';
}

export function getVectorDBTypeLabel(dbType: AIVectorDBType): string {
  const labels: Record<AIVectorDBType, string> = {
    [AI_VECTOR.DB_TYPES.PINECONE]: 'Pinecone',
    [AI_VECTOR.DB_TYPES.WEAVIATE]: 'Weaviate',
    [AI_VECTOR.DB_TYPES.QDRANT]: 'Qdrant',
    [AI_VECTOR.DB_TYPES.MILVUS]: 'Milvus',
    [AI_VECTOR.DB_TYPES.CHROMA]: 'Chroma',
    [AI_VECTOR.DB_TYPES.LANCEDB]: 'LanceDB',
    [AI_VECTOR.DB_TYPES.FAISS]: 'FAISS',
    [AI_VECTOR.DB_TYPES.ELASTICSEARCH]: 'Elasticsearch',
    [AI_VECTOR.DB_TYPES.OPENSEARCH]: 'OpenSearch',
    [AI_VECTOR.DB_TYPES.REDIS]: 'Redis',
    [AI_VECTOR.DB_TYPES.PGVECTOR]: 'PGVector',
    [AI_VECTOR.DB_TYPES.COUCHBASE]: 'Couchbase',
  };
  return labels[dbType] || 'Unknown';
}

export function getVectorIndexTypeLabel(indexType: AIVectorIndexType): string {
  const labels: Record<AIVectorIndexType, string> = {
    [AI_VECTOR.INDEX_TYPES.FLAT]: 'Flat',
    [AI_VECTOR.INDEX_TYPES.IVF_FLAT]: 'IVF-Flat',
    [AI_VECTOR.INDEX_TYPES.IVF_PQ]: 'IVF-PQ',
    [AI_VECTOR.INDEX_TYPES.HNSW]: 'HNSW',
    [AI_VECTOR.INDEX_TYPES.ANNOY]: 'Annoy',
    [AI_VECTOR.INDEX_TYPES.LSH]: 'LSH',
    [AI_VECTOR.INDEX_TYPES.PQ]: 'PQ',
    [AI_VECTOR.INDEX_TYPES.BIN_IVF_FLAT]: 'Binary IVF-Flat',
  };
  return labels[indexType] || 'Unknown';
}

export function getVectorDistanceMetricLabel(metric: AIVectorDistanceMetric): string {
  const labels: Record<AIVectorDistanceMetric, string> = {
    [AI_VECTOR.DISTANCE_METRICS.COSINE]: 'Cosine',
    [AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN]: 'Euclidean',
    [AI_VECTOR.DISTANCE_METRICS.DOT_PRODUCT]: 'Dot Product',
    [AI_VECTOR.DISTANCE_METRICS.MANHATTAN]: 'Manhattan',
    [AI_VECTOR.DISTANCE_METRICS.JACCARD]: 'Jaccard',
    [AI_VECTOR.DISTANCE_METRICS.HAMMING]: 'Hamming',
    [AI_VECTOR.DISTANCE_METRICS.CHEBYSHEV]: 'Chebyshev',
    [AI_VECTOR.DISTANCE_METRICS.MINKOWSKI]: 'Minkowski',
  };
  return labels[metric] || 'Unknown';
}

export function getVectorStorageFormatLabel(format: AIVectorStorageFormat): string {
  const labels: Record<AIVectorStorageFormat, string> = {
    [AI_VECTOR.STORAGE_FORMATS.FLOAT32]: 'Float32',
    [AI_VECTOR.STORAGE_FORMATS.FLOAT16]: 'Float16',
    [AI_VECTOR.STORAGE_FORMATS.INT8]: 'Int8',
    [AI_VECTOR.STORAGE_FORMATS.BINARY]: 'Binary',
    [AI_VECTOR.STORAGE_FORMATS.COMPRESSED]: 'Compressed',
  };
  return labels[format] || 'Unknown';
}

export function getVectorOperationLabel(operation: AIVectorOperation): string {
  const labels: Record<AIVectorOperation, string> = {
    [AI_VECTOR.OPERATIONS.SEARCH]: 'Search',
    [AI_VECTOR.OPERATIONS.SIMILARITY]: 'Similarity',
    [AI_VECTOR.OPERATIONS.AGGREGATION]: 'Aggregation',
    [AI_VECTOR.OPERATIONS.FILTERING]: 'Filtering',
    [AI_VECTOR.OPERATIONS.RANKING]: 'Ranking',
    [AI_VECTOR.OPERATIONS.CLUSTERING]: 'Clustering',
    [AI_VECTOR.OPERATIONS.CLASSIFICATION]: 'Classification',
    [AI_VECTOR.OPERATIONS.RECOMMENDATION]: 'Recommendation',
  };
  return labels[operation] || 'Unknown';
}

export function getVectorMetricLabel(metric: AIVectorMetric): string {
  const labels: Record<AIVectorMetric, string> = {
    [AI_VECTOR.METRICS.SEARCH_LATENCY]: 'Search Latency',
    [AI_VECTOR.METRICS.INDEXING_LATENCY]: 'Indexing Latency',
    [AI_VECTOR.METRICS.MEMORY_USAGE]: 'Memory Usage',
    [AI_VECTOR.METRICS.STORAGE_SIZE]: 'Storage Size',
    [AI_VECTOR.METRICS.QUERY_ACCURACY]: 'Query Accuracy',
    [AI_VECTOR.METRICS.RECALL]: 'Recall',
    [AI_VECTOR.METRICS.PRECISION]: 'Precision',
    [AI_VECTOR.METRICS.QPS]: 'Queries Per Second',
    [AI_VECTOR.METRICS.INDEXING_RATE]: 'Indexing Rate',
  };
  return labels[metric] || 'Unknown';
}

export function getVectorNormalizationLabel(normalization: AIVectorNormalization): string {
  const labels: Record<AIVectorNormalization, string> = {
    [AI_VECTOR.NORMALIZATION.NONE]: 'None',
    [AI_VECTOR.NORMALIZATION.L2]: 'L2',
    [AI_VECTOR.NORMALIZATION.L1]: 'L1',
    [AI_VECTOR.NORMALIZATION.UNIT]: 'Unit',
    [AI_VECTOR.NORMALIZATION.STANDARD]: 'Standard',
  };
  return labels[normalization] || 'Unknown';
}

export function isVectorActive(status: AIVectorStatus): boolean {
  const activeStatuses: AIVectorStatus[] = [
    AI_VECTOR.STATUSES.COMPLETED,
    AI_VECTOR.STATUSES.CACHED,
    AI_VECTOR.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isVectorGenerating(status: AIVectorStatus): boolean {
  const generatingStatuses: AIVectorStatus[] = [
    AI_VECTOR.STATUSES.PENDING,
    AI_VECTOR.STATUSES.GENERATING,
    AI_VECTOR.STATUSES.INDEXING,
  ];
  return generatingStatuses.includes(status);
}

export function isVectorFailed(status: AIVectorStatus): boolean {
  const failedStatuses: AIVectorStatus[] = [AI_VECTOR.STATUSES.FAILED, AI_VECTOR.STATUSES.EXPIRED];
  return failedStatuses.includes(status);
}

export function getDefaultDimension(): number {
  return AI_VECTOR.DEFAULTS.DIMENSION;
}

export function getDefaultTopK(): number {
  return AI_VECTOR.DEFAULTS.TOP_K;
}

export function getDefaultBatchSize(): number {
  return AI_VECTOR.DEFAULTS.BATCH_SIZE;
}

export function getDefaultDistanceMetric(): AIVectorDistanceMetric {
  return AI_VECTOR.DEFAULTS.DISTANCE_METRIC as AIVectorDistanceMetric;
}

export function getDefaultIndexType(): AIVectorIndexType {
  return AI_VECTOR.DEFAULTS.INDEX_TYPE as AIVectorIndexType;
}

export function getIndexTypeCompatibility(indexType: AIVectorIndexType): AIVectorType[] {
  const compatibility: Record<AIVectorIndexType, AIVectorType[]> = {
    [AI_VECTOR.INDEX_TYPES.FLAT]: [AI_VECTOR.TYPES.DENSE, AI_VECTOR.TYPES.SPARSE],
    [AI_VECTOR.INDEX_TYPES.IVF_FLAT]: [AI_VECTOR.TYPES.DENSE],
    [AI_VECTOR.INDEX_TYPES.IVF_PQ]: [AI_VECTOR.TYPES.DENSE],
    [AI_VECTOR.INDEX_TYPES.HNSW]: [AI_VECTOR.TYPES.DENSE],
    [AI_VECTOR.INDEX_TYPES.ANNOY]: [AI_VECTOR.TYPES.DENSE],
    [AI_VECTOR.INDEX_TYPES.LSH]: [AI_VECTOR.TYPES.DENSE, AI_VECTOR.TYPES.BINARY],
    [AI_VECTOR.INDEX_TYPES.PQ]: [AI_VECTOR.TYPES.DENSE],
    [AI_VECTOR.INDEX_TYPES.BIN_IVF_FLAT]: [AI_VECTOR.TYPES.BINARY],
  };
  return compatibility[indexType] || [];
}

export function getDistanceMetricForType(vectorType: AIVectorType): AIVectorDistanceMetric[] {
  const metrics: Record<AIVectorType, AIVectorDistanceMetric[]> = {
    [AI_VECTOR.TYPES.DENSE]: [
      AI_VECTOR.DISTANCE_METRICS.COSINE,
      AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN,
      AI_VECTOR.DISTANCE_METRICS.DOT_PRODUCT,
      AI_VECTOR.DISTANCE_METRICS.MANHATTAN,
    ],
    [AI_VECTOR.TYPES.SPARSE]: [
      AI_VECTOR.DISTANCE_METRICS.COSINE,
      AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN,
      AI_VECTOR.DISTANCE_METRICS.JACCARD,
    ],
    [AI_VECTOR.TYPES.BINARY]: [
      AI_VECTOR.DISTANCE_METRICS.HAMMING,
      AI_VECTOR.DISTANCE_METRICS.JACCARD,
    ],
    [AI_VECTOR.TYPES.QUANTIZED]: [
      AI_VECTOR.DISTANCE_METRICS.COSINE,
      AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN,
    ],
    [AI_VECTOR.TYPES.HYBRID]: [
      AI_VECTOR.DISTANCE_METRICS.COSINE,
      AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN,
      AI_VECTOR.DISTANCE_METRICS.DOT_PRODUCT,
    ],
    [AI_VECTOR.TYPES.MULTIMODAL]: [
      AI_VECTOR.DISTANCE_METRICS.COSINE,
      AI_VECTOR.DISTANCE_METRICS.EUCLIDEAN,
    ],
  };
  return metrics[vectorType] || [AI_VECTOR.DISTANCE_METRICS.COSINE];
}
