import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { LIVE_CHAT } from '@vubon/shared-constants/src/support/live-chat.constants';
import { LiveChatSession } from './live-chat-session.types';
import { Message } from './message.types';
import { SupportAgent } from './support-agent.types';

export interface LiveChat extends BaseEntity {
  chatId: string;
  userId: string;
  user: User;
  status: keyof typeof LIVE_CHAT.STATUS | string;
  type: keyof typeof LIVE_CHAT.CHAT_TYPES | string;
  session: LiveChatSession;
  messages: Message[];
  messageCount: number;
  assignedTo?: string;
  assignedToAgent?: SupportAgent;
  startedAt: Date;
  endedAt?: Date;
  isActive: boolean;
  isEnded: boolean;
  rating?: number;
  feedback?: string;
  metadata: Record<string, unknown>;
}
