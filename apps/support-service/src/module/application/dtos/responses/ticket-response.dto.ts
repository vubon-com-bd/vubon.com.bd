import type { Ticket } from '@vubon/shared-types/support';

export interface TicketResponseDTO {
  readonly id: string;
  readonly number: string;
  readonly subject: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly type: string;
  readonly channel: string;
  readonly userId: string;
  readonly assignedAgentId: string | null;
  readonly tags: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly resolvedAt: string | null;
  readonly closedAt: string | null;
}

export type TicketResponseShape = Ticket;
