import { BaseEntity } from '../common/base.types';
import { CONVERSATION } from '@vubon/shared-constants/src/support/conversation.constants';
import { Ticket } from './ticket.types';
import { Message } from './message.types';

export interface Conversation extends BaseEntity {
  conversationId: string;
  ticketId: string;
  ticket: Ticket;
  status: keyof typeof CONVERSATION.STATUS | string;
  type: keyof typeof CONVERSATION.CONVERSATION_TYPES | string;
  messages: Message[];
  messageCount: number;
  lastMessageAt?: Date;
  lastMessageBy?: string;
  isActive: boolean;
  isArchived: boolean;
  metadata: Record<string, unknown>;
}
