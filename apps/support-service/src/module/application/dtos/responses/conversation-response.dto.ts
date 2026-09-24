import type { Conversation } from '@vubon/shared-types/support';

export interface ConversationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly agentId: string | null;
  readonly status: string;
  readonly type: string;
  readonly startedAt: string;
  readonly endedAt: string | null;
}

export type ConversationResponseShape = Conversation;
