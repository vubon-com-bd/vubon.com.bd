import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AI_MODEL_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  TRAINING: 'training',
  EVALUATING: 'evaluating',
  DEPLOYED: 'deployed',
  FAILED: 'failed',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
  PAUSED: 'paused',
} as const;
