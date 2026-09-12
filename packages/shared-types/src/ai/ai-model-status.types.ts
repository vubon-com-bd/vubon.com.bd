import { StatusObject } from '../common/status.types';
import { AI_MODEL_STATUS } from '@vubon/shared-constants/src/ai/ai-model-status.constants';

export interface AIModelStatus extends StatusObject {
  type: keyof typeof AI_MODEL_STATUS | string;
  category: 'ai_model';
  isDraft: boolean;
  isTraining: boolean;
  isEvaluating: boolean;
  isDeployed: boolean;
  isFailed: boolean;
  isDeprecated: boolean;
  isArchived: boolean;
  isPaused: boolean;
}

export type AIModelStatusKey = keyof typeof AI_MODEL_STATUS;
