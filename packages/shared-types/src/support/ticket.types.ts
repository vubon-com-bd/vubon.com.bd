/**
 * Ticket Core Types
 * @module shared-types/support
 */

import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';
import type { TicketStatusValue } from './ticket-status.types';
import type { TicketPriorityValue } from './ticket-priority.types';
import type { TicketTypeValue } from './ticket-type.types';
import type { TicketChannelValue } from './ticket-channel.types';
import type { TicketCategoryValue } from './ticket-category.types';

export interface Ticket extends BaseEntity<string> {
  readonly ticketNumber: string;
  readonly subject: string;
  readonly description: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly type: TicketTypeValue;
  readonly channel: TicketChannelValue;
  readonly category: TicketCategoryValue;
  readonly customerId?: UserId;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly assignedTo?: UserId;
  readonly teamId?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly tags?: readonly string[];
  readonly watchers?: readonly UserId[];
  readonly attachments?: readonly string[];
  readonly firstResponseAt?: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly reopenedAt?: string;
  readonly dueAt?: string;
  readonly slaBreachedAt?: string;
  readonly satisfactionRating?: number;
  readonly satisfactionComment?: string;
}

export interface TicketPublic {
  readonly id: string;
  readonly ticketNumber: string;
  readonly subject: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly type: TicketTypeValue;
  readonly category: TicketCategoryValue;
  readonly createdAt: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
}

export interface TicketSummary {
  readonly id: string;
  readonly ticketNumber: string;
  readonly subject: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly customerName?: string;
  readonly createdAt: string;
}

export interface TicketCreateInput {
  readonly subject: string;
  readonly description: string;
  readonly type: TicketTypeValue;
  readonly priority: TicketPriorityValue;
  readonly channel: TicketChannelValue;
  readonly category: TicketCategoryValue;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
  readonly tags?: readonly string[];
}

export interface TicketUpdateInput {
  readonly subject?: string;
  readonly description?: string;
  readonly status?: TicketStatusValue;
  readonly priority?: TicketPriorityValue;
  readonly category?: TicketCategoryValue;
  readonly assignedTo?: string;
  readonly teamId?: string;
  readonly tags?: readonly string[];
}

export interface TicketListFilter {
  readonly status?: TicketStatusValue;
  readonly priority?: TicketPriorityValue;
  readonly type?: TicketTypeValue;
  readonly channel?: TicketChannelValue;
  readonly category?: TicketCategoryValue;
  readonly assignedTo?: UserId;
  readonly customerId?: UserId;
  readonly teamId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly slaBreached?: boolean;
  readonly search?: string;
}
