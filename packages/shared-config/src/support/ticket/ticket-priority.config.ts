/**
 * Ticket priority configuration
 * @module shared-config/support/ticket
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const TICKET_PRIORITY_CONFIG = Object.freeze({
  autoEscalate: getOptionalEnvBool('TICKET_AUTO_ESCALATE', true),
  escalateAfterMinutes: Object.freeze({
    critical: 15,
    urgent: 30,
    high: 60,
    normal: 240,
    low: 480,
  }),
  defaultPriority: 'normal',
  maxEscalationLevel: getOptionalEnvInt('TICKET_MAX_ESCALATION_LEVEL', 3),
});
