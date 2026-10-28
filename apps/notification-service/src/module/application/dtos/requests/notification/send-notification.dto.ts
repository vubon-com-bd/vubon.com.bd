/**
 * Send Notification Request DTO
 * @module notification-service/application/dtos/requests/notification
 *
 * Shape derives from SendNotificationRequestSchema in @vubon/shared-schemas/platform.
 * Single source of truth — no duplicate Zod definitions।
 */
import type { SendNotificationRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendNotificationRequestDTO = SendNotificationRequestSchemaType;

// Command-specific extras (not in schema)
export interface SendNotificationCommandDTO extends SendNotificationRequestDTO {
  readonly actorId?: string;
}

// ─── Extra optional fields (from Zod schema) ───
declare module '@vubon/shared-schemas/platform' {
  interface __NotificationExtras {
    readonly html?: string;
  }
}
