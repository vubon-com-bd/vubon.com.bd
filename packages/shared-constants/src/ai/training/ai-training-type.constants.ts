/**
 * AI Training Type Constants
 * Types and classifications for AI model training
 */

export const AI_TRAINING_TYPE = {
  // Training Categories
  CATEGORIES: {
    CLASSIFICATION: 'classification',
    REGRESSION: 'regression',
    CLUSTERING: 'clustering',
    GENERATION: 'generation',
    TRANSLATION: 'translation',
    SUMMARIZATION: 'summarization',
    QUESTION_ANSWERING: 'question_answering',
    EMBEDDING: 'embedding',
    RANKING: 'ranking',
    RECOMMENDATION: 'recommendation',
    DETECTION: 'detection',
    SEGMENTATION: 'segmentation',
  } as const,

  // Training Sub-Types
  SUB_TYPES: {
    BINARY_CLASSIFICATION: 'binary_classification',
    MULTI_CLASS_CLASSIFICATION: 'multi_class_classification',
    MULTI_LABEL_CLASSIFICATION: 'multi_label_classification',
    LINEAR_REGRESSION: 'linear_regression',
    LOGISTIC_REGRESSION: 'logistic_regression',
    POLYNOMIAL_REGRESSION: 'polynomial_regression',
    K_MEANS: 'k_means',
    HIERARCHICAL: 'hierarchical',
    DBSCAN: 'dbscan',
    GAN: 'gan',
    VAE: 'vae',
    DIFFUSION: 'diffusion',
  } as const,

  // Training Methods
  METHODS: {
    GRADIENT_DESCENT: 'gradient_descent',
    STOCHASTIC_GRADIENT_DESCENT: 'stochastic_gradient_descent',
    MINI_BATCH_GRADIENT_DESCENT: 'mini_batch_gradient_descent',
    ADAM: 'adam',
    RMSPROP: 'rmsprop',
    ADAGRAD: 'adagrad',
    MOMENTUM: 'momentum',
    NESTEROV: 'nesterov',
  } as const,

  // Training Objectives
  OBJECTIVES: {
    MINIMIZE_LOSS: 'minimize_loss',
    MAXIMIZE_ACCURACY: 'maximize_accuracy',
    MAXIMIZE_F1: 'maximize_f1',
    MAXIMIZE_ROI: 'maximize_roi',
    MINIMIZE_ERROR: 'minimize_error',
    MAXIMIZE_PRECISION: 'maximize_precision',
    MAXIMIZE_RECALL: 'maximize_recall',
    BALANCED: 'balanced',
  } as const,

  // Training Modes
  MODES: {
    FULL: 'full',
    INCREMENTAL: 'incremental',
    ONLINE: 'online',
    BATCH: 'batch',
    DISTRIBUTED: 'distributed',
    PARALLEL: 'parallel',
    SEQUENTIAL: 'sequential',
  } as const,

  // Training Data Types
  DATA_TYPES: {
    STRUCTURED: 'structured',
    UNSTRUCTURED: 'unstructured',
    SEMI_STRUCTURED: 'semi_structured',
    TIME_SERIES: 'time_series',
    SEQUENTIAL: 'sequential',
    HIERARCHICAL: 'hierarchical',
    GRAPH: 'graph',
  } as const,
} as const;

export type AITrainingCategory =
  (typeof AI_TRAINING_TYPE.CATEGORIES)[keyof typeof AI_TRAINING_TYPE.CATEGORIES];
export type AITrainingSubType =
  (typeof AI_TRAINING_TYPE.SUB_TYPES)[keyof typeof AI_TRAINING_TYPE.SUB_TYPES];
export type AITrainingMethod =
  (typeof AI_TRAINING_TYPE.METHODS)[keyof typeof AI_TRAINING_TYPE.METHODS];
export type AITrainingObjective =
  (typeof AI_TRAINING_TYPE.OBJECTIVES)[keyof typeof AI_TRAINING_TYPE.OBJECTIVES];
export type AITrainingMode = (typeof AI_TRAINING_TYPE.MODES)[keyof typeof AI_TRAINING_TYPE.MODES];
export type AITrainingDataType =
  (typeof AI_TRAINING_TYPE.DATA_TYPES)[keyof typeof AI_TRAINING_TYPE.DATA_TYPES];

export function getAiTrainingCategoryLabel(category: AITrainingCategory): string {
  const labels: Record<AITrainingCategory, string> = {
    [AI_TRAINING_TYPE.CATEGORIES.CLASSIFICATION]: 'Classification',
    [AI_TRAINING_TYPE.CATEGORIES.REGRESSION]: 'Regression',
    [AI_TRAINING_TYPE.CATEGORIES.CLUSTERING]: 'Clustering',
    [AI_TRAINING_TYPE.CATEGORIES.GENERATION]: 'Generation',
    [AI_TRAINING_TYPE.CATEGORIES.TRANSLATION]: 'Translation',
    [AI_TRAINING_TYPE.CATEGORIES.SUMMARIZATION]: 'Summarization',
    [AI_TRAINING_TYPE.CATEGORIES.QUESTION_ANSWERING]: 'Question Answering',
    [AI_TRAINING_TYPE.CATEGORIES.EMBEDDING]: 'Embedding',
    [AI_TRAINING_TYPE.CATEGORIES.RANKING]: 'Ranking',
    [AI_TRAINING_TYPE.CATEGORIES.RECOMMENDATION]: 'Recommendation',
    [AI_TRAINING_TYPE.CATEGORIES.DETECTION]: 'Detection',
    [AI_TRAINING_TYPE.CATEGORIES.SEGMENTATION]: 'Segmentation',
  };
  return labels[category] || 'Unknown';
}

