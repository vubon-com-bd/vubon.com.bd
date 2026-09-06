/**
 * Log Level Constants
 * @module shared-constants/common/log-level.constants
 */

export const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
  FATAL: 'fatal',
  SILENT: 'silent',
} as const;

export type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

export const LOG_LEVEL_WEIGHTS: Record<LogLevel, number> = {
  [LOG_LEVEL.FATAL]: 0,
  [LOG_LEVEL.ERROR]: 1,
  [LOG_LEVEL.WARN]: 2,
  [LOG_LEVEL.INFO]: 3,
  [LOG_LEVEL.DEBUG]: 4,
  [LOG_LEVEL.TRACE]: 5,
  [LOG_LEVEL.SILENT]: 6,
};

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  [LOG_LEVEL.FATAL]: '#ff0000',
  [LOG_LEVEL.ERROR]: '#ff4444',
  [LOG_LEVEL.WARN]: '#ffaa00',
  [LOG_LEVEL.INFO]: '#00aaff',
  [LOG_LEVEL.DEBUG]: '#00aa00',
  [LOG_LEVEL.TRACE]: '#888888',
  [LOG_LEVEL.SILENT]: '#000000',
};

export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  [LOG_LEVEL.FATAL]: 'FATAL',
  [LOG_LEVEL.ERROR]: 'ERROR',
  [LOG_LEVEL.WARN]: 'WARN',
  [LOG_LEVEL.INFO]: 'INFO',
  [LOG_LEVEL.DEBUG]: 'DEBUG',
  [LOG_LEVEL.TRACE]: 'TRACE',
  [LOG_LEVEL.SILENT]: 'SILENT',
};

export const DEFAULT_LOG_LEVEL: LogLevel = LOG_LEVEL.INFO;

export const PRODUCTION_LOG_LEVEL: LogLevel = LOG_LEVEL.INFO;
export const DEVELOPMENT_LOG_LEVEL: LogLevel = LOG_LEVEL.DEBUG;
export const TEST_LOG_LEVEL: LogLevel = LOG_LEVEL.ERROR;
