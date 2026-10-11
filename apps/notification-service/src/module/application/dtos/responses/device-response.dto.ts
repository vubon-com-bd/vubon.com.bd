/**
 * Device Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationDeviceTypeValue,
  NotificationDeviceStatusValue,
} from '@vubon/shared-types/platform/notification';

export interface DeviceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: NotificationDeviceTypeValue;
  readonly status: NotificationDeviceStatusValue;
  readonly token: string;
  readonly maskedToken: string;
  readonly platform?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly lastActiveAt?: string;
  readonly registeredAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DeviceListResponseDTO {
  readonly items: readonly DeviceResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