export function getAiTrainingSubTypeLabel(subType: AITrainingSubType): string {
  const labels: Record<AITrainingSubType, string> = {
    [AI_TRAINING_TYPE.SUB_TYPES.BINARY_CLASSIFICATION]: 'Binary Classification',
    [AI_TRAINING_TYPE.SUB_TYPES.MULTI_CLASS_CLASSIFICATION]: 'Multi-Class Classification',
    [AI_TRAINING_TYPE.SUB_TYPES.MULTI_LABEL_CLASSIFICATION]: 'Multi-Label Classification',
    [AI_TRAINING_TYPE.SUB_TYPES.LINEAR_REGRESSION]: 'Linear Regression',
    [AI_TRAINING_TYPE.SUB_TYPES.LOGISTIC_REGRESSION]: 'Logistic Regression',
    [AI_TRAINING_TYPE.SUB_TYPES.POLYNOMIAL_REGRESSION]: 'Polynomial Regression',
    [AI_TRAINING_TYPE.SUB_TYPES.K_MEANS]: 'K-Means',
    [AI_TRAINING_TYPE.SUB_TYPES.HIERARCHICAL]: 'Hierarchical',
    [AI_TRAINING_TYPE.SUB_TYPES.DBSCAN]: 'DBSCAN',
    [AI_TRAINING_TYPE.SUB_TYPES.GAN]: 'GAN',
    [AI_TRAINING_TYPE.SUB_TYPES.VAE]: 'VAE',
    [AI_TRAINING_TYPE.SUB_TYPES.DIFFUSION]: 'Diffusion',
  };
  return labels[subType] || 'Unknown';
}

export function getAiTrainingMethodLabel(method: AITrainingMethod): string {
  const labels: Record<AITrainingMethod, string> = {
    [AI_TRAINING_TYPE.METHODS.GRADIENT_DESCENT]: 'Gradient Descent',
    [AI_TRAINING_TYPE.METHODS.STOCHASTIC_GRADIENT_DESCENT]: 'Stochastic Gradient Descent',
    [AI_TRAINING_TYPE.METHODS.MINI_BATCH_GRADIENT_DESCENT]: 'Mini-Batch Gradient Descent',
    [AI_TRAINING_TYPE.METHODS.ADAM]: 'Adam',
    [AI_TRAINING_TYPE.METHODS.RMSPROP]: 'RMSprop',
    [AI_TRAINING_TYPE.METHODS.ADAGRAD]: 'AdaGrad',
    [AI_TRAINING_TYPE.METHODS.MOMENTUM]: 'Momentum',
    [AI_TRAINING_TYPE.METHODS.NESTEROV]: 'Nesterov',
  };
  return labels[method] || 'Unknown';
}

export function getAiTrainingObjectiveLabel(objective: AITrainingObjective): string {
  const labels: Record<AITrainingObjective, string> = {
    [AI_TRAINING_TYPE.OBJECTIVES.MINIMIZE_LOSS]: 'Minimize Loss',
    [AI_TRAINING_TYPE.OBJECTIVES.MAXIMIZE_ACCURACY]: 'Maximize Accuracy',
    [AI_TRAINING_TYPE.OBJECTIVES.MAXIMIZE_F1]: 'Maximize F1',
    [AI_TRAINING_TYPE.OBJECTIVES.MAXIMIZE_ROI]: 'Maximize ROI',
    [AI_TRAINING_TYPE.OBJECTIVES.MINIMIZE_ERROR]: 'Minimize Error',
    [AI_TRAINING_TYPE.OBJECTIVES.MAXIMIZE_PRECISION]: 'Maximize Precision',
    [AI_TRAINING_TYPE.OBJECTIVES.MAXIMIZE_RECALL]: 'Maximize Recall',
    [AI_TRAINING_TYPE.OBJECTIVES.BALANCED]: 'Balanced',
  };
  return labels[objective] || 'Unknown';
}

export function getAiTrainingModeLabel(mode: AITrainingMode): string {
  const labels: Record<AITrainingMode, string> = {
    [AI_TRAINING_TYPE.MODES.FULL]: 'Full',
    [AI_TRAINING_TYPE.MODES.INCREMENTAL]: 'Incremental',
    [AI_TRAINING_TYPE.MODES.ONLINE]: 'Online',
    [AI_TRAINING_TYPE.MODES.BATCH]: 'Batch',
    [AI_TRAINING_TYPE.MODES.DISTRIBUTED]: 'Distributed',
    [AI_TRAINING_TYPE.MODES.PARALLEL]: 'Parallel',
    [AI_TRAINING_TYPE.MODES.SEQUENTIAL]: 'Sequential',
  };
  return labels[mode] || 'Unknown';
}

export function getAiTrainingDataTypeLabel(dataType: AITrainingDataType): string {
  const labels: Record<AITrainingDataType, string> = {
    [AI_TRAINING_TYPE.DATA_TYPES.STRUCTURED]: 'Structured',
    [AI_TRAINING_TYPE.DATA_TYPES.UNSTRUCTURED]: 'Unstructured',
    [AI_TRAINING_TYPE.DATA_TYPES.SEMI_STRUCTURED]: 'Semi-Structured',
    [AI_TRAINING_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [AI_TRAINING_TYPE.DATA_TYPES.SEQUENTIAL]: 'Sequential',
    [AI_TRAINING_TYPE.DATA_TYPES.HIERARCHICAL]: 'Hierarchical',
    [AI_TRAINING_TYPE.DATA_TYPES.GRAPH]: 'Graph',
  };
  return labels[dataType] || 'Unknown';
}
