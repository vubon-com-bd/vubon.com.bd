/**
 * Logging configuration
 * @module shared-config/common/observability
 *
 * Values আসে shared-constants/common/log-level.constants থেকে।
 */
import { LOG_LEVEL } from '@vubon/shared-constants/common';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../env/env.helper';
import { loadEnv } from '../env/env.loader';

export const LOGGING_CONFIG = Object.freeze({
  level: loadEnv().LOG_LEVEL,
  levels: Object.freeze([
    LOG_LEVEL.ERROR,
    LOG_LEVEL.WARN,
    LOG_LEVEL.INFO,
    LOG_LEVEL.HTTP,
    LOG_LEVEL.DEBUG,
  ] as const),
  prettyPrint: getOptionalEnvBool('LOG_PRETTY', loadEnv().NODE_ENV !== 'production'),
  colorize: getOptionalEnvBool('LOG_COLORIZE', loadEnv().NODE_ENV !== 'production'),
  includeTimestamp: getOptionalEnvBool('LOG_TIMESTAMP', true),
  includeContext: getOptionalEnvBool('LOG_CONTEXT', true),
  maxDepth: getOptionalEnvInt('LOG_MAX_DEPTH', 4),
  redactFields: Object.freeze([
    'password',
    'passwordHash',
    'token',
    'accessToken',
    'refreshToken',
    'apiKey',
    'secret',
    'authorization',
    'cookie',
  ] as const),
  destinations: Object.freeze({
    console: getOptionalEnvBool('LOG_CONSOLE', true),
    file: getOptionalEnvBool('LOG_FILE', false),
    filePath: getOptionalEnv('LOG_FILE_PATH', './logs/app.log'),
  }),
} as const);

export type LoggingConfig = typeof LOGGING_CONFIG;
