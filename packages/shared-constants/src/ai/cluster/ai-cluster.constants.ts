/**
 * AI Cluster Constants
 * Configuration for clustering algorithms and operations
 */

export const AI_CLUSTER = {
  // Cluster Types
  TYPES: {
    K_MEANS: 'k_means',
    HIERARCHICAL: 'hierarchical',
    DBSCAN: 'dbscan',
    OPTICS: 'optics',
    SPECTRAL: 'spectral',
    AFFINITY_PROPAGATION: 'affinity_propagation',
    MEAN_SHIFT: 'mean_shift',
    BIRCH: 'birch',
    GAUSSIAN_MIXTURE: 'gaussian_mixture',
    AGGLOMERATIVE: 'agglomerative',
    DIVISIVE: 'divisive',
    HDBSCAN: 'hdbscan',
    ISODATA: 'isodata',
    FUZZY_CMEANS: 'fuzzy_cmeans',
  } as const,

  // Cluster Status
  STATUSES: {
    PENDING: 'pending',
    INITIALIZING: 'initializing',
    CLUSTERING: 'clustering',
    OPTIMIZING: 'optimizing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    CACHED: 'cached',
  } as const,

  // Cluster Categories
  CATEGORIES: {
    PARTITIONAL: 'partitional',
    HIERARCHICAL: 'hierarchical',
    DENSITY_BASED: 'density_based',
    GRID_BASED: 'grid_based',
    MODEL_BASED: 'model_based',
    FUZZY: 'fuzzy',
    HARD: 'hard',
    EXCLUSIVE: 'exclusive',
    OVERLAPPING: 'overlapping',
    PROBABILISTIC: 'probabilistic',
  } as const,

  // Cluster Algorithms
  ALGORITHMS: {
    // Centroid-based
    K_MEANS: 'k_means',
    K_MEANS_PLUS_PLUS: 'k_means_plus_plus',
    K_MEDIANS: 'k_medians',
    K_MEDOIDS: 'k_medoids',

    // Hierarchical
    SINGLE_LINK: 'single_link',
    COMPLETE_LINK: 'complete_link',
    AVERAGE_LINK: 'average_link',
    WARD: 'ward',

    // Density-based
    DBSCAN: 'dbscan',
    OPTICS: 'optics',
    HDBSCAN: 'hdbscan',

    // Distribution-based
    GAUSSIAN: 'gaussian',
    BAYESIAN: 'bayesian',

    // Graph-based
    SPECTRAL: 'spectral',
    AFFINITY: 'affinity',

    // Grid-based
    STING: 'sting',
    CLIQUE: 'clique',

    // Fuzzy
    FUZZY_C_MEANS: 'fuzzy_c_means',
    FUZZY_K_MEANS: 'fuzzy_k_means',

    // Advanced
    BIRCH: 'birch',
    MEAN_SHIFT: 'mean_shift',
    AFFINITY_PROPAGATION: 'affinity_propagation',
    ISODATA: 'isodata',
  } as const,

  // Cluster Metrics
  METRICS: {
    // Internal Metrics
    SILHOUETTE: 'silhouette',
    DAVIES_BOULDIN: 'davies_bouldin',
    CALINSKI_HARABASZ: 'calinski_harabasz',
    DUNN: 'dunn',
    GAP: 'gap',

    // External Metrics
    ADJUSTED_RANDI: 'adjusted_randi',
    MUTUAL_INFO: 'mutual_info',
    HOMOGENEITY: 'homogeneity',
    COMPLETENESS: 'completeness',
    V_MEASURE: 'v_measure',
    FOWLKES_MALLOWS: 'fowlkes_mallows',

    // Quality Metrics
    COHESION: 'cohesion',
    SEPARATION: 'separation',
    COMPACTNESS: 'compactness',
    DISTINCTIVENESS: 'distinctiveness',
  } as const,

  // Cluster Distance Metrics
  DISTANCE_METRICS: {
    EUCLIDEAN: 'euclidean',
    MANHATTAN: 'manhattan',
    COSINE: 'cosine',
    JACCARD: 'jaccard',
    PEARSON: 'pearson',
    SPEARMAN: 'spearman',
    CHEBYSHEV: 'chebyshev',
    MINKOWSKI: 'minkowski',
    HAMMING: 'hamming',
  } as const,

  // Cluster Limits
  LIMITS: {
    MIN_CLUSTERS: 1,
    MAX_CLUSTERS: 1000,
    DEFAULT_CLUSTERS: 3,
    MIN_SAMPLES: 2,
    MAX_SAMPLES: 1000000,
    EPSILON: 0.5,
    MIN_PTS: 5,
    MAX_ITERATIONS: 100,
    DEFAULT_ITERATIONS: 50,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Cluster Features
  FEATURES: {
    HIERARCHICAL: 'hierarchical',
    NON_HIERARCHICAL: 'non_hierarchical',
    OVERLAPPING: 'overlapping',
    NON_OVERLAPPING: 'non_overlapping',
    FUZZY: 'fuzzy',
    HARD: 'hard',
    PARTITIONAL: 'partitional',
    AGGLOMERATIVE: 'agglomerative',
    DIVISIVE: 'divisive',
  } as const,

  // Cluster Quality
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    UNKNOWN: 'unknown',
  } as const,

  // Cluster Formats
  FORMATS: {
    LABELS: 'labels',
    CENTROIDS: 'centroids',
    HIERARCHY: 'hierarchy',
    DENDROGRAM: 'dendrogram',
    MEMBERSHIP: 'membership',
    BOUNDARIES: 'boundaries',
  } as const,
} as const;

