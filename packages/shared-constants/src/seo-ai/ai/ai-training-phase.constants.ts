/**
 * AI ট্রেইনিং ফেজ এনাম
 */
export const AI_TRAINING_PHASE = {
  DATA_PREPARATION: 'data-preparation',
  FEATURE_EXTRACTION: 'feature-extraction',
  MODEL_INITIALIZATION: 'model-initialization',
  TRAINING_LOOP: 'training-loop',
  VALIDATION: 'validation',
  EVALUATION: 'evaluation',
  DEPLOYMENT: 'deployment',
} as const;

/**
 * AI_TRAINING_PHASE থেকে টাইপ
 */
export type AITrainingPhase = (typeof AI_TRAINING_PHASE)[keyof typeof AI_TRAINING_PHASE];

/**
 * ট্রেইনিং ফেজ লেবেল
 */
export const AI_TRAINING_PHASE_LABELS: Record<AITrainingPhase, string> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: 'Data Preparation',
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: 'Feature Extraction',
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: 'Model Initialization',
  [AI_TRAINING_PHASE.TRAINING_LOOP]: 'Training Loop',
  [AI_TRAINING_PHASE.VALIDATION]: 'Validation',
  [AI_TRAINING_PHASE.EVALUATION]: 'Evaluation',
  [AI_TRAINING_PHASE.DEPLOYMENT]: 'Deployment',
} as const;

/**
 * ট্রেইনিং ফেজ বিবরণ
 */
export const AI_TRAINING_PHASE_DESCRIPTIONS: Record<AITrainingPhase, string> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: 'Preparing and preprocessing training data',
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: 'Extracting features from prepared data',
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: 'Initializing model architecture and parameters',
  [AI_TRAINING_PHASE.TRAINING_LOOP]: 'Running the main training loop with forward/backward passes',
  [AI_TRAINING_PHASE.VALIDATION]: 'Validating model performance on validation dataset',
  [AI_TRAINING_PHASE.EVALUATION]: 'Evaluating model on test dataset with metrics',
  [AI_TRAINING_PHASE.DEPLOYMENT]: 'Deploying trained model to production environment',
} as const;

/**
 * ট্রেইনিং ফেজ আইকন
 */
export const AI_TRAINING_PHASE_ICONS: Record<AITrainingPhase, string> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: '📊',
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: '🔍',
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: '⚙️',
  [AI_TRAINING_PHASE.TRAINING_LOOP]: '🔄',
  [AI_TRAINING_PHASE.VALIDATION]: '✅',
  [AI_TRAINING_PHASE.EVALUATION]: '📈',
  [AI_TRAINING_PHASE.DEPLOYMENT]: '🚀',
} as const;

/**
 * ট্রেইনিং ফেজ কালার (হেক্স কোড)
 */
export const AI_TRAINING_PHASE_COLORS: Record<AITrainingPhase, string> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: '#3b82f6', // Blue-500
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: '#8b5cf6', // Violet-500
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: '#06b6d4', // Cyan-500
  [AI_TRAINING_PHASE.TRAINING_LOOP]: '#f59e0b', // Amber-500
  [AI_TRAINING_PHASE.VALIDATION]: '#22c55e', // Green-500
  [AI_TRAINING_PHASE.EVALUATION]: '#ec4899', // Pink-500
  [AI_TRAINING_PHASE.DEPLOYMENT]: '#f472b6', // Pink-400
} as const;

/**
 * ট্রেইনিং ফেজ অর্ডার (যে ক্রমে ফেজগুলো সম্পন্ন হয়)
 */
export const AI_TRAINING_PHASE_ORDER: Record<AITrainingPhase, number> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: 0,
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: 1,
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: 2,
  [AI_TRAINING_PHASE.TRAINING_LOOP]: 3,
  [AI_TRAINING_PHASE.VALIDATION]: 4,
  [AI_TRAINING_PHASE.EVALUATION]: 5,
  [AI_TRAINING_PHASE.DEPLOYMENT]: 6,
} as const;

/**
 * ট্রেইনিং ফেজ ট্রানজিশন রুলস
 */
export const AI_TRAINING_PHASE_TRANSITIONS: Record<AITrainingPhase, AITrainingPhase[]> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: [AI_TRAINING_PHASE.FEATURE_EXTRACTION],
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: [AI_TRAINING_PHASE.MODEL_INITIALIZATION],
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: [AI_TRAINING_PHASE.TRAINING_LOOP],
  [AI_TRAINING_PHASE.TRAINING_LOOP]: [
    AI_TRAINING_PHASE.VALIDATION,
    AI_TRAINING_PHASE.TRAINING_LOOP, // Can loop back for more epochs
  ],
  [AI_TRAINING_PHASE.VALIDATION]: [
    AI_TRAINING_PHASE.TRAINING_LOOP, // Can go back to training if needed
    AI_TRAINING_PHASE.EVALUATION,
  ],
  [AI_TRAINING_PHASE.EVALUATION]: [
    AI_TRAINING_PHASE.DEPLOYMENT,
    AI_TRAINING_PHASE.TRAINING_LOOP, // Can retrain if evaluation fails
  ],
  [AI_TRAINING_PHASE.DEPLOYMENT]: [],
} as const;

/**
 * ট্রেইনিং ফেজ কনফিগারেশন
 */
