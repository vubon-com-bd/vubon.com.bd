import { TICKET_ESCALATION } from '@vubon/shared-constants/src/support/ticket-escalation.constants';

export interface EscalationInput {
  ticketId: string;
  reason: string;
  level: string;
  trigger: string;
  status: string;
}

export const validateEscalation = (
  escalation: Partial<EscalationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!escalation.ticketId) errors.push('Ticket ID is required');
  if (!escalation.reason) errors.push('Escalation reason is required');
  if (
    escalation.level &&
    !Object.keys(TICKET_ESCALATION.ESCALATION_LEVELS).includes(escalation.level)
  ) {
    errors.push('Invalid escalation level');
  }
  if (
    escalation.trigger &&
    !Object.keys(TICKET_ESCALATION.ESCALATION_TRIGGERS).includes(escalation.trigger)
  ) {
    errors.push('Invalid escalation trigger');
  }
  return { isValid: errors.length === 0, errors };
};

export const isEscalationValid = (escalation: EscalationInput): boolean => {
  return escalation.status === 'pending' || escalation.status === 'approved';
};
