/**
 * AI Training Constants
 * Configuration for AI model training and fine-tuning
 */

export const AI_TRAINING = {
  // Training Types
  TYPES: {
    SUPERVISED: 'supervised',
    UNSUPERVISED: 'unsupervised',
    SEMI_SUPERVISED: 'semi_supervised',
    SELF_SUPERVISED: 'self_supervised',
    REINFORCEMENT: 'reinforcement',
    TRANSFER: 'transfer',
    FEW_SHOT: 'few_shot',
    ZERO_SHOT: 'zero_shot',
    CONTINUOUS: 'continuous',
    ONLINE: 'online',
    BATCH: 'batch',
    DISTRIBUTED: 'distributed',
  } as const,

  // Training Status
  STATUSES: {
    PENDING: 'pending',
    INITIALIZING: 'initializing',
    PREPARING: 'preparing',
    TRAINING: 'training',
    VALIDATING: 'validating',
    OPTIMIZING: 'optimizing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    DEPLOYED: 'deployed',
  } as const,

  // Training Phases
  PHASES: {
    DATA_PREPARATION: 'data_preparation',
    DATA_AUGMENTATION: 'data_augmentation',
    FEATURE_EXTRACTION: 'feature_extraction',
    MODEL_INITIALIZATION: 'model_initialization',
    MODEL_TRAINING: 'model_training',
    MODEL_VALIDATION: 'model_validation',
    HYPERPARAMETER_TUNING: 'hyperparameter_tuning',
    MODEL_OPTIMIZATION: 'model_optimization',
    MODEL_EVALUATION: 'model_evaluation',
    MODEL_DEPLOYMENT: 'model_deployment',
    MODEL_MONITORING: 'model_monitoring',
  } as const,

  // Training Parameters
  PARAMETERS: {
    LEARNING_RATE: 'learning_rate',
    BATCH_SIZE: 'batch_size',
    EPOCHS: 'epochs',
    DROPOUT: 'dropout',
    WEIGHT_DECAY: 'weight_decay',
    MOMENTUM: 'momentum',
    OPTIMIZER: 'optimizer',
    LOSS_FUNCTION: 'loss_function',
    METRICS: 'metrics',
    EARLY_STOPPING: 'early_stopping',
    VALIDATION_SPLIT: 'validation_split',
    SHUFFLE: 'shuffle',
    AUGMENTATION: 'augmentation',
    REGULARIZATION: 'regularization',
    NORMALIZATION: 'normalization',
  } as const,

  // Training Limits
  LIMITS: {
    MAX_EPOCHS: 1000,
    MIN_EPOCHS: 1,
    DEFAULT_EPOCHS: 10,
    MAX_BATCH_SIZE: 1024,
    MIN_BATCH_SIZE: 1,
    DEFAULT_BATCH_SIZE: 32,
    MAX_LEARNING_RATE: 1.0,
    MIN_LEARNING_RATE: 0.0000001,
    DEFAULT_LEARNING_RATE: 0.001,
    MAX_EARLY_STOPPING: 50,
    DEFAULT_EARLY_STOPPING: 10,
    VALIDATION_SPLIT: 0.2,
    MAX_DATA_SIZE: 10000000,
    TIMEOUT: 3600000,
  } as const,

  // Training Metrics
  METRICS: {
    LOSS: 'loss',
    ACCURACY: 'accuracy',
    PRECISION: 'precision',
    RECALL: 'recall',
    F1_SCORE: 'f1_score',
    ROC_AUC: 'roc_auc',
    MSE: 'mse',
    MAE: 'mae',
    RMSE: 'rmse',
    R2_SCORE: 'r2_score',
    PERPLEXITY: 'perplexity',
    BLEU: 'bleu',
    ROUGE: 'rouge',
    METEOR: 'meteor',
    CER: 'cer',
    WER: 'wer',
  } as const,

  // Training Optimizers
  OPTIMIZERS: {
    SGD: 'sgd',
    ADAM: 'adam',
    ADAMW: 'adamw',
    ADAGRAD: 'adagrad',
    RMSPROP: 'rmsprop',
    NADAM: 'nadam',
    ADADELTA: 'adadelta',
    LION: 'lion',
    SCHEDULED: 'scheduled',
  } as const,

  // Training Loss Functions
  LOSS_FUNCTIONS: {
    CROSS_ENTROPY: 'cross_entropy',
    BINARY_CROSS_ENTROPY: 'binary_cross_entropy',
    MSE: 'mse',
    MAE: 'mae',
    HUBER: 'huber',
    HINGE: 'hinge',
    KLDIV: 'kldiv',
    CTC: 'ctc',
    CONTRASTIVE: 'contrastive',
    TRIPLET: 'triplet',
  } as const,

  // Training Frameworks
  FRAMEWORKS: {
    PYTORCH: 'pytorch',
    TENSORFLOW: 'tensorflow',
    JAX: 'jax',
    KERAS: 'keras',
    PADDLE: 'paddle',
    MXNET: 'mxnet',
    CAFFE: 'caffe',
    ONNX: 'onnx',
  } as const,

  // Training Hardware
  HARDWARE: {
    CPU: 'cpu',
    GPU: 'gpu',
    TPU: 'tpu',
    MULTI_GPU: 'multi_gpu',
    DISTRIBUTED: 'distributed',
    CLUSTER: 'cluster',
  } as const,

  // Training Checkpoints
  CHECKPOINTS: {
    SAVE_INTERVAL: 5,
    MAX_TO_KEEP: 10,
    SAVE_BEST: true,
    SAVE_LAST: true,
    METRIC: 'loss',
    MODE: 'min',
  } as const,
} as const;