export interface AITrainingPhaseConfig {
  phase: AITrainingPhase;
  label: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  requiresGPU: boolean;
  requiresData: boolean;
  requiresModel: boolean;
  isInteractive: boolean;
  typicalDuration: string;
}

/**
 * ট্রেইনিং ফেজ মেটাডেটা
 */
export const AI_TRAINING_PHASE_METADATA: Record<AITrainingPhase, AITrainingPhaseConfig> = {
  [AI_TRAINING_PHASE.DATA_PREPARATION]: {
    phase: AI_TRAINING_PHASE.DATA_PREPARATION,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.DATA_PREPARATION],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.DATA_PREPARATION],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.DATA_PREPARATION],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.DATA_PREPARATION],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.DATA_PREPARATION],
    requiresGPU: false,
    requiresData: true,
    requiresModel: false,
    isInteractive: false,
    typicalDuration: 'minutes',
  },
  [AI_TRAINING_PHASE.FEATURE_EXTRACTION]: {
    phase: AI_TRAINING_PHASE.FEATURE_EXTRACTION,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.FEATURE_EXTRACTION],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.FEATURE_EXTRACTION],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.FEATURE_EXTRACTION],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.FEATURE_EXTRACTION],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.FEATURE_EXTRACTION],
    requiresGPU: false,
    requiresData: true,
    requiresModel: false,
    isInteractive: false,
    typicalDuration: 'minutes',
  },
  [AI_TRAINING_PHASE.MODEL_INITIALIZATION]: {
    phase: AI_TRAINING_PHASE.MODEL_INITIALIZATION,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.MODEL_INITIALIZATION],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.MODEL_INITIALIZATION],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.MODEL_INITIALIZATION],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.MODEL_INITIALIZATION],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.MODEL_INITIALIZATION],
    requiresGPU: false,
    requiresData: false,
    requiresModel: true,
    isInteractive: true,
    typicalDuration: 'seconds',
  },
  [AI_TRAINING_PHASE.TRAINING_LOOP]: {
    phase: AI_TRAINING_PHASE.TRAINING_LOOP,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.TRAINING_LOOP],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.TRAINING_LOOP],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.TRAINING_LOOP],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.TRAINING_LOOP],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.TRAINING_LOOP],
    requiresGPU: true,
    requiresData: true,
    requiresModel: true,
    isInteractive: false,
    typicalDuration: 'hours',
  },
  [AI_TRAINING_PHASE.VALIDATION]: {
    phase: AI_TRAINING_PHASE.VALIDATION,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.VALIDATION],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.VALIDATION],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.VALIDATION],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.VALIDATION],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.VALIDATION],
    requiresGPU: true,
    requiresData: true,
    requiresModel: true,
    isInteractive: false,
    typicalDuration: 'minutes',
  },
  [AI_TRAINING_PHASE.EVALUATION]: {
    phase: AI_TRAINING_PHASE.EVALUATION,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.EVALUATION],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.EVALUATION],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.EVALUATION],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.EVALUATION],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.EVALUATION],
    requiresGPU: true,
    requiresData: true,
    requiresModel: true,
    isInteractive: false,
    typicalDuration: 'minutes',
  },
  [AI_TRAINING_PHASE.DEPLOYMENT]: {
    phase: AI_TRAINING_PHASE.DEPLOYMENT,
    label: AI_TRAINING_PHASE_LABELS[AI_TRAINING_PHASE.DEPLOYMENT],
    description: AI_TRAINING_PHASE_DESCRIPTIONS[AI_TRAINING_PHASE.DEPLOYMENT],
    icon: AI_TRAINING_PHASE_ICONS[AI_TRAINING_PHASE.DEPLOYMENT],
    color: AI_TRAINING_PHASE_COLORS[AI_TRAINING_PHASE.DEPLOYMENT],
    order: AI_TRAINING_PHASE_ORDER[AI_TRAINING_PHASE.DEPLOYMENT],
    requiresGPU: false,
    requiresData: false,
    requiresModel: true,
    isInteractive: true,
    typicalDuration: 'minutes',
  },
} as const;

/**
 * ট্রেইনিং ফেজ ক্যাটাগরি
 */
export const AI_TRAINING_PHASE_CATEGORIES = {
  DATA_PREPARATION: [
    AI_TRAINING_PHASE.DATA_PREPARATION,
    AI_TRAINING_PHASE.FEATURE_EXTRACTION,
  ] as const,
  MODEL_SETUP: [AI_TRAINING_PHASE.MODEL_INITIALIZATION] as const,
  TRAINING: [AI_TRAINING_PHASE.TRAINING_LOOP, AI_TRAINING_PHASE.VALIDATION] as const,
  EVALUATION: [AI_TRAINING_PHASE.EVALUATION] as const,
  DEPLOYMENT: [AI_TRAINING_PHASE.DEPLOYMENT] as const,
} as const;

/**
 * ট্রেইনিং ফেজ ক্যাটাগরি লেবেল
 */
export const AI_TRAINING_PHASE_CATEGORY_LABELS = {
  DATA_PREPARATION: 'Data Preparation',
  MODEL_SETUP: 'Model Setup',
  TRAINING: 'Training',
  EVALUATION: 'Evaluation',
  DEPLOYMENT: 'Deployment',
} as const;
