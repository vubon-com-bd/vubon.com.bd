export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TicketCategory = 'order' | 'payment' | 'shipping' | 'product' | 'account' | 'other';

export interface Ticket {
  readonly id: string;
  readonly subject: string;
  readonly description: string;
  readonly status: TicketStatus;
  readonly priority: TicketPriority;
  readonly category: TicketCategory;
  readonly userId: string;
  readonly assignedTo?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateTicketRequest {
  readonly subject: string;
  readonly description: string;
  readonly category: TicketCategory;
  readonly priority?: TicketPriority;
  readonly attachments?: readonly string[];
}

export interface UpdateTicketRequest {
  readonly status?: TicketStatus;
  readonly priority?: TicketPriority;
  readonly assignedTo?: string;
}

export interface TicketListResponse {
  readonly tickets: readonly Ticket[];
  readonly total: number;
}
