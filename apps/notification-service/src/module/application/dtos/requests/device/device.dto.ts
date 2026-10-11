/**
 * Device Request DTOs
 * @module notification-service/application/dtos/requests/device
 */
import type {
  NotificationDeviceTypeValue,
} from '@vubon/shared-types/platform/notification';

export interface RegisterDeviceRequestDTO {
  readonly userId: string;
  readonly type: NotificationDeviceTypeValue;
  readonly token: string;
  readonly platform?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
}

export interface UpdateDeviceRequestDTO {
  readonly deviceId: string;
  readonly token?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
}

export interface GetDeviceRequestDTO {
  readonly deviceId: string;
}

export interface ListDevicesRequestDTO {
  readonly userId?: string;
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface RemoveDeviceRequestDTO {
  readonly deviceId: string;
  readonly reason?: string;
}

export interface BlockDeviceRequestDTO {
  readonly deviceId: string;
  readonly reason: string;
}

export interface RefreshDeviceTokenRequestDTO {
  readonly deviceId: string;
  readonly newToken: string;
}
