/**
 * AI ট্রেইনিং টাইপ এনাম
 */
export const AI_TRAINING_TYPE = {
  SUPERVISED: 'supervised',
  UNSUPERVISED: 'unsupervised',
  REINFORCEMENT: 'reinforcement',
  TRANSFER_LEARNING: 'transfer-learning',
  FEW_SHOT: 'few-shot',
  ZERO_SHOT: 'zero-shot',
  FINE_TUNING: 'fine-tuning',
  DISTILLATION: 'distillation',
} as const;

/**
 * AI_TRAINING_TYPE থেকে টাইপ
 */
export type AITrainingTypeType = (typeof AI_TRAINING_TYPE)[keyof typeof AI_TRAINING_TYPE];

/**
 * ট্রেইনিং টাইপ লেবেল
 */
export const AI_TRAINING_TYPE_LABELS: Record<AITrainingTypeType, string> = {
  [AI_TRAINING_TYPE.SUPERVISED]: 'Supervised',
  [AI_TRAINING_TYPE.UNSUPERVISED]: 'Unsupervised',
  [AI_TRAINING_TYPE.REINFORCEMENT]: 'Reinforcement',
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]: 'Transfer Learning',
  [AI_TRAINING_TYPE.FEW_SHOT]: 'Few-Shot',
  [AI_TRAINING_TYPE.ZERO_SHOT]: 'Zero-Shot',
  [AI_TRAINING_TYPE.FINE_TUNING]: 'Fine-Tuning',
  [AI_TRAINING_TYPE.DISTILLATION]: 'Distillation',
} as const;

/**
 * ট্রেইনিং টাইপ বিবরণ
 */
export const AI_TRAINING_TYPE_DESCRIPTIONS: Record<AITrainingTypeType, string> = {
  [AI_TRAINING_TYPE.SUPERVISED]: 'Training with labeled data and ground truth labels',
  [AI_TRAINING_TYPE.UNSUPERVISED]: 'Training with unlabeled data to discover patterns',
  [AI_TRAINING_TYPE.REINFORCEMENT]: 'Training through trial and error with reward signals',
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]:
    'Transferring knowledge from pre-trained models to new tasks',
  [AI_TRAINING_TYPE.FEW_SHOT]: 'Training with very few labeled examples',
  [AI_TRAINING_TYPE.ZERO_SHOT]:
    'Training without any labeled examples using semantic understanding',
  [AI_TRAINING_TYPE.FINE_TUNING]: 'Fine-tuning pre-trained models on task-specific data',
  [AI_TRAINING_TYPE.DISTILLATION]: 'Distilling knowledge from large models to smaller ones',
} as const;

/**
 * ট্রেইনিং টাইপ আইকন
 */
export const AI_TRAINING_TYPE_ICONS: Record<AITrainingTypeType, string> = {
  [AI_TRAINING_TYPE.SUPERVISED]: '📚',
  [AI_TRAINING_TYPE.UNSUPERVISED]: '🔍',
  [AI_TRAINING_TYPE.REINFORCEMENT]: '🎮',
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]: '🔄',
  [AI_TRAINING_TYPE.FEW_SHOT]: '🎯',
  [AI_TRAINING_TYPE.ZERO_SHOT]: '💡',
  [AI_TRAINING_TYPE.FINE_TUNING]: '⚙️',
  [AI_TRAINING_TYPE.DISTILLATION]: '🧪',
} as const;

/**
 * ট্রেইনিং টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_TRAINING_TYPE_COMPLEXITY: Record<AITrainingTypeType, number> = {
  [AI_TRAINING_TYPE.SUPERVISED]: 3,
  [AI_TRAINING_TYPE.UNSUPERVISED]: 4,
  [AI_TRAINING_TYPE.REINFORCEMENT]: 5,
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]: 4,
  [AI_TRAINING_TYPE.FEW_SHOT]: 3,
  [AI_TRAINING_TYPE.ZERO_SHOT]: 4,
  [AI_TRAINING_TYPE.FINE_TUNING]: 2,
  [AI_TRAINING_TYPE.DISTILLATION]: 4,
} as const;

/**
 * ট্রেইনিং টাইপ ডেটা প্রয়োজনীয়তা
 */
