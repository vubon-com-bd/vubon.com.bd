/**
 * AI Training Phase Constants
 * Phase definitions for AI training lifecycle
 */

export const AI_TRAINING_PHASE = {
  // Phase Categories
  CATEGORIES: {
    DATA: 'data',
    MODEL: 'model',
    TRAINING: 'training',
    VALIDATION: 'validation',
    OPTIMIZATION: 'optimization',
    EVALUATION: 'evaluation',
    DEPLOYMENT: 'deployment',
    MONITORING: 'monitoring',
  } as const,

  // Phase Types
  TYPES: {
    // Data Phase
    DATA_COLLECTION: 'data_collection',
    DATA_CLEANING: 'data_cleaning',
    DATA_PREPROCESSING: 'data_preprocessing',
    DATA_AUGMENTATION: 'data_augmentation',
    DATA_SPLIT: 'data_split',

    // Model Phase
    MODEL_SELECTION: 'model_selection',
    MODEL_INITIALIZATION: 'model_initialization',
    MODEL_ARCHITECTURE: 'model_architecture',

    // Training Phase
    TRAINING_START: 'training_start',
    TRAINING_EPOCH: 'training_epoch',
    TRAINING_ITERATION: 'training_iteration',
    TRAINING_CHECKPOINT: 'training_checkpoint',

    // Validation Phase
    VALIDATION_START: 'validation_start',
    VALIDATION_EPOCH: 'validation_epoch',
    VALIDATION_BATCH: 'validation_batch',

    // Optimization Phase
    HYPERPARAMETER_TUNING: 'hyperparameter_tuning',
    LEARNING_RATE_SCHEDULE: 'learning_rate_schedule',
    GRADIENT_CLIPPING: 'gradient_clipping',
    MODEL_PRUNING: 'model_pruning',
    QUANTIZATION: 'quantization',

    // Evaluation Phase
    EVALUATION_START: 'evaluation_start',
    EVALUATION_BATCH: 'evaluation_batch',
    EVALUATION_COMPLETE: 'evaluation_complete',

    // Deployment Phase
    DEPLOYMENT_START: 'deployment_start',
    DEPLOYMENT_COMPLETE: 'deployment_complete',

    // Monitoring Phase
    MONITORING_START: 'monitoring_start',
    MONITORING_BATCH: 'monitoring_batch',
  } as const,

  // Phase Status
  STATUSES: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SKIPPED: 'skipped',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
  } as const,

  // Phase Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Phase Dependencies
  DEPENDENCIES: {
    DATA_COLLECTION: [],
    DATA_CLEANING: ['DATA_COLLECTION'],
    DATA_PREPROCESSING: ['DATA_CLEANING'],
    DATA_AUGMENTATION: ['DATA_PREPROCESSING'],
    DATA_SPLIT: ['DATA_AUGMENTATION'],
    MODEL_SELECTION: ['DATA_SPLIT'],
    MODEL_INITIALIZATION: ['MODEL_SELECTION'],
    MODEL_ARCHITECTURE: ['MODEL_INITIALIZATION'],
    TRAINING_START: ['MODEL_ARCHITECTURE', 'DATA_SPLIT'],
    TRAINING_EPOCH: ['TRAINING_START'],
    TRAINING_ITERATION: ['TRAINING_EPOCH'],
    TRAINING_CHECKPOINT: ['TRAINING_ITERATION'],
    VALIDATION_START: ['TRAINING_START'],
    VALIDATION_EPOCH: ['VALIDATION_START'],
    VALIDATION_BATCH: ['VALIDATION_EPOCH'],
    HYPERPARAMETER_TUNING: ['VALIDATION_START'],
    LEARNING_RATE_SCHEDULE: ['VALIDATION_START'],
    GRADIENT_CLIPPING: ['VALIDATION_START'],
    MODEL_PRUNING: ['VALIDATION_START'],
    QUANTIZATION: ['VALIDATION_START'],
    EVALUATION_START: ['VALIDATION_START'],
    EVALUATION_BATCH: ['EVALUATION_START'],
    EVALUATION_COMPLETE: ['EVALUATION_BATCH'],
    DEPLOYMENT_START: ['EVALUATION_COMPLETE'],
    DEPLOYMENT_COMPLETE: ['DEPLOYMENT_START'],
    MONITORING_START: ['DEPLOYMENT_COMPLETE'],
    MONITORING_BATCH: ['MONITORING_START'],
  } as const,

  // Phase Metrics
  METRICS: {
    DURATION: 'duration',
    PROGRESS: 'progress',
    SUCCESS_RATE: 'success_rate',
    ERROR_RATE: 'error_rate',
    RESOURCE_USAGE: 'resource_usage',
    THROUGHPUT: 'throughput',
    LATENCY: 'latency',
  } as const,
} as const;

