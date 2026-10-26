/**
 * Device Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationDeviceTypeValue,
  NotificationDeviceStatusValue,
} from '@vubon/shared-types/platform';

export interface DeviceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: NotificationDeviceTypeValue;
  readonly status: NotificationDeviceStatusValue;
  readonly tokenMasked: string;
  readonly platform: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
  readonly lastActiveAt: string;
  readonly registeredAt: string;
}

export interface DeviceSummaryResponseDTO {
  readonly id: string;
  readonly type: NotificationDeviceTypeValue;
  readonly status: NotificationDeviceStatusValue;
  readonly deviceName?: string;
  readonly lastActiveAt: string;
}

export interface DeviceListResponseDTO {
  readonly items: readonly DeviceSummaryResponseDTO[];
  readonly total: number;
}