export type AITrainingType = (typeof AI_TRAINING.TYPES)[keyof typeof AI_TRAINING.TYPES];
export type AITrainingStatus = (typeof AI_TRAINING.STATUSES)[keyof typeof AI_TRAINING.STATUSES];
export type AITrainingPhase = (typeof AI_TRAINING.PHASES)[keyof typeof AI_TRAINING.PHASES];
export type AITrainingParameter =
  (typeof AI_TRAINING.PARAMETERS)[keyof typeof AI_TRAINING.PARAMETERS];
export type AITrainingLimit = (typeof AI_TRAINING.LIMITS)[keyof typeof AI_TRAINING.LIMITS];
export type AITrainingMetric = (typeof AI_TRAINING.METRICS)[keyof typeof AI_TRAINING.METRICS];
export type AITrainingOptimizer =
  (typeof AI_TRAINING.OPTIMIZERS)[keyof typeof AI_TRAINING.OPTIMIZERS];
export type AITrainingLossFunction =
  (typeof AI_TRAINING.LOSS_FUNCTIONS)[keyof typeof AI_TRAINING.LOSS_FUNCTIONS];
export type AITrainingFramework =
  (typeof AI_TRAINING.FRAMEWORKS)[keyof typeof AI_TRAINING.FRAMEWORKS];
export type AITrainingHardware = (typeof AI_TRAINING.HARDWARE)[keyof typeof AI_TRAINING.HARDWARE];
export type AITrainingCheckpoint =
  (typeof AI_TRAINING.CHECKPOINTS)[keyof typeof AI_TRAINING.CHECKPOINTS];

export function getAiTrainingTypeLabel(type: AITrainingType): string {
  const labels: Record<AITrainingType, string> = {
    [AI_TRAINING.TYPES.SUPERVISED]: 'Supervised',
    [AI_TRAINING.TYPES.UNSUPERVISED]: 'Unsupervised',
    [AI_TRAINING.TYPES.SEMI_SUPERVISED]: 'Semi-Supervised',
    [AI_TRAINING.TYPES.SELF_SUPERVISED]: 'Self-Supervised',
    [AI_TRAINING.TYPES.REINFORCEMENT]: 'Reinforcement',
    [AI_TRAINING.TYPES.TRANSFER]: 'Transfer',
    [AI_TRAINING.TYPES.FEW_SHOT]: 'Few Shot',
    [AI_TRAINING.TYPES.ZERO_SHOT]: 'Zero Shot',
    [AI_TRAINING.TYPES.CONTINUOUS]: 'Continuous',
    [AI_TRAINING.TYPES.ONLINE]: 'Online',
    [AI_TRAINING.TYPES.BATCH]: 'Batch',
    [AI_TRAINING.TYPES.DISTRIBUTED]: 'Distributed',
  };
  return labels[type] || 'Unknown';
}

