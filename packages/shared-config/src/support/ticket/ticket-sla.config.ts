/**
 * Ticket SLA configuration
 * @module shared-config/support/ticket
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { TIMEZONE } from '@vubon/shared-constants/common';

export const TICKET_SLA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TICKET_SLA_ENABLED', true),
  businessHoursOnly: getOptionalEnvBool('TICKET_SLA_BUSINESS_HOURS', true),
  businessHoursStart: getOptionalEnvInt('TICKET_SLA_START_HOUR', 9),
  businessHoursEnd: getOptionalEnvInt('TICKET_SLA_END_HOUR', 18),
  timezone: TIMEZONE.ASIA_DHAKA,
  warningThresholdPercent: getOptionalEnvInt('TICKET_SLA_WARNING_PCT', 80),
  breachAlertEnabled: getOptionalEnvBool('TICKET_SLA_BREACH_ALERT', true),
  pauseOnWaitingCustomer: getOptionalEnvBool('TICKET_SLA_PAUSE_ON_WAIT', true),
  targetsMinutes: Object.freeze({
    critical: Object.freeze({ firstResponse: 15, resolution: 240 }),
    urgent: Object.freeze({ firstResponse: 30, resolution: 480 }),
    high: Object.freeze({ firstResponse: 60, resolution: 1440 }),
    normal: Object.freeze({ firstResponse: 240, resolution: 2880 }),
    low: Object.freeze({ firstResponse: 480, resolution: 7200 }),
  }),
});
