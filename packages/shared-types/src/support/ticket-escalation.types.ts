/**
 * Ticket Escalation Types
 * @module shared-types/support
 *
 * ⚠️ Note: SupportAgentLevelValue support-agent.types.ts থেকে import।
 */

import type { SupportAgentLevelValue } from './support-agent.types';

export interface TicketEscalation {
  readonly id: string;
  readonly ticketId: string;
  readonly fromLevel?: SupportAgentLevelValue;
  readonly toLevel: SupportAgentLevelValue;
  readonly reason: string;
  readonly escalatedBy: string;
  readonly escalatedTo?: string;
  readonly escalatedAt: string;
  readonly resolvedAt?: string;
  readonly notes?: string;
}

export interface EscalationRule {
  readonly id: string;
  readonly name: string;
  readonly condition: EscalationCondition;
  readonly targetLevel: SupportAgentLevelValue;
  readonly isActive: boolean;
}

export interface EscalationCondition {
  readonly type: 'priority' | 'time_elapsed' | 'no_response' | 'sla_breach' | 'keyword';
  readonly value: string | number;
}
