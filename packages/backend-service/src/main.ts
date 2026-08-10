/**
 * @fileoverview Backend Service Entry Point
 * @description এই ফাইল সার্ভিসের এন্ট্রি পয়েন্ট
 * @package @vubon/backend-service
 */

// TODO: Import actual config and utils when available
// import { env } from '@vubon/shared-config';
// import { logger } from '@vubon/shared-utils';

// Temporary placeholder to fix build
const env = process.env.NODE_ENV || 'development';
const logger = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args),
  debug: (...args: any[]) => console.debug('[DEBUG]', ...args),
};

// Simple server placeholder
console.log(`🚀 Backend service starting in ${env} mode`);
logger.info('Server is ready');

// Export for testing
export { env, logger };