export function getAiTrainingStatusLabel(status: AITrainingStatus): string {
  const labels: Record<AITrainingStatus, string> = {
    [AI_TRAINING.STATUSES.PENDING]: 'Pending',
    [AI_TRAINING.STATUSES.INITIALIZING]: 'Initializing',
    [AI_TRAINING.STATUSES.PREPARING]: 'Preparing',
    [AI_TRAINING.STATUSES.TRAINING]: 'Training',
    [AI_TRAINING.STATUSES.VALIDATING]: 'Validating',
    [AI_TRAINING.STATUSES.OPTIMIZING]: 'Optimizing',
    [AI_TRAINING.STATUSES.COMPLETED]: 'Completed',
    [AI_TRAINING.STATUSES.FAILED]: 'Failed',
    [AI_TRAINING.STATUSES.PAUSED]: 'Paused',
    [AI_TRAINING.STATUSES.CANCELLED]: 'Cancelled',
    [AI_TRAINING.STATUSES.ARCHIVED]: 'Archived',
    [AI_TRAINING.STATUSES.DEPLOYED]: 'Deployed',
  };
  return labels[status] || 'Unknown';
}

export function getAiTrainingPhaseLabel(phase: AITrainingPhase): string {
  const labels: Record<AITrainingPhase, string> = {
    [AI_TRAINING.PHASES.DATA_PREPARATION]: 'Data Preparation',
    [AI_TRAINING.PHASES.DATA_AUGMENTATION]: 'Data Augmentation',
    [AI_TRAINING.PHASES.FEATURE_EXTRACTION]: 'Feature Extraction',
    [AI_TRAINING.PHASES.MODEL_INITIALIZATION]: 'Model Initialization',
    [AI_TRAINING.PHASES.MODEL_TRAINING]: 'Model Training',
    [AI_TRAINING.PHASES.MODEL_VALIDATION]: 'Model Validation',
    [AI_TRAINING.PHASES.HYPERPARAMETER_TUNING]: 'Hyperparameter Tuning',
    [AI_TRAINING.PHASES.MODEL_OPTIMIZATION]: 'Model Optimization',
    [AI_TRAINING.PHASES.MODEL_EVALUATION]: 'Model Evaluation',
    [AI_TRAINING.PHASES.MODEL_DEPLOYMENT]: 'Model Deployment',
    [AI_TRAINING.PHASES.MODEL_MONITORING]: 'Model Monitoring',
  };
  return labels[phase] || 'Unknown';
}

export function getAiTrainingMetricLabel(metric: AITrainingMetric): string {
  const labels: Record<AITrainingMetric, string> = {
    [AI_TRAINING.METRICS.LOSS]: 'Loss',
    [AI_TRAINING.METRICS.ACCURACY]: 'Accuracy',
    [AI_TRAINING.METRICS.PRECISION]: 'Precision',
    [AI_TRAINING.METRICS.RECALL]: 'Recall',
    [AI_TRAINING.METRICS.F1_SCORE]: 'F1 Score',
    [AI_TRAINING.METRICS.ROC_AUC]: 'ROC AUC',
    [AI_TRAINING.METRICS.MSE]: 'MSE',
    [AI_TRAINING.METRICS.MAE]: 'MAE',
    [AI_TRAINING.METRICS.RMSE]: 'RMSE',
    [AI_TRAINING.METRICS.R2_SCORE]: 'R2 Score',
    [AI_TRAINING.METRICS.PERPLEXITY]: 'Perplexity',
    [AI_TRAINING.METRICS.BLEU]: 'BLEU',
    [AI_TRAINING.METRICS.ROUGE]: 'ROUGE',
    [AI_TRAINING.METRICS.METEOR]: 'METEOR',
    [AI_TRAINING.METRICS.CER]: 'CER',
    [AI_TRAINING.METRICS.WER]: 'WER',
  };
  return labels[metric] || 'Unknown';
}

export function getAiTrainingOptimizerLabel(optimizer: AITrainingOptimizer): string {
  const labels: Record<AITrainingOptimizer, string> = {
    [AI_TRAINING.OPTIMIZERS.SGD]: 'SGD',
    [AI_TRAINING.OPTIMIZERS.ADAM]: 'Adam',
    [AI_TRAINING.OPTIMIZERS.ADAMW]: 'AdamW',
    [AI_TRAINING.OPTIMIZERS.ADAGRAD]: 'AdaGrad',
    [AI_TRAINING.OPTIMIZERS.RMSPROP]: 'RMSprop',
    [AI_TRAINING.OPTIMIZERS.NADAM]: 'Nadam',
    [AI_TRAINING.OPTIMIZERS.ADADELTA]: 'Adadelta',
    [AI_TRAINING.OPTIMIZERS.LION]: 'LION',
    [AI_TRAINING.OPTIMIZERS.SCHEDULED]: 'Scheduled',
  };
  return labels[optimizer] || 'Unknown';
}