export type AITrainingPhaseCategory =
  (typeof AI_TRAINING_PHASE.CATEGORIES)[keyof typeof AI_TRAINING_PHASE.CATEGORIES];

export type AITrainingPhaseType =
  (typeof AI_TRAINING_PHASE.TYPES)[keyof typeof AI_TRAINING_PHASE.TYPES];

export type AITrainingPhaseStatus =
  (typeof AI_TRAINING_PHASE.STATUSES)[keyof typeof AI_TRAINING_PHASE.STATUSES];

export type AITrainingPhasePriority =
  (typeof AI_TRAINING_PHASE.PRIORITIES)[keyof typeof AI_TRAINING_PHASE.PRIORITIES];

export type AITrainingPhaseMetric =
  (typeof AI_TRAINING_PHASE.METRICS)[keyof typeof AI_TRAINING_PHASE.METRICS];

export function getAiTrainingPhaseCategoryLabel(category: AITrainingPhaseCategory): string {
  const labels: Record<AITrainingPhaseCategory, string> = {
    [AI_TRAINING_PHASE.CATEGORIES.DATA]: 'Data',
    [AI_TRAINING_PHASE.CATEGORIES.MODEL]: 'Model',
    [AI_TRAINING_PHASE.CATEGORIES.TRAINING]: 'Training',
    [AI_TRAINING_PHASE.CATEGORIES.VALIDATION]: 'Validation',
    [AI_TRAINING_PHASE.CATEGORIES.OPTIMIZATION]: 'Optimization',
    [AI_TRAINING_PHASE.CATEGORIES.EVALUATION]: 'Evaluation',
    [AI_TRAINING_PHASE.CATEGORIES.DEPLOYMENT]: 'Deployment',
    [AI_TRAINING_PHASE.CATEGORIES.MONITORING]: 'Monitoring',
  };
  return labels[category] || 'Unknown';
}

export function getAiTrainingPhaseTypeLabel(type: AITrainingPhaseType): string {
  const labels: Record<AITrainingPhaseType, string> = {
    [AI_TRAINING_PHASE.TYPES.DATA_COLLECTION]: 'Data Collection',
    [AI_TRAINING_PHASE.TYPES.DATA_CLEANING]: 'Data Cleaning',
    [AI_TRAINING_PHASE.TYPES.DATA_PREPROCESSING]: 'Data Preprocessing',
    [AI_TRAINING_PHASE.TYPES.DATA_AUGMENTATION]: 'Data Augmentation',
    [AI_TRAINING_PHASE.TYPES.DATA_SPLIT]: 'Data Split',
    [AI_TRAINING_PHASE.TYPES.MODEL_SELECTION]: 'Model Selection',
    [AI_TRAINING_PHASE.TYPES.MODEL_INITIALIZATION]: 'Model Initialization',
    [AI_TRAINING_PHASE.TYPES.MODEL_ARCHITECTURE]: 'Model Architecture',
    [AI_TRAINING_PHASE.TYPES.TRAINING_START]: 'Training Start',
    [AI_TRAINING_PHASE.TYPES.TRAINING_EPOCH]: 'Training Epoch',
    [AI_TRAINING_PHASE.TYPES.TRAINING_ITERATION]: 'Training Iteration',
    [AI_TRAINING_PHASE.TYPES.TRAINING_CHECKPOINT]: 'Training Checkpoint',
    [AI_TRAINING_PHASE.TYPES.VALIDATION_START]: 'Validation Start',
    [AI_TRAINING_PHASE.TYPES.VALIDATION_EPOCH]: 'Validation Epoch',
    [AI_TRAINING_PHASE.TYPES.VALIDATION_BATCH]: 'Validation Batch',
    [AI_TRAINING_PHASE.TYPES.HYPERPARAMETER_TUNING]: 'Hyperparameter Tuning',
    [AI_TRAINING_PHASE.TYPES.LEARNING_RATE_SCHEDULE]: 'Learning Rate Schedule',
    [AI_TRAINING_PHASE.TYPES.GRADIENT_CLIPPING]: 'Gradient Clipping',
    [AI_TRAINING_PHASE.TYPES.MODEL_PRUNING]: 'Model Pruning',
    [AI_TRAINING_PHASE.TYPES.QUANTIZATION]: 'Quantization',
    [AI_TRAINING_PHASE.TYPES.EVALUATION_START]: 'Evaluation Start',
    [AI_TRAINING_PHASE.TYPES.EVALUATION_BATCH]: 'Evaluation Batch',
    [AI_TRAINING_PHASE.TYPES.EVALUATION_COMPLETE]: 'Evaluation Complete',
    [AI_TRAINING_PHASE.TYPES.DEPLOYMENT_START]: 'Deployment Start',
    [AI_TRAINING_PHASE.TYPES.DEPLOYMENT_COMPLETE]: 'Deployment Complete',
    [AI_TRAINING_PHASE.TYPES.MONITORING_START]: 'Monitoring Start',
    [AI_TRAINING_PHASE.TYPES.MONITORING_BATCH]: 'Monitoring Batch',
  };
  return labels[type] || 'Unknown';
}

