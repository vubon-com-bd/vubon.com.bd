/**
 * Dependency Injection Tokens
 * @module shared-kernel/modules
 *
 * Central registry of all DI tokens used across the kernel।
 */
export const TOKENS = Object.freeze({
  // ── Config ──
  APP_CONFIG: Symbol.for('kernel.app_config'),
  APP_MODE: Symbol.for('kernel.app_mode'),
  DATABASE_CONFIG: Symbol.for('kernel.database_config'),
  REDIS_CONFIG: Symbol.for('kernel.redis_config'),
  QUEUE_CONFIG: Symbol.for('kernel.queue_config'),

  // ── Repositories ──
  USER_REPOSITORY: Symbol.for('kernel.user_repository'),
  ORDER_REPOSITORY: Symbol.for('kernel.order_repository'),
  VENDOR_REPOSITORY: Symbol.for('kernel.vendor_repository'),
  PRODUCT_REPOSITORY: Symbol.for('kernel.product_repository'),

  // ── Services ──
  EMAIL_SERVICE: Symbol.for('kernel.email_service'),
  SMS_SERVICE: Symbol.for('kernel.sms_service'),
  PUSH_SERVICE: Symbol.for('kernel.push_service'),

  CRYPTO_SERVICE: Symbol.for('kernel.crypto_service'),
  HASH_SERVICE: Symbol.for('kernel.hash_service'),
  JWT_SERVICE: Symbol.for('kernel.jwt_service'),

  LOGGER_SERVICE: Symbol.for('kernel.logger_service'),
  METRICS_SERVICE: Symbol.for('kernel.metrics_service'),
  TRACER_SERVICE: Symbol.for('kernel.tracer_service'),
  HEALTH_SERVICE: Symbol.for('kernel.health_service'),

  // ── Buses ──
  COMMAND_BUS_NAME: 'vubon-command-bus',
  QUERY_BUS_NAME: 'vubon-query-bus',
  EVENT_BUS_NAME: 'vubon-event-bus',

  // ── Unit of Work ──
  UNIT_OF_WORK: Symbol.for('kernel.unit_of_work'),
} as const);

export type KernelToken = (typeof TOKENS)[keyof typeof TOKENS];
