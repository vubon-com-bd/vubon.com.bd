import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_VECTOR } from './ai-vector.constants';
import { AI_SIMILARITY } from './ai-similarity.constants';

export const AI_CLUSTER = {
  TYPES: {
    ...COMMON_TYPES,
    KMEANS: 'kmeans',
    DBSCAN: 'dbscan',
    HIERARCHICAL: 'hierarchical',
    OPTICS: 'optics',
    MEAN_SHIFT: 'mean_shift',
    SPECTRAL: 'spectral',
  },
  AI_VECTOR: { ...AI_VECTOR },
  AI_SIMILARITY: { ...AI_SIMILARITY },
  CLUSTER_CONFIGS: {
    KMEANS_N_CLUSTERS: 10,
    KMEANS_MAX_ITER: 300,
    DBSCAN_EPS: 0.5,
    DBSCAN_MIN_SAMPLES: 5,
    HIERARCHICAL_LINKAGE: 'ward',
  },
  MIN_CLUSTER_SIZE: 3,
  MAX_CLUSTERS: 100,
  CLUSTER_UPDATE_INTERVAL_DAYS: 7,
  SILHOUETTE_SCORE_THRESHOLD: 0.5,
} as const;
