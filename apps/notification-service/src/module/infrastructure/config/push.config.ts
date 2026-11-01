/**
 * Push Config
 * @module notification-service/infrastructure/config
 */
import {
  PUSH_CONFIG,
  FCM_CONFIG,
  WEB_PUSH_CONFIG,
} from '@vubon/shared-config/platform';

export const PUSH_PROVIDERS_CONFIG = Object.freeze({
  base: PUSH_CONFIG,
  fcm: FCM_CONFIG,
  webPush: WEB_PUSH_CONFIG,
});
