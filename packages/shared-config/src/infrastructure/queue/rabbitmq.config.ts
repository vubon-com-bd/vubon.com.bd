/**
 * RabbitMQ configuration
 * @module shared-config/infrastructure/queue
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const RABBITMQ_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RABBITMQ_ENABLED', false),
  url: getOptionalEnv('RABBITMQ_URL', 'amqp://localhost:5672'),
  vhost: getOptionalEnv('RABBITMQ_VHOST', '/'),
  heartbeatSeconds: getOptionalEnvInt('RABBITMQ_HEARTBEAT_SECONDS', 60),
  connectionTimeoutMs: getOptionalEnvInt('RABBITMQ_CONNECTION_TIMEOUT_MS', 10000),
  prefetchCount: getOptionalEnvInt('RABBITMQ_PREFETCH_COUNT', 10),
  reconnectDelayMs: getOptionalEnvInt('RABBITMQ_RECONNECT_DELAY_MS', 5000),
  maxReconnectAttempts: getOptionalEnvInt('RABBITMQ_MAX_RECONNECT_ATTEMPTS', 10),
  durableQueues: getOptionalEnvBool('RABBITMQ_DURABLE_QUEUES', true),
  persistentMessages: getOptionalEnvBool('RABBITMQ_PERSISTENT_MESSAGES', true),
} as const);

export type RabbitmqConfig = typeof RABBITMQ_CONFIG;
