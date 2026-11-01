/**
 * Cancel Notification Schedule Request DTO
 * @module notification-service/application/dtos/requests/schedule
 */
import type { CancelNotificationScheduleRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CancelScheduleRequestDTO = CancelNotificationScheduleRequestSchemaType;

export interface CancelScheduleCommandDTO extends CancelScheduleRequestDTO {
  readonly actorId?: string;
}
