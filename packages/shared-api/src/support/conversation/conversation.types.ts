export type ConversationStatus = 'active' | 'archived' | 'closed';
export type ConversationChannel = 'in_app' | 'email' | 'chat';

export interface Conversation {
  readonly id: string;
  readonly ticketId?: string;
  readonly userId: string;
  readonly subject: string;
  readonly status: ConversationStatus;
  readonly channel: ConversationChannel;
  readonly lastMessageAt: string;
  readonly createdAt: string;
}

export interface CreateConversationRequest {
  readonly subject: string;
  readonly channel: ConversationChannel;
  readonly ticketId?: string;
}

export interface ConversationListResponse {
  readonly conversations: readonly Conversation[];
  readonly total: number;
}
