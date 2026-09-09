import { TypeObject } from '../common/types.types';
import { AI_MODEL_PROVIDER } from '@vubon/shared-constants/src/ai/ai-model-provider.constants';

export interface AIModelProvider extends TypeObject {
  type: keyof typeof AI_MODEL_PROVIDER.TYPES | string;
  category: 'ai_model_provider';
  apiEndpoint: string;
  apiVersion: string;
  isOpenAI: boolean;
  isGoogle: boolean;
  isAws: boolean;
  isAzure: boolean;
  isMeta: boolean;
  isAnthropic: boolean;
  isCohere: boolean;
  isHuggingFace: boolean;
  isReka: boolean;
  isMistral: boolean;
  isGemini: boolean;
  isClaude: boolean;
  isLlama: boolean;
  isBert: boolean;
  isT5: boolean;
}

export type AIModelProviderKey = keyof typeof AI_MODEL_PROVIDER.TYPES;
