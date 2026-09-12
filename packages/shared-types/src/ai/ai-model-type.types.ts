import { TypeObject } from '../common/types.types';
import { AI_MODEL_TYPE } from '@vubon/shared-constants/src/ai/ai-model-type.constants';

export interface AIModelType extends TypeObject {
  type: keyof typeof AI_MODEL_TYPE.TYPES | string;
  category: 'ai_model_type';
  isCollaborativeFiltering: boolean;
  isContentBased: boolean;
  isHybrid: boolean;
  isDeepLearning: boolean;
  isNeuralNetwork: boolean;
  isTransformer: boolean;
  isBert: boolean;
  isGpt: boolean;
  isClip: boolean;
  isResnet: boolean;
  isCnn: boolean;
  isRnn: boolean;
  isLstm: boolean;
  isGru: boolean;
  isXgboost: boolean;
  isRandomForest: boolean;
  isSvm: boolean;
  isKmeans: boolean;
  isDbscan: boolean;
  isPca: boolean;
  isTsne: boolean;
}

export type AIModelTypeKey = keyof typeof AI_MODEL_TYPE.TYPES;