export const AI_TRAINING_TYPE_DATA_REQUIREMENT: Record<
  AITrainingTypeType,
  { minSamples: number; requiresLabels: boolean; requiresPretrained: boolean }
> = {
  [AI_TRAINING_TYPE.SUPERVISED]: {
    minSamples: 1000,
    requiresLabels: true,
    requiresPretrained: false,
  },
  [AI_TRAINING_TYPE.UNSUPERVISED]: {
    minSamples: 10000,
    requiresLabels: false,
    requiresPretrained: false,
  },
  [AI_TRAINING_TYPE.REINFORCEMENT]: {
    minSamples: 100000,
    requiresLabels: false,
    requiresPretrained: false,
  },
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]: {
    minSamples: 100,
    requiresLabels: true,
    requiresPretrained: true,
  },
  [AI_TRAINING_TYPE.FEW_SHOT]: { minSamples: 10, requiresLabels: true, requiresPretrained: true },
  [AI_TRAINING_TYPE.ZERO_SHOT]: { minSamples: 0, requiresLabels: false, requiresPretrained: true },
  [AI_TRAINING_TYPE.FINE_TUNING]: {
    minSamples: 500,
    requiresLabels: true,
    requiresPretrained: true,
  },
  [AI_TRAINING_TYPE.DISTILLATION]: {
    minSamples: 10000,
    requiresLabels: true,
    requiresPretrained: true,
  },
} as const;

/**
 * ট্রেইনিং টাইপ কনফিগারেশন
 */
export interface AITrainingTypeConfig {
  type: AITrainingTypeType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  dataRequirement: {
    minSamples: number;
    requiresLabels: boolean;
    requiresPretrained: boolean;
  };
  recommendedGPUMemory: number;
  trainingTime: string;
  bestFor: string[];
}

/**
 * ট্রেইনিং টাইপ মেটাডেটা
 */
