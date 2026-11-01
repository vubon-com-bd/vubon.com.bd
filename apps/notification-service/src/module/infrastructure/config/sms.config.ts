/**
 * SMS Config — Bangladesh Edition
 * @module notification-service/infrastructure/config
 */
import {
  SMS_CONFIG,
  TWILIO_CONFIG,
  SSLWIRELESS_CONFIG,
} from '@vubon/shared-config/platform';

export const SMS_PROVIDERS_CONFIG = Object.freeze({
  base: SMS_CONFIG,
  twilio: TWILIO_CONFIG,
  sslwireless: SSLWIRELESS_CONFIG,
});
