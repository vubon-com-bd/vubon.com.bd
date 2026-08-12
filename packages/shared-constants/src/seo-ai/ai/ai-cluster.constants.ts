/**
 * ডিফল্ট ক্লাস্টার সংখ্যা (৫)
 */
export const AI_CLUSTER_DEFAULT_K = 5 as const;

/**
 * সর্বোচ্চ ইটারেশন (১০০)
 */
export const AI_CLUSTER_MAX_ITERATIONS = 100 as const;

/**
 * টলারেন্স (০.০০১)
 */
export const AI_CLUSTER_TOLERANCE = 0.001 as const;

/**
 * ডিফল্ট ডিসটেন্স মেট্রিক (Euclidean)
 */
export const AI_CLUSTER_DEFAULT_DISTANCE = 'euclidean' as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম এনাম
 */
export const AI_CLUSTER_ALGORITHM = {
  K_MEANS: 'k-means',
  K_MEDOIDS: 'k-medoids',
  DBSCAN: 'dbscan',
  HIERARCHICAL: 'hierarchical',
  OPTICS: 'optics',
  BIRCH: 'birch',
  SPECTRAL: 'spectral',
  AFFINITY_PROPAGATION: 'affinity-propagation',
  MEAN_SHIFT: 'mean-shift',
  GAUSSIAN_MIXTURE: 'gaussian-mixture',
} as const;

/**
 * AI_CLUSTER_ALGORITHM থেকে টাইপ
 */
export type AIClusterAlgorithmType =
  (typeof AI_CLUSTER_ALGORITHM)[keyof typeof AI_CLUSTER_ALGORITHM];

/**
 * ক্লাস্টারিং অ্যালগরিদম লেবেল
 */
export const AI_CLUSTER_ALGORITHM_LABELS: Record<AIClusterAlgorithmType, string> = {
  [AI_CLUSTER_ALGORITHM.K_MEANS]: 'K-Means',
  [AI_CLUSTER_ALGORITHM.K_MEDOIDS]: 'K-Medoids',
  [AI_CLUSTER_ALGORITHM.DBSCAN]: 'DBSCAN',
  [AI_CLUSTER_ALGORITHM.HIERARCHICAL]: 'Hierarchical',
  [AI_CLUSTER_ALGORITHM.OPTICS]: 'OPTICS',
  [AI_CLUSTER_ALGORITHM.BIRCH]: 'BIRCH',
  [AI_CLUSTER_ALGORITHM.SPECTRAL]: 'Spectral',
  [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION]: 'Affinity Propagation',
  [AI_CLUSTER_ALGORITHM.MEAN_SHIFT]: 'Mean Shift',
  [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE]: 'Gaussian Mixture',
} as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম বিবরণ
 */
export const AI_CLUSTER_ALGORITHM_DESCRIPTIONS: Record<AIClusterAlgorithmType, string> = {
  [AI_CLUSTER_ALGORITHM.K_MEANS]: 'Partitions data into K clusters based on centroids',
  [AI_CLUSTER_ALGORITHM.K_MEDOIDS]: 'Uses medoids instead of centroids for robustness',
  [AI_CLUSTER_ALGORITHM.DBSCAN]: 'Density-based clustering for arbitrary shapes',
  [AI_CLUSTER_ALGORITHM.HIERARCHICAL]:
    'Builds a hierarchy of clusters using agglomerative approach',
  [AI_CLUSTER_ALGORITHM.OPTICS]: 'Ordering points to identify clustering structure',
  [AI_CLUSTER_ALGORITHM.BIRCH]: 'Balanced iterative reducing for large datasets',
  [AI_CLUSTER_ALGORITHM.SPECTRAL]: 'Uses eigenvalues of similarity matrix',
  [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION]: 'Message passing between data points',
  [AI_CLUSTER_ALGORITHM.MEAN_SHIFT]: 'Mode-seeking using kernel density estimation',
  [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE]: 'Probabilistic clustering using Gaussian distributions',
} as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম আইকন
 */
export const AI_CLUSTER_ALGORITHM_ICONS: Record<AIClusterAlgorithmType, string> = {
  [AI_CLUSTER_ALGORITHM.K_MEANS]: '🎯',
  [AI_CLUSTER_ALGORITHM.K_MEDOIDS]: '📌',
  [AI_CLUSTER_ALGORITHM.DBSCAN]: '📊',
  [AI_CLUSTER_ALGORITHM.HIERARCHICAL]: '🌳',
  [AI_CLUSTER_ALGORITHM.OPTICS]: '🔬',
  [AI_CLUSTER_ALGORITHM.BIRCH]: '🌿',
  [AI_CLUSTER_ALGORITHM.SPECTRAL]: '🎵',
  [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION]: '📨',
  [AI_CLUSTER_ALGORITHM.MEAN_SHIFT]: '📈',
  [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE]: '📐',
} as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম কমপ্লেক্সিটি (১-৫)
 */
