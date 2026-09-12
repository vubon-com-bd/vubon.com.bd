import { getOptionalEnv } from './env/env.validation';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

const nodeEnv = getOptionalEnv('NODE_ENV', ENVIRONMENT.DEVELOPMENT);

export const loggingConfig = {
  level: getOptionalEnv('LOG_LEVEL', LOG_LEVEL.INFO),
  format: 'json' as const,
  prettyPrint: nodeEnv !== ENVIRONMENT.PRODUCTION,
  timestamp: true,
  colorize: true,
  maxSize: 50 * 1024 * 1024,
  maxFiles: 30,
  dirname: 'logs',
  exclude: ['health', 'metrics'],
} as const;
