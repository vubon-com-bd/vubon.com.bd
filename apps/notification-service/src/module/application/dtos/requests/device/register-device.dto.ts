/**
 * Register Device Request DTO
 * @module notification-service/application/dtos/requests/device
 */
import type { RegisterNotificationDeviceRequestSchemaType } from '@vubon/shared-schemas/platform';

export type RegisterDeviceRequestDTO = RegisterNotificationDeviceRequestSchemaType;

export interface RegisterDeviceCommandDTO extends RegisterDeviceRequestDTO {
  readonly actorId?: string;
}
