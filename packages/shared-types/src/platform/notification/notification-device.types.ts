/**
 * Notification Device Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_DEVICE_TYPE,
  NOTIFICATION_DEVICE_STATUS,
} from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';

export type NotificationDeviceTypeValue =
  (typeof NOTIFICATION_DEVICE_TYPE)[keyof typeof NOTIFICATION_DEVICE_TYPE];

export type NotificationDeviceStatusValue =
  (typeof NOTIFICATION_DEVICE_STATUS)[keyof typeof NOTIFICATION_DEVICE_STATUS];

export interface NotificationDevice {
  readonly id: string;
  readonly userId: UserId;
  readonly type: NotificationDeviceTypeValue;
  readonly status: NotificationDeviceStatusValue;
  readonly token: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
  readonly lastActiveAt: string;
  readonly registeredAt: string;
  readonly updatedAt: string;
}

export interface DeviceRegisterInput {
  readonly userId: UserId;
  readonly type: NotificationDeviceTypeValue;
  readonly token: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
  readonly deviceName?: string;
}
