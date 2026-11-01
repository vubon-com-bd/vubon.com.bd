/**
 * In-App Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const IN_APP_INFRA_CONFIG = Object.freeze({
  websocketEnabled: getOptionalEnvBool('IN_APP_WEBSOCKET_ENABLED', true),
  sseEnabled: getOptionalEnvBool('IN_APP_SSE_ENABLED', true),
  maxConnectionsPerUser: getOptionalEnvInt('IN_APP_MAX_CONNECTIONS_PER_USER', 5),
  heartbeatIntervalSeconds: getOptionalEnvInt('IN_APP_HEARTBEAT_INTERVAL', 30),
  connectionTimeoutSeconds: getOptionalEnvInt('IN_APP_CONNECTION_TIMEOUT', 120),
});
