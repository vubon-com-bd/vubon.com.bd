import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_EMBEDDING } from './ai-embedding.constants';

export const AI_VECTOR = {
  TYPES: {
    ...COMMON_TYPES,
    ...AI_EMBEDDING.TYPES,
    DENSE: 'dense',
    SPARSE: 'sparse',
    BINARY: 'binary',
    QUANTIZED: 'quantized',
  },
  AI_EMBEDDING: { ...AI_EMBEDDING },
  VECTOR_INDEX_TYPES: {
    FLAT: 'flat',
    IVFFLAT: 'ivfflat',
    IVFPQ: 'ivfpq',
    HNSW: 'hnsw',
    SCANN: 'scann',
  },
  VECTOR_INDEX_PARAMS: {
    HNSW_M: 16,
    HNSW_EF_CONSTRUCTION: 200,
    HNSW_EF_SEARCH: 50,
    IVF_NLIST: 1024,
    IVF_NPROBE: 10,
  },
  MAX_VECTORS_PER_INDEX: 1000000,
  VECTOR_DIMENSION_DEFAULT: 768,
  INDEX_UPDATE_INTERVAL_HOURS: 12,
} as const;