export type AIClusterType = (typeof AI_CLUSTER.TYPES)[keyof typeof AI_CLUSTER.TYPES];
export type AIClusterStatus = (typeof AI_CLUSTER.STATUSES)[keyof typeof AI_CLUSTER.STATUSES];
export type AIClusterCategory = (typeof AI_CLUSTER.CATEGORIES)[keyof typeof AI_CLUSTER.CATEGORIES];
export type AIClusterAlgorithm = (typeof AI_CLUSTER.ALGORITHMS)[keyof typeof AI_CLUSTER.ALGORITHMS];
export type AIClusterMetric = (typeof AI_CLUSTER.METRICS)[keyof typeof AI_CLUSTER.METRICS];
export type AIClusterDistanceMetric =
  (typeof AI_CLUSTER.DISTANCE_METRICS)[keyof typeof AI_CLUSTER.DISTANCE_METRICS];
export type AIClusterLimit = (typeof AI_CLUSTER.LIMITS)[keyof typeof AI_CLUSTER.LIMITS];
export type AIClusterFeature = (typeof AI_CLUSTER.FEATURES)[keyof typeof AI_CLUSTER.FEATURES];
export type AIClusterQuality = (typeof AI_CLUSTER.QUALITY)[keyof typeof AI_CLUSTER.QUALITY];
export type AIClusterFormat = (typeof AI_CLUSTER.FORMATS)[keyof typeof AI_CLUSTER.FORMATS];

export function getAiClusterTypeLabel(type: AIClusterType): string {
  const labels: Record<AIClusterType, string> = {
    [AI_CLUSTER.TYPES.K_MEANS]: 'K-Means',
    [AI_CLUSTER.TYPES.HIERARCHICAL]: 'Hierarchical',
    [AI_CLUSTER.TYPES.DBSCAN]: 'DBSCAN',
    [AI_CLUSTER.TYPES.OPTICS]: 'OPTICS',
    [AI_CLUSTER.TYPES.SPECTRAL]: 'Spectral',
    [AI_CLUSTER.TYPES.AFFINITY_PROPAGATION]: 'Affinity Propagation',
    [AI_CLUSTER.TYPES.MEAN_SHIFT]: 'Mean Shift',
    [AI_CLUSTER.TYPES.BIRCH]: 'BIRCH',
    [AI_CLUSTER.TYPES.GAUSSIAN_MIXTURE]: 'Gaussian Mixture',
    [AI_CLUSTER.TYPES.AGGLOMERATIVE]: 'Agglomerative',
    [AI_CLUSTER.TYPES.DIVISIVE]: 'Divisive',
    [AI_CLUSTER.TYPES.HDBSCAN]: 'HDBSCAN',
    [AI_CLUSTER.TYPES.ISODATA]: 'ISODATA',
    [AI_CLUSTER.TYPES.FUZZY_CMEANS]: 'Fuzzy C-Means',
  };
  return labels[type] || 'Unknown';
}

