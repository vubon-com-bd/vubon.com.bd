/**
 * ডিফল্ট ইনডেক্স টাইপ
 */
export const AI_VECTOR_DEFAULT_INDEX = 'hnsw' as const;

/**
 * সর্বোচ্চ ডাইমেনশন (১৫৩৬)
 */
export const AI_VECTOR_MAX_DIMENSION = 1536 as const;

/**
 * কোয়েরি লিমিট (১০০)
 */
export const AI_VECTOR_QUERY_LIMIT = 100 as const;

/**
 * সিমিলারিটি থ্রেশহোল্ড (০.৭)
 */
export const AI_VECTOR_SIMILARITY_THRESHOLD = 0.7 as const;

/**
 * ভেক্টর ইনডেক্স টাইপ এনাম
 */
export const AI_VECTOR_INDEX = {
  HNSW: 'hnsw',
  IVF: 'ivf',
  FLAT: 'flat',
  ANNOY: 'annoy',
  LSH: 'lsh',
  PQ: 'pq',
} as const;

/**
 * AI_VECTOR_INDEX থেকে টাইপ
 */
export type AIVectorIndexType = (typeof AI_VECTOR_INDEX)[keyof typeof AI_VECTOR_INDEX];

/**
 * ভেক্টর ইনডেক্স টাইপ লেবেল
 */
export const AI_VECTOR_INDEX_LABELS: Record<AIVectorIndexType, string> = {
  [AI_VECTOR_INDEX.HNSW]: 'HNSW',
  [AI_VECTOR_INDEX.IVF]: 'IVF',
  [AI_VECTOR_INDEX.FLAT]: 'Flat',
  [AI_VECTOR_INDEX.ANNOY]: 'Annoy',
  [AI_VECTOR_INDEX.LSH]: 'LSH',
  [AI_VECTOR_INDEX.PQ]: 'PQ',
} as const;

/**
 * ভেক্টর ইনডেক্স বিবরণ
 */
export const AI_VECTOR_INDEX_DESCRIPTIONS: Record<AIVectorIndexType, string> = {
  [AI_VECTOR_INDEX.HNSW]: 'Hierarchical Navigable Small World - Graph-based index',
  [AI_VECTOR_INDEX.IVF]: 'Inverted File Index - Quantization-based index',
  [AI_VECTOR_INDEX.FLAT]: 'Flat Index - Brute force exact search',
  [AI_VECTOR_INDEX.ANNOY]: 'Approximate Nearest Neighbors - Tree-based index',
  [AI_VECTOR_INDEX.LSH]: 'Locality Sensitive Hashing - Hash-based index',
  [AI_VECTOR_INDEX.PQ]: 'Product Quantization - Compressed index',
} as const;

/**
 * ভেক্টর ইনডেক্স পারফরম্যান্স মেট্রিক্স
 */
export const AI_VECTOR_INDEX_PERFORMANCE: Record<
  AIVectorIndexType,
  { speed: number; memory: number; accuracy: number }
> = {
  [AI_VECTOR_INDEX.HNSW]: { speed: 90, memory: 70, accuracy: 95 },
  [AI_VECTOR_INDEX.IVF]: { speed: 85, memory: 60, accuracy: 90 },
  [AI_VECTOR_INDEX.FLAT]: { speed: 40, memory: 100, accuracy: 100 },
  [AI_VECTOR_INDEX.ANNOY]: { speed: 80, memory: 65, accuracy: 88 },
  [AI_VECTOR_INDEX.LSH]: { speed: 75, memory: 50, accuracy: 75 },
  [AI_VECTOR_INDEX.PQ]: { speed: 70, memory: 30, accuracy: 85 },
} as const;

/**
 * ভেক্টর ডিসট্যান্স মেট্রিক এনাম
 */
export const AI_VECTOR_DISTANCE = {
  COSINE: 'cosine',
  EUCLIDEAN: 'euclidean',
  DOT: 'dot',
  MANHATTAN: 'manhattan',
  CHEBYSHEV: 'chebyshev',
  HAMMING: 'hamming',
} as const;

/**
 * AI_VECTOR_DISTANCE থেকে টাইপ
 */
export type AIVectorDistanceMetric = (typeof AI_VECTOR_DISTANCE)[keyof typeof AI_VECTOR_DISTANCE];

/**
 * ভেক্টর ডিসট্যান্স মেট্রিক লেবেল
 */
export const AI_VECTOR_DISTANCE_LABELS: Record<AIVectorDistanceMetric, string> = {
  [AI_VECTOR_DISTANCE.COSINE]: 'Cosine',
  [AI_VECTOR_DISTANCE.EUCLIDEAN]: 'Euclidean',
  [AI_VECTOR_DISTANCE.DOT]: 'Dot Product',
  [AI_VECTOR_DISTANCE.MANHATTAN]: 'Manhattan',
  [AI_VECTOR_DISTANCE.CHEBYSHEV]: 'Chebyshev',
  [AI_VECTOR_DISTANCE.HAMMING]: 'Hamming',
} as const;

/**
 * ভেক্টর ডিসট্যান্স মেট্রিক বিবরণ
 */
