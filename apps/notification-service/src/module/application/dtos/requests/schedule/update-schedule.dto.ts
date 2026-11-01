/**
 * Update Notification Schedule Request DTO
 * @module notification-service/application/dtos/requests/schedule
 */
import type { UpdateNotificationScheduleRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UpdateScheduleRequestDTO = UpdateNotificationScheduleRequestSchemaType;

export interface UpdateScheduleCommandDTO extends UpdateScheduleRequestDTO {
  readonly actorId?: string;
}
