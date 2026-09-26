/**
 * LiveChatResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  LiveChatSessionStatusValue,
  LiveChatTriggerValue,
} from '@vubon/shared-types/support';

export interface LiveChatResponseDTO {
  readonly id: string;
  readonly userId?: string;
  readonly agentId?: string;
  readonly visitorId?: string;
  readonly status: LiveChatSessionStatusValue;
  readonly trigger: LiveChatTriggerValue;
  readonly subject?: string;
  readonly messageCount: number;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly durationSeconds?: number;
  readonly transferredTo?: string;
  readonly rating?: number;
  readonly ratingComment?: string;
  readonly transcriptUrl?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