export const AI_VECTOR_DISTANCE_DESCRIPTIONS: Record<AIVectorDistanceMetric, string> = {
  [AI_VECTOR_DISTANCE.COSINE]: 'Cosine similarity - measures angle between vectors',
  [AI_VECTOR_DISTANCE.EUCLIDEAN]: 'Euclidean distance - straight line distance',
  [AI_VECTOR_DISTANCE.DOT]: 'Dot product - measures similarity of direction and magnitude',
  [AI_VECTOR_DISTANCE.MANHATTAN]: 'Manhattan distance - sum of absolute differences',
  [AI_VECTOR_DISTANCE.CHEBYSHEV]: 'Chebyshev distance - maximum absolute difference',
  [AI_VECTOR_DISTANCE.HAMMING]: 'Hamming distance - measures binary differences',
} as const;

/**
 * ভেক্টর ডেটা টাইপ এনাম
 */
export const AI_VECTOR_DATA_TYPE = {
  FLOAT32: 'float32',
  FLOAT64: 'float64',
  INT8: 'int8',
  INT16: 'int16',
  INT32: 'int32',
  BINARY: 'binary',
} as const;

/**
 * AI_VECTOR_DATA_TYPE থেকে টাইপ
 */
export type AIVectorDataType = (typeof AI_VECTOR_DATA_TYPE)[keyof typeof AI_VECTOR_DATA_TYPE];

/**
 * ভেক্টর ডেটা টাইপ লেবেল
 */
export const AI_VECTOR_DATA_TYPE_LABELS: Record<AIVectorDataType, string> = {
  [AI_VECTOR_DATA_TYPE.FLOAT32]: 'Float32',
  [AI_VECTOR_DATA_TYPE.FLOAT64]: 'Float64',
  [AI_VECTOR_DATA_TYPE.INT8]: 'Int8',
  [AI_VECTOR_DATA_TYPE.INT16]: 'Int16',
  [AI_VECTOR_DATA_TYPE.INT32]: 'Int32',
  [AI_VECTOR_DATA_TYPE.BINARY]: 'Binary',
} as const;

/**
 * ভেক্টর কনফিগারেশন
 */
export interface AIVectorConfig {
  index: AIVectorIndexType;
  distance: AIVectorDistanceMetric;
  maxDimension: number;
  queryLimit: number;
  similarityThreshold: number;
  dataType: AIVectorDataType;
  normalize: boolean;
  dimension: number;
  efSearch: number;
  efConstruction: number;
}

/**
 * ভেক্টর ডিফল্ট কনফিগারেশন
 */
export const AI_VECTOR_DEFAULT_CONFIG: AIVectorConfig = {
  index: AI_VECTOR_DEFAULT_INDEX as AIVectorIndexType,
  distance: AI_VECTOR_DISTANCE.COSINE,
  maxDimension: AI_VECTOR_MAX_DIMENSION,
  queryLimit: AI_VECTOR_QUERY_LIMIT,
  similarityThreshold: AI_VECTOR_SIMILARITY_THRESHOLD,
  dataType: AI_VECTOR_DATA_TYPE.FLOAT32,
  normalize: true,
  dimension: 768,
  efSearch: 100,
  efConstruction: 200,
} as const;

/**
 * ভেক্টর ফিল্টার
 */
export interface AIVectorFilter {
  index?: AIVectorIndexType;
  distance?: AIVectorDistanceMetric;
  dataType?: AIVectorDataType;
  minDimension?: number;
  maxDimension?: number;
  minSimilarity?: number;
  maxSimilarity?: number;
  limit?: number;
  offset?: number;
}

/**
 * ভেক্টর সার্চ রেজাল্ট
 */
export interface AIVectorSearchResult<T = unknown> {
  id: string;
  score: number;
  vector: number[];
  metadata: T;
  distance: number;
  index: AIVectorIndexType;
}

/**
 * ভেক্টর সার্চ রেসপন্স
 */
export interface AIVectorSearchResponse<T = unknown> {
  results: AIVectorSearchResult<T>[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  queryTime: number;
  index: AIVectorIndexType;
  distance: AIVectorDistanceMetric;
  filters: AIVectorFilter;
}

/**
 * ভেক্টর ইনডেক্স গ্রুপ
 */
export const AI_VECTOR_INDEX_GROUPS = {
  EXACT: [AI_VECTOR_INDEX.FLAT] as const,
  APPROXIMATE: [AI_VECTOR_INDEX.HNSW, AI_VECTOR_INDEX.IVF, AI_VECTOR_INDEX.ANNOY] as const,
  COMPRESSED: [AI_VECTOR_INDEX.PQ, AI_VECTOR_INDEX.LSH] as const,
} as const;

/**
 * ভেক্টর ইনডেক্স গ্রুপ লেবেল
 */
export const AI_VECTOR_INDEX_GROUP_LABELS = {
  EXACT: 'Exact',
  APPROXIMATE: 'Approximate',
  COMPRESSED: 'Compressed',
} as const;

/**
 * ভেক্টর ডিসট্যান্স গ্রুপ
 */
export const AI_VECTOR_DISTANCE_GROUPS = {
  ANGULAR: [AI_VECTOR_DISTANCE.COSINE, AI_VECTOR_DISTANCE.DOT] as const,
  METRIC: [
    AI_VECTOR_DISTANCE.EUCLIDEAN,
    AI_VECTOR_DISTANCE.MANHATTAN,
    AI_VECTOR_DISTANCE.CHEBYSHEV,
  ] as const,
  BINARY: [AI_VECTOR_DISTANCE.HAMMING] as const,
} as const;

/**
 * ভেক্টর ডিসট্যান্স গ্রুপ লেবেল
 */
export const AI_VECTOR_DISTANCE_GROUP_LABELS = {
  ANGULAR: 'Angular',
  METRIC: 'Metric',
  BINARY: 'Binary',
} as const;
