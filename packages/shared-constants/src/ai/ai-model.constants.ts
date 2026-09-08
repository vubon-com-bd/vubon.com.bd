import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { AI_MODEL_TYPE } from './ai-model-type.constants';
import { AI_MODEL_STATUS } from './ai-model-status.constants';
import { AI_MODEL_PROVIDER } from './ai-model-provider.constants';
import { AI_FEATURE } from './ai-feature.constants';

export const AI_MODEL = {
  STATUS: {
    ...STATUS,
    ...AI_MODEL_STATUS,
    DRAFT: 'draft',
    TRAINING: 'training',
    EVALUATING: 'evaluating',
    DEPLOYED: 'deployed',
    FAILED: 'failed',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'ai_model:view',
    CREATE: 'ai_model:create',
    UPDATE: 'ai_model:update',
    DELETE: 'ai_model:delete',
    TRAIN: 'ai_model:train',
    DEPLOY: 'ai_model:deploy',
  },
  AI_MODEL_TYPE: { ...AI_MODEL_TYPE },
  AI_MODEL_STATUS: { ...AI_MODEL_STATUS },
  AI_MODEL_PROVIDER: { ...AI_MODEL_PROVIDER },
  AI_FEATURE: { ...AI_FEATURE },
  MODEL_VERSIONS: {
    V1: 'v1.0.0',
    V2: 'v2.0.0',
    V3: 'v3.0.0',
    LATEST: 'latest',
  },
  MAX_MODEL_SIZE_MB: 1024,
  MIN_ACCURACY_THRESHOLD: 0.7,
  MODEL_EVALUATION_METRICS: ['accuracy', 'precision', 'recall', 'f1', 'auc'],
  DEPLOYMENT_TIMEOUT_MINUTES: 30,
} as const;