export const AI_CLUSTER_ALGORITHM_COMPLEXITY: Record<AIClusterAlgorithmType, number> = {
  [AI_CLUSTER_ALGORITHM.K_MEANS]: 2,
  [AI_CLUSTER_ALGORITHM.K_MEDOIDS]: 3,
  [AI_CLUSTER_ALGORITHM.DBSCAN]: 3,
  [AI_CLUSTER_ALGORITHM.HIERARCHICAL]: 4,
  [AI_CLUSTER_ALGORITHM.OPTICS]: 4,
  [AI_CLUSTER_ALGORITHM.BIRCH]: 3,
  [AI_CLUSTER_ALGORITHM.SPECTRAL]: 4,
  [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION]: 4,
  [AI_CLUSTER_ALGORITHM.MEAN_SHIFT]: 3,
  [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE]: 4,
} as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম সাপোর্টেড ডেটা টাইপ
 */
export const AI_CLUSTER_ALGORITHM_SUPPORTED_DATA: Record<AIClusterAlgorithmType, string[]> = {
  [AI_CLUSTER_ALGORITHM.K_MEANS]: ['dense', 'numeric'],
  [AI_CLUSTER_ALGORITHM.K_MEDOIDS]: ['dense', 'numeric', 'categorical'],
  [AI_CLUSTER_ALGORITHM.DBSCAN]: ['dense', 'numeric', 'spatial'],
  [AI_CLUSTER_ALGORITHM.HIERARCHICAL]: ['dense', 'numeric', 'categorical'],
  [AI_CLUSTER_ALGORITHM.OPTICS]: ['dense', 'numeric', 'spatial'],
  [AI_CLUSTER_ALGORITHM.BIRCH]: ['dense', 'numeric', 'large-scale'],
  [AI_CLUSTER_ALGORITHM.SPECTRAL]: ['dense', 'numeric', 'graph'],
  [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION]: ['dense', 'numeric', 'similarity'],
  [AI_CLUSTER_ALGORITHM.MEAN_SHIFT]: ['dense', 'numeric'],
  [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE]: ['dense', 'numeric'],
} as const;

/**
 * ক্লাস্টারিং কনফিগারেশন
 */
export interface AIClusterConfig {
  k: number;
  maxIterations: number;
  tolerance: number;
  distanceMetric: string;
  algorithm: AIClusterAlgorithmType;
  randomState: number;
  nInit: number;
  initMethod: 'k-means++' | 'random' | 'precomputed';
  nJobs: number;
  verbose: boolean;
}

/**
 * ক্লাস্টারিং ডিফল্ট কনফিগারেশন
 */
export const AI_CLUSTER_DEFAULT_CONFIG: AIClusterConfig = {
  k: AI_CLUSTER_DEFAULT_K,
  maxIterations: AI_CLUSTER_MAX_ITERATIONS,
  tolerance: AI_CLUSTER_TOLERANCE,
  distanceMetric: AI_CLUSTER_DEFAULT_DISTANCE,
  algorithm: AI_CLUSTER_ALGORITHM.K_MEANS,
  randomState: 42,
  nInit: 10,
  initMethod: 'k-means++',
  nJobs: 1,
  verbose: false,
} as const;

/**
 * ক্লাস্টারিং ফিল্টার
 */
export interface AIClusterFilter {
  algorithm?: AIClusterAlgorithmType;
  minClusters?: number;
  maxClusters?: number;
  minDistance?: number;
  maxDistance?: number;
  limit?: number;
  offset?: number;
}

/**
 * ক্লাস্টারিং রেজাল্ট
 */
export interface AIClusterResult<T = unknown> {
  clusterId: number;
  size: number;
  centroid: number[];
  points: T[];
  distance: number;
  inertia: number;
  silhouetteScore: number;
}

/**
 * ক্লাস্টারিং রেসপন্স
 */
export interface AIClusterResponse<T = unknown> {
  clusters: AIClusterResult<T>[];
  total: number;
  algorithm: AIClusterAlgorithmType;
  k: number;
  iterations: number;
  convergence: boolean;
  inertia: number;
  silhouetteScore: number;
  daviesBouldinScore: number;
  calinskiHarabaszScore: number;
}

/**
 * ক্লাস্টারিং অ্যালগরিদম গ্রুপ
 */
export const AI_CLUSTER_ALGORITHM_GROUPS = {
  CENTROID_BASED: [AI_CLUSTER_ALGORITHM.K_MEANS, AI_CLUSTER_ALGORITHM.K_MEDOIDS] as const,
  DENSITY_BASED: [AI_CLUSTER_ALGORITHM.DBSCAN, AI_CLUSTER_ALGORITHM.OPTICS] as const,
  HIERARCHICAL: [AI_CLUSTER_ALGORITHM.HIERARCHICAL, AI_CLUSTER_ALGORITHM.BIRCH] as const,
  SPECTRAL: [AI_CLUSTER_ALGORITHM.SPECTRAL] as const,
  PROBABILISTIC: [AI_CLUSTER_ALGORITHM.GAUSSIAN_MIXTURE] as const,
  OTHER: [AI_CLUSTER_ALGORITHM.AFFINITY_PROPAGATION, AI_CLUSTER_ALGORITHM.MEAN_SHIFT] as const,
} as const;

/**
 * ক্লাস্টারিং অ্যালগরিদম গ্রুপ লেবেল
 */
export const AI_CLUSTER_ALGORITHM_GROUP_LABELS = {
  CENTROID_BASED: 'Centroid Based',
  DENSITY_BASED: 'Density Based',
  HIERARCHICAL: 'Hierarchical',
  SPECTRAL: 'Spectral',
  PROBABILISTIC: 'Probabilistic',
  OTHER: 'Other',
} as const;
