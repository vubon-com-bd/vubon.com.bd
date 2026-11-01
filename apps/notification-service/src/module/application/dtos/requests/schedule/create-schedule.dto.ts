/**
 * Create Notification Schedule Request DTO
 * @module notification-service/application/dtos/requests/schedule
 */
import type { CreateNotificationScheduleRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CreateScheduleRequestDTO = CreateNotificationScheduleRequestSchemaType;

export interface CreateScheduleCommandDTO extends CreateScheduleRequestDTO {
  readonly actorId?: string;
}