export function getAiTrainingPhaseStatusLabel(status: AITrainingPhaseStatus): string {
  const labels: Record<AITrainingPhaseStatus, string> = {
    [AI_TRAINING_PHASE.STATUSES.PENDING]: 'Pending',
    [AI_TRAINING_PHASE.STATUSES.IN_PROGRESS]: 'In Progress',
    [AI_TRAINING_PHASE.STATUSES.COMPLETED]: 'Completed',
    [AI_TRAINING_PHASE.STATUSES.FAILED]: 'Failed',
    [AI_TRAINING_PHASE.STATUSES.SKIPPED]: 'Skipped',
    [AI_TRAINING_PHASE.STATUSES.PAUSED]: 'Paused',
    [AI_TRAINING_PHASE.STATUSES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function getAiTrainingPhasePriorityLabel(priority: AITrainingPhasePriority): string {
  const labels: Record<AITrainingPhasePriority, string> = {
    [AI_TRAINING_PHASE.PRIORITIES.CRITICAL]: 'Critical',
    [AI_TRAINING_PHASE.PRIORITIES.HIGH]: 'High',
    [AI_TRAINING_PHASE.PRIORITIES.MEDIUM]: 'Medium',
    [AI_TRAINING_PHASE.PRIORITIES.LOW]: 'Low',
    [AI_TRAINING_PHASE.PRIORITIES.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown';
}

export function getAiTrainingPhaseMetricLabel(metric: AITrainingPhaseMetric): string {
  const labels: Record<AITrainingPhaseMetric, string> = {
    [AI_TRAINING_PHASE.METRICS.DURATION]: 'Duration',
    [AI_TRAINING_PHASE.METRICS.PROGRESS]: 'Progress',
    [AI_TRAINING_PHASE.METRICS.SUCCESS_RATE]: 'Success Rate',
    [AI_TRAINING_PHASE.METRICS.ERROR_RATE]: 'Error Rate',
    [AI_TRAINING_PHASE.METRICS.RESOURCE_USAGE]: 'Resource Usage',
    [AI_TRAINING_PHASE.METRICS.THROUGHPUT]: 'Throughput',
    [AI_TRAINING_PHASE.METRICS.LATENCY]: 'Latency',
  };
  return labels[metric] || 'Unknown';
}

export function getAiTrainingPhaseDependencies(type: AITrainingPhaseType): AITrainingPhaseType[] {
  const dependencies = AI_TRAINING_PHASE.DEPENDENCIES;
  const deps = dependencies[type as keyof typeof dependencies];
  return deps ? deps.map((d) => d as AITrainingPhaseType) : [];
}