export function getAiClusterStatusLabel(status: AIClusterStatus): string {
  const labels: Record<AIClusterStatus, string> = {
    [AI_CLUSTER.STATUSES.PENDING]: 'Pending',
    [AI_CLUSTER.STATUSES.INITIALIZING]: 'Initializing',
    [AI_CLUSTER.STATUSES.CLUSTERING]: 'Clustering',
    [AI_CLUSTER.STATUSES.OPTIMIZING]: 'Optimizing',
    [AI_CLUSTER.STATUSES.COMPLETED]: 'Completed',
    [AI_CLUSTER.STATUSES.FAILED]: 'Failed',
    [AI_CLUSTER.STATUSES.EXPIRED]: 'Expired',
    [AI_CLUSTER.STATUSES.ARCHIVED]: 'Archived',
    [AI_CLUSTER.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getAiClusterCategoryLabel(category: AIClusterCategory): string {
  const labels: Record<AIClusterCategory, string> = {
    [AI_CLUSTER.CATEGORIES.PARTITIONAL]: 'Partitional',
    [AI_CLUSTER.CATEGORIES.HIERARCHICAL]: 'Hierarchical',
    [AI_CLUSTER.CATEGORIES.DENSITY_BASED]: 'Density Based',
    [AI_CLUSTER.CATEGORIES.GRID_BASED]: 'Grid Based',
    [AI_CLUSTER.CATEGORIES.MODEL_BASED]: 'Model Based',
    [AI_CLUSTER.CATEGORIES.FUZZY]: 'Fuzzy',
    [AI_CLUSTER.CATEGORIES.HARD]: 'Hard',
    [AI_CLUSTER.CATEGORIES.EXCLUSIVE]: 'Exclusive',
    [AI_CLUSTER.CATEGORIES.OVERLAPPING]: 'Overlapping',
    [AI_CLUSTER.CATEGORIES.PROBABILISTIC]: 'Probabilistic',
  };
  return labels[category] || 'Unknown';
}

export function getAiClusterAlgorithmLabel(algorithm: AIClusterAlgorithm): string {
  const labels: Record<AIClusterAlgorithm, string> = {
    [AI_CLUSTER.ALGORITHMS.K_MEANS]: 'K-Means',
    [AI_CLUSTER.ALGORITHMS.K_MEANS_PLUS_PLUS]: 'K-Means++',
    [AI_CLUSTER.ALGORITHMS.K_MEDIANS]: 'K-Medians',
    [AI_CLUSTER.ALGORITHMS.K_MEDOIDS]: 'K-Medoids',
    [AI_CLUSTER.ALGORITHMS.SINGLE_LINK]: 'Single Link',
    [AI_CLUSTER.ALGORITHMS.COMPLETE_LINK]: 'Complete Link',
    [AI_CLUSTER.ALGORITHMS.AVERAGE_LINK]: 'Average Link',
    [AI_CLUSTER.ALGORITHMS.WARD]: 'Ward',
    [AI_CLUSTER.ALGORITHMS.DBSCAN]: 'DBSCAN',
    [AI_CLUSTER.ALGORITHMS.OPTICS]: 'OPTICS',
    [AI_CLUSTER.ALGORITHMS.HDBSCAN]: 'HDBSCAN',
    [AI_CLUSTER.ALGORITHMS.GAUSSIAN]: 'Gaussian',
    [AI_CLUSTER.ALGORITHMS.BAYESIAN]: 'Bayesian',
    [AI_CLUSTER.ALGORITHMS.SPECTRAL]: 'Spectral',
    [AI_CLUSTER.ALGORITHMS.AFFINITY]: 'Affinity',
    [AI_CLUSTER.ALGORITHMS.STING]: 'STING',
    [AI_CLUSTER.ALGORITHMS.CLIQUE]: 'CLIQUE',
    [AI_CLUSTER.ALGORITHMS.FUZZY_C_MEANS]: 'Fuzzy C-Means',
    [AI_CLUSTER.ALGORITHMS.FUZZY_K_MEANS]: 'Fuzzy K-Means',
    [AI_CLUSTER.ALGORITHMS.BIRCH]: 'BIRCH',
    [AI_CLUSTER.ALGORITHMS.MEAN_SHIFT]: 'Mean Shift',
    [AI_CLUSTER.ALGORITHMS.AFFINITY_PROPAGATION]: 'Affinity Propagation',
    [AI_CLUSTER.ALGORITHMS.ISODATA]: 'ISODATA',
  };
  return labels[algorithm] || 'Unknown';
}

export function getAiClusterMetricLabel(metric: AIClusterMetric): string {
  const labels: Record<AIClusterMetric, string> = {
    [AI_CLUSTER.METRICS.SILHOUETTE]: 'Silhouette',
    [AI_CLUSTER.METRICS.DAVIES_BOULDIN]: 'Davies-Bouldin',
    [AI_CLUSTER.METRICS.CALINSKI_HARABASZ]: 'Calinski-Harabasz',
    [AI_CLUSTER.METRICS.DUNN]: 'Dunn',
    [AI_CLUSTER.METRICS.GAP]: 'Gap',
    [AI_CLUSTER.METRICS.ADJUSTED_RANDI]: 'Adjusted Randi',
    [AI_CLUSTER.METRICS.MUTUAL_INFO]: 'Mutual Info',
    [AI_CLUSTER.METRICS.HOMOGENEITY]: 'Homogeneity',
    [AI_CLUSTER.METRICS.COMPLETENESS]: 'Completeness',
    [AI_CLUSTER.METRICS.V_MEASURE]: 'V-Measure',
    [AI_CLUSTER.METRICS.FOWLKES_MALLOWS]: 'Fowlkes-Mallows',
    [AI_CLUSTER.METRICS.COHESION]: 'Cohesion',
    [AI_CLUSTER.METRICS.SEPARATION]: 'Separation',
    [AI_CLUSTER.METRICS.COMPACTNESS]: 'Compactness',
    [AI_CLUSTER.METRICS.DISTINCTIVENESS]: 'Distinctiveness',
  };
  return labels[metric] || 'Unknown';
}

export function getAiClusterDistanceMetricLabel(metric: AIClusterDistanceMetric): string {
  const labels: Record<AIClusterDistanceMetric, string> = {
    [AI_CLUSTER.DISTANCE_METRICS.EUCLIDEAN]: 'Euclidean',
    [AI_CLUSTER.DISTANCE_METRICS.MANHATTAN]: 'Manhattan',
    [AI_CLUSTER.DISTANCE_METRICS.COSINE]: 'Cosine',
    [AI_CLUSTER.DISTANCE_METRICS.JACCARD]: 'Jaccard',
    [AI_CLUSTER.DISTANCE_METRICS.PEARSON]: 'Pearson',
    [AI_CLUSTER.DISTANCE_METRICS.SPEARMAN]: 'Spearman',
    [AI_CLUSTER.DISTANCE_METRICS.CHEBYSHEV]: 'Chebyshev',
    [AI_CLUSTER.DISTANCE_METRICS.MINKOWSKI]: 'Minkowski',
    [AI_CLUSTER.DISTANCE_METRICS.HAMMING]: 'Hamming',
  };
  return labels[metric] || 'Unknown';
}

export function getAiClusterQualityLabel(quality: AIClusterQuality): string {
  const labels: Record<AIClusterQuality, string> = {
    [AI_CLUSTER.QUALITY.EXCELLENT]: 'Excellent',
    [AI_CLUSTER.QUALITY.GOOD]: 'Good',
    [AI_CLUSTER.QUALITY.FAIR]: 'Fair',
    [AI_CLUSTER.QUALITY.POOR]: 'Poor',
    [AI_CLUSTER.QUALITY.UNKNOWN]: 'Unknown',
  };
  return labels[quality] || 'Unknown';
}

export function isAiClusterActive(status: AIClusterStatus): boolean {
  const activeStatuses: AIClusterStatus[] = [
    AI_CLUSTER.STATUSES.COMPLETED,
    AI_CLUSTER.STATUSES.CACHED,
    AI_CLUSTER.STATUSES.OPTIMIZING,
  ];
  return activeStatuses.includes(status);
}

export function isAiClusterProcessing(status: AIClusterStatus): boolean {
  const processingStatuses: AIClusterStatus[] = [
    AI_CLUSTER.STATUSES.PENDING,
    AI_CLUSTER.STATUSES.INITIALIZING,
    AI_CLUSTER.STATUSES.CLUSTERING,
    AI_CLUSTER.STATUSES.OPTIMIZING,
  ];
  return processingStatuses.includes(status);
}

export function isAiClusterFailed(status: AIClusterStatus): boolean {
  const failedStatuses: AIClusterStatus[] = [
    AI_CLUSTER.STATUSES.FAILED,
    AI_CLUSTER.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function getAiClusterDefaultClusters(): number {
  return AI_CLUSTER.LIMITS.DEFAULT_CLUSTERS;
}

export function getAiClusterDefaultIterations(): number {
  return AI_CLUSTER.LIMITS.DEFAULT_ITERATIONS;
}

export function getAiClusterDefaultEpsilon(): number {
  return AI_CLUSTER.LIMITS.EPSILON;
}

export function getAiClusterDefaultMinPts(): number {
  return AI_CLUSTER.LIMITS.MIN_PTS;
}

export function getAiClusterAlgorithmCategory(algorithm: AIClusterAlgorithm): AIClusterCategory {
  const categories: Record<AIClusterAlgorithm, AIClusterCategory> = {
    [AI_CLUSTER.ALGORITHMS.K_MEANS]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.K_MEANS_PLUS_PLUS]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.K_MEDIANS]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.K_MEDOIDS]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.SINGLE_LINK]: AI_CLUSTER.CATEGORIES.HIERARCHICAL,
    [AI_CLUSTER.ALGORITHMS.COMPLETE_LINK]: AI_CLUSTER.CATEGORIES.HIERARCHICAL,
    [AI_CLUSTER.ALGORITHMS.AVERAGE_LINK]: AI_CLUSTER.CATEGORIES.HIERARCHICAL,
    [AI_CLUSTER.ALGORITHMS.WARD]: AI_CLUSTER.CATEGORIES.HIERARCHICAL,
    [AI_CLUSTER.ALGORITHMS.DBSCAN]: AI_CLUSTER.CATEGORIES.DENSITY_BASED,
    [AI_CLUSTER.ALGORITHMS.OPTICS]: AI_CLUSTER.CATEGORIES.DENSITY_BASED,
    [AI_CLUSTER.ALGORITHMS.HDBSCAN]: AI_CLUSTER.CATEGORIES.DENSITY_BASED,
    [AI_CLUSTER.ALGORITHMS.GAUSSIAN]: AI_CLUSTER.CATEGORIES.MODEL_BASED,
    [AI_CLUSTER.ALGORITHMS.BAYESIAN]: AI_CLUSTER.CATEGORIES.MODEL_BASED,
    [AI_CLUSTER.ALGORITHMS.SPECTRAL]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.AFFINITY]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.STING]: AI_CLUSTER.CATEGORIES.GRID_BASED,
    [AI_CLUSTER.ALGORITHMS.CLIQUE]: AI_CLUSTER.CATEGORIES.GRID_BASED,
    [AI_CLUSTER.ALGORITHMS.FUZZY_C_MEANS]: AI_CLUSTER.CATEGORIES.FUZZY,
    [AI_CLUSTER.ALGORITHMS.FUZZY_K_MEANS]: AI_CLUSTER.CATEGORIES.FUZZY,
    [AI_CLUSTER.ALGORITHMS.BIRCH]: AI_CLUSTER.CATEGORIES.HIERARCHICAL,
    [AI_CLUSTER.ALGORITHMS.MEAN_SHIFT]: AI_CLUSTER.CATEGORIES.DENSITY_BASED,
    [AI_CLUSTER.ALGORITHMS.AFFINITY_PROPAGATION]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
    [AI_CLUSTER.ALGORITHMS.ISODATA]: AI_CLUSTER.CATEGORIES.PARTITIONAL,
  };
  return categories[algorithm] || AI_CLUSTER.CATEGORIES.PARTITIONAL;
}

export function getAiClusterQualityScore(quality: AIClusterQuality): number {
  const scores: Record<AIClusterQuality, number> = {
    [AI_CLUSTER.QUALITY.EXCELLENT]: 0.9,
    [AI_CLUSTER.QUALITY.GOOD]: 0.7,
    [AI_CLUSTER.QUALITY.FAIR]: 0.5,
    [AI_CLUSTER.QUALITY.POOR]: 0.3,
    [AI_CLUSTER.QUALITY.UNKNOWN]: 0,
  };
  return scores[quality] || 0;
}
