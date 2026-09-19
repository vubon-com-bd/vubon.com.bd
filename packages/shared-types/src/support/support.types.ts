/**
 * Support Core Types
 * @module shared-types/support
 *
 * Support entity + aggregator।
 */

import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';
import type { TicketStatusValue } from './ticket-status.types';
import type { TicketPriorityValue } from './ticket-priority.types';
import type { Ticket } from './ticket.types';
import type { Conversation } from './conversation.types';
import type { SupportMessage } from './message.types';
import type { SupportAgent } from './support-agent.types';
import type { SupportTeam } from './support-team.types';
import type { SupportMetrics } from './support-analytics.types';

export interface Support extends BaseEntity<string> {
  readonly ticketId?: string;
  readonly conversationId?: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly customerId?: UserId;
  readonly assignedTo?: UserId;
  readonly teamId?: string;
  readonly firstResponseAt?: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly isEscalated: boolean;
  readonly isReopened: boolean;
}

export interface SupportPublic {
  readonly id: string;
  readonly ticketId?: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly createdAt: string;
  readonly resolvedAt?: string;
}

export interface SupportSummary {
  readonly totalTickets: number;
  readonly openTickets: number;
  readonly resolvedTickets: number;
  readonly averageResponseMinutes: number;
  readonly averageResolutionMinutes: number;
  readonly satisfactionScore: number;
  readonly metrics: SupportMetrics;
}

export interface SupportOverview {
  readonly tickets: readonly Ticket[];
  readonly conversations: readonly Conversation[];
  readonly messages: readonly SupportMessage[];
  readonly agents: readonly SupportAgent[];
  readonly teams: readonly SupportTeam[];
  readonly summary: SupportSummary;
  readonly generatedAt: string;
}

export interface SupportListFilter {
  readonly status?: TicketStatusValue;
  readonly priority?: TicketPriorityValue;
  readonly customerId?: UserId;
  readonly assignedTo?: UserId;
  readonly teamId?: string;
  readonly isEscalated?: boolean;
  readonly isReopened?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
