import { AI_TRAINING } from '@vubon/shared-constants/src/ai/ai-training.constants';

export interface AITrainingInput {
  modelId: string;
  status: string;
  type: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
}

export const validateAITraining = (
  training: Partial<AITrainingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!training.modelId) errors.push('Model ID is required');
  if (training.status && !Object.keys(AI_TRAINING.STATUS).includes(training.status)) {
    errors.push('Invalid training status');
  }
  if (training.type && !Object.keys(AI_TRAINING.TYPES).includes(training.type)) {
    errors.push('Invalid training type');
  }
  if (training.epochs !== undefined && training.epochs < 1) {
    errors.push('Epochs must be at least 1');
  }
  if (training.batchSize !== undefined && training.batchSize < 1) {
    errors.push('Batch size must be at least 1');
  }
  if (training.learningRate !== undefined && training.learningRate <= 0) {
    errors.push('Learning rate must be positive');
  }
  return { isValid: errors.length === 0, errors };
};
