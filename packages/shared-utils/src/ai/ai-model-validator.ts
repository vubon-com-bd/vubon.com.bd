import { AI_MODEL_STATUS } from '@vubon/shared-constants/src/ai/ai-model-status.constants';
import { AI_MODEL_TYPE } from '@vubon/shared-constants/src/ai/ai-model-type.constants';
import { AI_MODEL_PROVIDER } from '@vubon/shared-constants/src/ai/ai-model-provider.constants';

export interface AIModelInput {
  name: string;
  version: string;
  status: string;
  type: string;
  provider: string;
  modelSize: number;
  accuracy: number;
  isActive: boolean;
  isDeployed: boolean;
}

export const validateAIModel = (
  model: Partial<AIModelInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!model.name) errors.push('Model name is required');
  if (!model.version) errors.push('Model version is required');
  if (model.status && !Object.keys(AI_MODEL_STATUS).includes(model.status)) {
    errors.push('Invalid model status');
  }
  if (model.type && !Object.keys(AI_MODEL_TYPE.TYPES).includes(model.type)) {
    errors.push('Invalid model type');
  }
  if (model.provider && !Object.keys(AI_MODEL_PROVIDER.TYPES).includes(model.provider)) {
    errors.push('Invalid model provider');
  }
  if (model.modelSize !== undefined && model.modelSize < 0) {
    errors.push('Model size cannot be negative');
  }
  if (model.accuracy !== undefined && (model.accuracy < 0 || model.accuracy > 1)) {
    errors.push('Accuracy must be between 0 and 1');
  }
  return { isValid: errors.length === 0, errors };
};

export const isModelDeployable = (model: AIModelInput): boolean => {
  return model.isActive && model.status === 'deployed' && model.accuracy >= 0.7;
};

export const isModelTrainable = (model: AIModelInput): boolean => {
  return model.status === 'draft' || model.status === 'failed' || model.status === 'deprecated';
};
