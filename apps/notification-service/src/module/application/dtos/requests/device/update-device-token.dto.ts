/**
 * Update Device Token Request DTO
 * @module notification-service/application/dtos/requests/device
 */
import type { UpdateNotificationDeviceTokenRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UpdateDeviceTokenRequestDTO = UpdateNotificationDeviceTokenRequestSchemaType;

export interface UpdateDeviceTokenCommandDTO extends UpdateDeviceTokenRequestDTO {
  readonly actorId?: string;
}
