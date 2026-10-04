export const AI_CLUSTER_ALGORITHM = {
  KMEANS: 'kmeans',
  DBSCAN: 'dbscan',
  HIERARCHICAL: 'hierarchical',
  MEAN_SHIFT: 'mean_shift',
  GAUSSIAN_MIXTURE: 'gaussian_mixture',
  SPECTRAL: 'spectral',
  BIRCH: 'birch',
  OPTICS: 'optics',
} as const;

export const AI_CLUSTER_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const AI_CLUSTER = {
  ALGORITHM: AI_CLUSTER_ALGORITHM,
  STATUS: AI_CLUSTER_STATUS,
  DEFAULT_ALGORITHM: AI_CLUSTER_ALGORITHM.KMEANS,
  MIN_CLUSTERS: 2,
  MAX_CLUSTERS: 100,
  DEFAULT_CLUSTERS: 10,
  MAX_ITERATIONS: 1000,
  DEFAULT_ITERATIONS: 300,
  TOLERANCE: 0.0001,
  MIN_SAMPLES: 2,
  MAX_SAMPLES: 1000000,
} as const;

export type AiClusterType = typeof AI_CLUSTER;
