/**
 * AI Model Type Constants
 * Types of AI models and their classifications
 */

import { AI_MODEL } from './ai-model.constants';

export const AI_MODEL_TYPE = {
  // Model Architecture Types
  ARCHITECTURES: {
    TRANSFORMER: 'transformer',
    DIFFUSION: 'diffusion',
    CONVOLUTIONAL: 'convolutional',
    RECURRENT: 'recurrent',
    ATTENTION: 'attention',
    HYBRID: 'hybrid',
  } as const,

  // Task Types
  TASKS: {
    // Language Tasks
    TEXT_CLASSIFICATION: 'text_classification',
    TOKEN_CLASSIFICATION: 'token_classification',
    TEXT_GENERATION: 'text_generation',
    SUMMARIZATION: 'summarization',
    TRANSLATION: 'translation',
    QUESTION_ANSWERING: 'question_answering',
    TEXT_EMBEDDING: 'text_embedding',
    CODE_GENERATION: 'code_generation',

    // Vision Tasks
    IMAGE_CLASSIFICATION: 'image_classification',
    OBJECT_DETECTION: 'object_detection',
    IMAGE_SEGMENTATION: 'image_segmentation',
    IMAGE_GENERATION: 'image_generation',
    IMAGE_EMBEDDING: 'image_embedding',
    OPTICAL_CHARACTER_RECOGNITION: 'optical_character_recognition',

    // Audio Tasks
    SPEECH_RECOGNITION: 'speech_recognition',
    SPEECH_SYNTHESIS: 'speech_synthesis',
    AUDIO_CLASSIFICATION: 'audio_classification',

    // Multimodal Tasks
    MULTIMODAL: 'multimodal',
    VISION_LANGUAGE: 'vision_language',
    AUDIO_LANGUAGE: 'audio_language',
  } as const,

  // Model Families
  FAMILIES: {
    GPT: 'gpt',
    CLAUDE: 'claude',
    LLAMA: 'llama',
    MISTRAL: 'mistral',
    GEMINI: 'gemini',
    BERT: 'bert',
    T5: 't5',
    BLOOM: 'bloom',
    DEEPSEEK: 'deepseek',
    GROQ: 'groq',
  } as const,

  // Specialization Types
  SPECIALIZATIONS: {
    GENERAL: 'general',
    CODE: 'code',
    MATH: 'math',
    SCIENCE: 'science',
    MEDICAL: 'medical',
    LEGAL: 'legal',
    FINANCE: 'finance',
    ECOMMERCE: 'ecommerce',
    CUSTOMER_SERVICE: 'customer_service',
    SALES: 'sales',
    MARKETING: 'marketing',
    EDUCATION: 'education',
  } as const,

  // Fine-tuning Types
  FINE_TUNING_TYPES: {
    FULL: 'full',
    PEFT: 'peft',
    LORA: 'lora',
    QLORA: 'qlora',
    ADAPTER: 'adapter',
    PROMPT_TUNING: 'prompt_tuning',
  } as const,

  // Model Formats
  FORMATS: {
    PYTORCH: 'pytorch',
    TENSORFLOW: 'tensorflow',
    ONNX: 'onnx',
    TFLITE: 'tflite',
    COREML: 'coreml',
    SAFETENSORS: 'safetensors',
    GGUF: 'gguf',
    GGML: 'ggml',
  } as const,

  // Training Paradigms
  TRAINING_PARADIGMS: {
    SUPERVISED: 'supervised',
    UNSUPERVISED: 'unsupervised',
    SEMI_SUPERVISED: 'semi_supervised',
    SELF_SUPERVISED: 'self_supervised',
    REINFORCEMENT: 'reinforcement',
    TRANSFER: 'transfer',
    FEW_SHOT: 'few_shot',
    ZERO_SHOT: 'zero_shot',
  } as const,

  // Model State
  STATES: {
    UNINITIALIZED: 'uninitialized',
    INITIALIZED: 'initialized',
    LOADING: 'loading',
    LOADED: 'loaded',
    TRAINING: 'training',
    TRAINED: 'trained',
    VALIDATING: 'validating',
    VALIDATED: 'validated',
    DEPLOYING: 'deploying',
    DEPLOYED: 'deployed',
    UPDATING: 'updating',
    UPDATED: 'updated',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,

  // Model Lifecycle Stages
  LIFECYCLE_STAGES: {
    DEVELOPMENT: 'development',
    TESTING: 'testing',
    STAGING: 'staging',
    PRODUCTION: 'production',
    DEPRECATED: 'deprecated',
    RETIRED: 'retired',
  } as const,

  // Model Quantization Types
  QUANTIZATION_TYPES: {
    FP32: 'fp32',
    FP16: 'fp16',
    BF16: 'bf16',
    INT8: 'int8',
    INT4: 'int4',
    Q8_0: 'q8_0',
    Q4_0: 'q4_0',
    Q4_1: 'q4_1',
    Q5_0: 'q5_0',
    Q5_1: 'q5_1',
  } as const,

  // Model Memory Requirements
  MEMORY_REQUIREMENTS: {
    TINY: 1024,
    SMALL: 4096,
    MEDIUM: 8192,
    LARGE: 16384,
    XLARGE: 32768,
    XXLARGE: 65536,
  } as const,
} as const;

export type AIModelArchitecture =
  (typeof AI_MODEL_TYPE.ARCHITECTURES)[keyof typeof AI_MODEL_TYPE.ARCHITECTURES];
export type AIModelTask = (typeof AI_MODEL_TYPE.TASKS)[keyof typeof AI_MODEL_TYPE.TASKS];
export type AIModelFamily = (typeof AI_MODEL_TYPE.FAMILIES)[keyof typeof AI_MODEL_TYPE.FAMILIES];
export type AIModelSpecialization =
  (typeof AI_MODEL_TYPE.SPECIALIZATIONS)[keyof typeof AI_MODEL_TYPE.SPECIALIZATIONS];
export type AIFineTuningType =
  (typeof AI_MODEL_TYPE.FINE_TUNING_TYPES)[keyof typeof AI_MODEL_TYPE.FINE_TUNING_TYPES];
export type AIModelFormat = (typeof AI_MODEL_TYPE.FORMATS)[keyof typeof AI_MODEL_TYPE.FORMATS];
export type AITrainingParadigm =
  (typeof AI_MODEL_TYPE.TRAINING_PARADIGMS)[keyof typeof AI_MODEL_TYPE.TRAINING_PARADIGMS];
export type AIModelState = (typeof AI_MODEL_TYPE.STATES)[keyof typeof AI_MODEL_TYPE.STATES];
export type AIModelLifecycleStage =
  (typeof AI_MODEL_TYPE.LIFECYCLE_STAGES)[keyof typeof AI_MODEL_TYPE.LIFECYCLE_STAGES];
export type AIQuantizationType =
  (typeof AI_MODEL_TYPE.QUANTIZATION_TYPES)[keyof typeof AI_MODEL_TYPE.QUANTIZATION_TYPES];
export type AIMemoryRequirement =
  (typeof AI_MODEL_TYPE.MEMORY_REQUIREMENTS)[keyof typeof AI_MODEL_TYPE.MEMORY_REQUIREMENTS];
export type AIModelSize = (typeof AI_MODEL.SIZES)[keyof typeof AI_MODEL.SIZES];

export function getAiModelMemoryRequirement(size: AIModelSize): number {
  const requirements: Record<AIModelSize, number> = {
    [AI_MODEL.SIZES.TINY]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.TINY,
    [AI_MODEL.SIZES.SMALL]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.SMALL,
    [AI_MODEL.SIZES.MEDIUM]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.MEDIUM,
    [AI_MODEL.SIZES.LARGE]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.LARGE,
    [AI_MODEL.SIZES.XLARGE]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.XLARGE,
    [AI_MODEL.SIZES.XXLARGE]: AI_MODEL_TYPE.MEMORY_REQUIREMENTS.XXLARGE,
  };
  return requirements[size] || AI_MODEL_TYPE.MEMORY_REQUIREMENTS.MEDIUM;
}

export function isAiModelLanguageModel(task: AIModelTask): boolean {
  const languageTasks: AIModelTask[] = [
    AI_MODEL_TYPE.TASKS.TEXT_CLASSIFICATION,
    AI_MODEL_TYPE.TASKS.TOKEN_CLASSIFICATION,
    AI_MODEL_TYPE.TASKS.TEXT_GENERATION,
    AI_MODEL_TYPE.TASKS.SUMMARIZATION,
    AI_MODEL_TYPE.TASKS.TRANSLATION,
    AI_MODEL_TYPE.TASKS.QUESTION_ANSWERING,
    AI_MODEL_TYPE.TASKS.TEXT_EMBEDDING,
    AI_MODEL_TYPE.TASKS.CODE_GENERATION,
  ];
  return languageTasks.includes(task);
}

export function isAiModelVisionModel(task: AIModelTask): boolean {
  const visionTasks: AIModelTask[] = [
    AI_MODEL_TYPE.TASKS.IMAGE_CLASSIFICATION,
    AI_MODEL_TYPE.TASKS.OBJECT_DETECTION,
    AI_MODEL_TYPE.TASKS.IMAGE_SEGMENTATION,
    AI_MODEL_TYPE.TASKS.IMAGE_GENERATION,
    AI_MODEL_TYPE.TASKS.IMAGE_EMBEDDING,
    AI_MODEL_TYPE.TASKS.OPTICAL_CHARACTER_RECOGNITION,
  ];
  return visionTasks.includes(task);
}

export function isAiModelAudioModel(task: AIModelTask): boolean {
  const audioTasks: AIModelTask[] = [
    AI_MODEL_TYPE.TASKS.SPEECH_RECOGNITION,
    AI_MODEL_TYPE.TASKS.SPEECH_SYNTHESIS,
    AI_MODEL_TYPE.TASKS.AUDIO_CLASSIFICATION,
  ];
  return audioTasks.includes(task);
}

export function getAiModelFamilyFromArchitecture(
  architecture: AIModelArchitecture
): AIModelFamily | null {
  const familyMap: Partial<Record<AIModelArchitecture, AIModelFamily>> = {
    [AI_MODEL_TYPE.ARCHITECTURES.TRANSFORMER]: AI_MODEL_TYPE.FAMILIES.GPT,
    [AI_MODEL_TYPE.ARCHITECTURES.DIFFUSION]: AI_MODEL_TYPE.FAMILIES.GPT,
    [AI_MODEL_TYPE.ARCHITECTURES.CONVOLUTIONAL]: AI_MODEL_TYPE.FAMILIES.BERT,
    [AI_MODEL_TYPE.ARCHITECTURES.RECURRENT]: AI_MODEL_TYPE.FAMILIES.BERT,
    [AI_MODEL_TYPE.ARCHITECTURES.ATTENTION]: AI_MODEL_TYPE.FAMILIES.GPT,
    [AI_MODEL_TYPE.ARCHITECTURES.HYBRID]: AI_MODEL_TYPE.FAMILIES.GPT,
  };
  return familyMap[architecture] || null;
}

export function isAiModelReady(state: AIModelState): boolean {
  const readyStates: AIModelState[] = [
    AI_MODEL_TYPE.STATES.LOADED,
    AI_MODEL_TYPE.STATES.TRAINED,
    AI_MODEL_TYPE.STATES.VALIDATED,
    AI_MODEL_TYPE.STATES.DEPLOYED,
    AI_MODEL_TYPE.STATES.UPDATED,
  ];
  return readyStates.includes(state);
}

export function isAiModelTraining(state: AIModelState): boolean {
  const trainingStates: AIModelState[] = [
    AI_MODEL_TYPE.STATES.TRAINING,
    AI_MODEL_TYPE.STATES.VALIDATING,
    AI_MODEL_TYPE.STATES.DEPLOYING,
    AI_MODEL_TYPE.STATES.UPDATING,
  ];
  return trainingStates.includes(state);
}

export function getAiModelQuantizationPrecision(quantizationType: AIQuantizationType): number {
  const precisionMap: Record<AIQuantizationType, number> = {
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.FP32]: 32,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.FP16]: 16,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.BF16]: 16,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.INT8]: 8,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.INT4]: 4,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.Q8_0]: 8,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.Q4_0]: 4,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.Q4_1]: 4,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.Q5_0]: 5,
    [AI_MODEL_TYPE.QUANTIZATION_TYPES.Q5_1]: 5,
  };
  return precisionMap[quantizationType] || 32;
}
