import { getEnv } from './env/env.validation';

export const loggingConfig = {
  level: getEnv('LOG_LEVEL', 'info'),
  format: 'json',
  prettyPrint: process.env.NODE_ENV !== 'production',
  timestamp: true,
  colorize: true,
  maxSize: 50 * 1024 * 1024, // 50 MB
  maxFiles: 30,
  dirname: 'logs',
  exclude: ['health', 'metrics'],
};
