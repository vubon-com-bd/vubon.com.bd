/**
 * Unregister Device Request DTO
 * @module notification-service/application/dtos/requests/device
 */
import type { UnregisterNotificationDeviceRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UnregisterDeviceRequestDTO = UnregisterNotificationDeviceRequestSchemaType;

export interface UnregisterDeviceCommandDTO extends UnregisterDeviceRequestDTO {
  readonly actorId?: string;
}
