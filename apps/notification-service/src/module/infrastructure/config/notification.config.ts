/**
 * Notification Service Config
 * @module notification-service/infrastructure/config
 */
import { NOTIFICATION_CONFIG } from '@vubon/shared-config/platform';

export const NOTIFICATION_SERVICE_CONFIG = Object.freeze({
  ...NOTIFICATION_CONFIG,
  serviceName: 'notification-service',
  serviceVersion: '1.0.0',
});
