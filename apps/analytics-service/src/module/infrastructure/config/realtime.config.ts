import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const REALTIME_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REALTIME_ENABLED', false),
  windowMinutes: getOptionalEnvInt('REALTIME_WINDOW_MINUTES', 5),
  refreshIntervalSeconds: getOptionalEnvInt('REALTIME_REFRESH_INTERVAL', 10),
  maxSubscribersPerChannel: getOptionalEnvInt('REALTIME_MAX_SUBSCRIBERS', 1000),
  enableWebSocket: getOptionalEnvBool('REALTIME_ENABLE_WS', true),
  enableSSE: getOptionalEnvBool('REALTIME_ENABLE_SSE', false),
} as const);