export function getAiTrainingLossFunctionLabel(lossFunction: AITrainingLossFunction): string {
  const labels: Record<AITrainingLossFunction, string> = {
    [AI_TRAINING.LOSS_FUNCTIONS.CROSS_ENTROPY]: 'Cross Entropy',
    [AI_TRAINING.LOSS_FUNCTIONS.BINARY_CROSS_ENTROPY]: 'Binary Cross Entropy',
    [AI_TRAINING.LOSS_FUNCTIONS.MSE]: 'MSE',
    [AI_TRAINING.LOSS_FUNCTIONS.MAE]: 'MAE',
    [AI_TRAINING.LOSS_FUNCTIONS.HUBER]: 'Huber',
    [AI_TRAINING.LOSS_FUNCTIONS.HINGE]: 'Hinge',
    [AI_TRAINING.LOSS_FUNCTIONS.KLDIV]: 'KL Divergence',
    [AI_TRAINING.LOSS_FUNCTIONS.CTC]: 'CTC',
    [AI_TRAINING.LOSS_FUNCTIONS.CONTRASTIVE]: 'Contrastive',
    [AI_TRAINING.LOSS_FUNCTIONS.TRIPLET]: 'Triplet',
  };
  return labels[lossFunction] || 'Unknown';
}

export function getAiTrainingFrameworkLabel(framework: AITrainingFramework): string {
  const labels: Record<AITrainingFramework, string> = {
    [AI_TRAINING.FRAMEWORKS.PYTORCH]: 'PyTorch',
    [AI_TRAINING.FRAMEWORKS.TENSORFLOW]: 'TensorFlow',
    [AI_TRAINING.FRAMEWORKS.JAX]: 'JAX',
    [AI_TRAINING.FRAMEWORKS.KERAS]: 'Keras',
    [AI_TRAINING.FRAMEWORKS.PADDLE]: 'Paddle',
    [AI_TRAINING.FRAMEWORKS.MXNET]: 'MXNet',
    [AI_TRAINING.FRAMEWORKS.CAFFE]: 'Caffe',
    [AI_TRAINING.FRAMEWORKS.ONNX]: 'ONNX',
  };
  return labels[framework] || 'Unknown';
}

export function getAiTrainingHardwareLabel(hardware: AITrainingHardware): string {
  const labels: Record<AITrainingHardware, string> = {
    [AI_TRAINING.HARDWARE.CPU]: 'CPU',
    [AI_TRAINING.HARDWARE.GPU]: 'GPU',
    [AI_TRAINING.HARDWARE.TPU]: 'TPU',
    [AI_TRAINING.HARDWARE.MULTI_GPU]: 'Multi-GPU',
    [AI_TRAINING.HARDWARE.DISTRIBUTED]: 'Distributed',
    [AI_TRAINING.HARDWARE.CLUSTER]: 'Cluster',
  };
  return labels[hardware] || 'Unknown';
}

export function isAiTrainingActive(status: AITrainingStatus): boolean {
  const activeStatuses: AITrainingStatus[] = [
    AI_TRAINING.STATUSES.PENDING,
    AI_TRAINING.STATUSES.INITIALIZING,
    AI_TRAINING.STATUSES.PREPARING,
    AI_TRAINING.STATUSES.TRAINING,
    AI_TRAINING.STATUSES.VALIDATING,
    AI_TRAINING.STATUSES.OPTIMIZING,
  ];
  return activeStatuses.includes(status);
}

export function isAiTrainingComplete(status: AITrainingStatus): boolean {
  const completeStatuses: AITrainingStatus[] = [
    AI_TRAINING.STATUSES.COMPLETED,
    AI_TRAINING.STATUSES.DEPLOYED,
    AI_TRAINING.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function isAiTrainingFailed(status: AITrainingStatus): boolean {
  const failedStatuses: AITrainingStatus[] = [
    AI_TRAINING.STATUSES.FAILED,
    AI_TRAINING.STATUSES.CANCELLED,
  ];
  return failedStatuses.includes(status);
}

export function getAiTrainingDefaultEpochs(): number {
  return AI_TRAINING.LIMITS.DEFAULT_EPOCHS;
}

export function getAiTrainingDefaultBatchSize(): number {
  return AI_TRAINING.LIMITS.DEFAULT_BATCH_SIZE;
}

export function getAiTrainingDefaultLearningRate(): number {
  return AI_TRAINING.LIMITS.DEFAULT_LEARNING_RATE;
}

export function getAiTrainingValidationSplit(): number {
  return AI_TRAINING.LIMITS.VALIDATION_SPLIT;
}
