/**
 * StartChatRequestDTO — matches LiveChatSessionSchema
 * @module support-service/application/dtos/requests/live-chat
 */
import type { LiveChatTriggerValue } from '@vubon/shared-types/support';

export interface StartChatRequestDTO {
  readonly userId?: string;
  readonly visitorId?: string;
  readonly trigger: LiveChatTriggerValue;
  readonly subject?: string;
}
