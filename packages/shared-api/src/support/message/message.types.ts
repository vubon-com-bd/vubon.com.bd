export type MessageSender = 'user' | 'agent' | 'system';

export interface Message {
  readonly id: string;
  readonly conversationId: string;
  readonly sender: MessageSender;
  readonly senderId?: string;
  readonly body: string;
  readonly attachments?: readonly string[];
  readonly readAt?: string;
  readonly createdAt: string;
}

export interface SendMessageRequest {
  readonly body: string;
  readonly attachments?: readonly string[];
}

export interface MessageListResponse {
  readonly messages: readonly Message[];
  readonly total: number;
}
