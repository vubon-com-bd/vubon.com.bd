import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { TICKET_ESCALATION } from '@vubon/shared-constants/src/support/ticket-escalation.constants';

const ticketEscalationStatusKeys = Object.keys(TICKET_ESCALATION.STATUS) as [string, ...string[]];
const ticketEscalationLevelKeys = Object.keys(TICKET_ESCALATION.ESCALATION_LEVELS) as [
  string,
  ...string[],
];
const ticketEscalationTriggerKeys = Object.keys(TICKET_ESCALATION.ESCALATION_TRIGGERS) as [
  string,
  ...string[],
];

export const TicketEscalationSchema = BaseSchema.extend({
  escalationId: z.string().uuid(),
  ticketId: z.string().uuid(),
  status: z.enum(ticketEscalationStatusKeys),
  level: z.enum(ticketEscalationLevelKeys),
  trigger: z.enum(ticketEscalationTriggerKeys),
  reason: z.string(),
  escalatedBy: z.string().uuid(),
  escalatedTo: z.string().uuid(),
  escalatedAt: z.date(),
  approvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  resolvedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
