/**
 * Auth Device Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-device.constants থেকে।
 */

import type { AUTH_DEVICE, AUTH_DEVICE_TYPE } from '@vubon/shared-constants/auth';
import type { UserId, IpAddress } from '../common/primitives';

export type AuthDeviceTypeValue = (typeof AUTH_DEVICE_TYPE)[keyof typeof AUTH_DEVICE_TYPE];

export type MaxDevicesPerUser = typeof AUTH_DEVICE.MAX_DEVICES_PER_USER;
export type TrustDeviceExpiry = typeof AUTH_DEVICE.TRUST_DEVICE_EXPIRY_DAYS;

export interface AuthDevice {
  readonly id: string;
  readonly userId: UserId;
  readonly type: AuthDeviceTypeValue;
  readonly name?: string;
  readonly fingerprint?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly appVersion?: string;
  readonly ipAddress?: IpAddress;
  readonly userAgent?: string;
  readonly trusted: boolean;
  readonly trustedUntil?: string;
  readonly lastActiveAt: string;
  readonly createdAt: string;
}

export interface AuthDevicePublic {
  readonly id: string;
  readonly type: AuthDeviceTypeValue;
  readonly name?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly trusted: boolean;
  readonly lastActiveAt: string;
  readonly isCurrent: boolean;
}

export interface AuthDeviceRegisterInput {
  readonly userId: UserId;
  readonly type: AuthDeviceTypeValue;
  readonly name?: string;
  readonly fingerprint?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

export interface AuthDeviceTrustInput {
  readonly deviceId: string;
  readonly userId: UserId;
  readonly trustDays?: number;
}
