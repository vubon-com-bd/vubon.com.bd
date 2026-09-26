import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AI_MODEL_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  PENDING: COMMON_STATUS.PENDING,
  TRAINING: 'training',
  TRAINED: 'trained',
  DEPLOYED: 'deployed',
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  FAILED: 'failed',
  DEPRECATED: 'deprecated',
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type AiModelStatusType = (typeof AI_MODEL_STATUS)[keyof typeof AI_MODEL_STATUS];