export const AI_TRAINING_TYPE_METADATA: Record<AITrainingTypeType, AITrainingTypeConfig> = {
  [AI_TRAINING_TYPE.SUPERVISED]: {
    type: AI_TRAINING_TYPE.SUPERVISED,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.SUPERVISED],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.SUPERVISED],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.SUPERVISED],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.SUPERVISED],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.SUPERVISED],
    recommendedGPUMemory: 8,
    trainingTime: 'medium',
    bestFor: ['classification', 'regression', 'object-detection'],
  },
  [AI_TRAINING_TYPE.UNSUPERVISED]: {
    type: AI_TRAINING_TYPE.UNSUPERVISED,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.UNSUPERVISED],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.UNSUPERVISED],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.UNSUPERVISED],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.UNSUPERVISED],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.UNSUPERVISED],
    recommendedGPUMemory: 12,
    trainingTime: 'long',
    bestFor: ['clustering', 'anomaly-detection', 'dimensionality-reduction'],
  },
  [AI_TRAINING_TYPE.REINFORCEMENT]: {
    type: AI_TRAINING_TYPE.REINFORCEMENT,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.REINFORCEMENT],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.REINFORCEMENT],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.REINFORCEMENT],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.REINFORCEMENT],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.REINFORCEMENT],
    recommendedGPUMemory: 16,
    trainingTime: 'very-long',
    bestFor: ['game-ai', 'robotics', 'optimization'],
  },
  [AI_TRAINING_TYPE.TRANSFER_LEARNING]: {
    type: AI_TRAINING_TYPE.TRANSFER_LEARNING,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.TRANSFER_LEARNING],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.TRANSFER_LEARNING],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.TRANSFER_LEARNING],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.TRANSFER_LEARNING],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.TRANSFER_LEARNING],
    recommendedGPUMemory: 10,
    trainingTime: 'medium',
    bestFor: ['nlp', 'computer-vision', 'multimodal-learning'],
  },
  [AI_TRAINING_TYPE.FEW_SHOT]: {
    type: AI_TRAINING_TYPE.FEW_SHOT,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.FEW_SHOT],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.FEW_SHOT],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.FEW_SHOT],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.FEW_SHOT],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.FEW_SHOT],
    recommendedGPUMemory: 8,
    trainingTime: 'short',
    bestFor: ['few-shot-classification', 'meta-learning', 'rapid-adaptation'],
  },
  [AI_TRAINING_TYPE.ZERO_SHOT]: {
    type: AI_TRAINING_TYPE.ZERO_SHOT,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.ZERO_SHOT],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.ZERO_SHOT],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.ZERO_SHOT],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.ZERO_SHOT],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.ZERO_SHOT],
    recommendedGPUMemory: 12,
    trainingTime: 'short',
    bestFor: ['zero-shot-classification', 'open-domain-tasks', 'generalization'],
  },
  [AI_TRAINING_TYPE.FINE_TUNING]: {
    type: AI_TRAINING_TYPE.FINE_TUNING,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.FINE_TUNING],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.FINE_TUNING],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.FINE_TUNING],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.FINE_TUNING],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.FINE_TUNING],
    recommendedGPUMemory: 8,
    trainingTime: 'medium',
    bestFor: ['model-adaptation', 'domain-specific-tuning', 'performance-optimization'],
  },
  [AI_TRAINING_TYPE.DISTILLATION]: {
    type: AI_TRAINING_TYPE.DISTILLATION,
    label: AI_TRAINING_TYPE_LABELS[AI_TRAINING_TYPE.DISTILLATION],
    description: AI_TRAINING_TYPE_DESCRIPTIONS[AI_TRAINING_TYPE.DISTILLATION],
    icon: AI_TRAINING_TYPE_ICONS[AI_TRAINING_TYPE.DISTILLATION],
    complexity: AI_TRAINING_TYPE_COMPLEXITY[AI_TRAINING_TYPE.DISTILLATION],
    dataRequirement: AI_TRAINING_TYPE_DATA_REQUIREMENT[AI_TRAINING_TYPE.DISTILLATION],
    recommendedGPUMemory: 8,
    trainingTime: 'long',
    bestFor: ['model-compression', 'model-deployment', 'edge-ai'],
  },
} as const;

/**
 * ট্রেইনিং টাইপ ক্যাটাগরি
 */
export const AI_TRAINING_TYPE_CATEGORIES = {
  SUPERVISED_LEARNING: [
    AI_TRAINING_TYPE.SUPERVISED,
    AI_TRAINING_TYPE.FEW_SHOT,
    AI_TRAINING_TYPE.ZERO_SHOT,
  ] as const,
  UNSUPERVISED_LEARNING: [AI_TRAINING_TYPE.UNSUPERVISED] as const,
  REINFORCEMENT_LEARNING: [AI_TRAINING_TYPE.REINFORCEMENT] as const,
  KNOWLEDGE_TRANSFER: [
    AI_TRAINING_TYPE.TRANSFER_LEARNING,
    AI_TRAINING_TYPE.FINE_TUNING,
    AI_TRAINING_TYPE.DISTILLATION,
  ] as const,
} as const;

/**
 * ট্রেইনিং টাইপ ক্যাটাগরি লেবেল
 */
export const AI_TRAINING_TYPE_CATEGORY_LABELS = {
  SUPERVISED_LEARNING: 'Supervised Learning',
  UNSUPERVISED_LEARNING: 'Unsupervised Learning',
  REINFORCEMENT_LEARNING: 'Reinforcement Learning',
  KNOWLEDGE_TRANSFER: 'Knowledge Transfer',
} as const;
