import type { SupportMessage } from '@vubon/shared-types/support';

export interface MessageResponseDTO {
  readonly id: string;
  readonly conversationId: string;
  readonly senderId: string;
  readonly content: string;
  readonly type: string;
  readonly status: string;
  readonly createdAt: string;
}

export type MessageResponseShape = SupportMessage;
