/**
 * E2E environment setup — minimal env vars
 */
process.env['NODE_ENV'] = 'test';
process.env['NOTIFICATION_ENABLED'] = 'true';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

export {};
