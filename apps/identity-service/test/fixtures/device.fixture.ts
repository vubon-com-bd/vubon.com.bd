/**
 * Device fixtures
 * @module identity-service/test/fixtures
 */
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';

import { TEST_IDS, TEST_FINGERPRINT, TEST_IP, TEST_USER_AGENT } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeDeviceOptions {
  readonly id?: string;
  readonly userId?: string;
  readonly type?: string;
  readonly fingerprint?: string;
  readonly name?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly trusted?: boolean;
  readonly trustedUntil?: string;
  readonly lastActiveAt?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export const makeDeviceEntity = (options: MakeDeviceOptions = {}): DeviceEntity => {
  const now = options.createdAt ?? TEST_DATES.NOW;
  return DeviceEntity.reconstitute({
    id: options.id ?? TEST_IDS.DEVICE_ID,
    createdAt: now,
    updatedAt: options.updatedAt ?? now,
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      type: DeviceTypeVO.reconstitute(options.type ?? 'mobile'),
      fingerprint: DeviceFingerprintVO.create(options.fingerprint ?? TEST_FINGERPRINT),
      name: options.name ?? 'Test iPhone',
      os: options.os ?? 'iOS 17',
      browser: options.browser ?? 'Safari',
      appVersion: '1.0.0',
      ipAddress: IpAddressVO.create(TEST_IP),
      userAgent: UserAgentVO.create(TEST_USER_AGENT),
      trusted: options.trusted ?? false,
      trustedUntil: options.trustedUntil,
      lastActiveAt: options.lastActiveAt ?? now,
    },
  });
};

export const untrustedDevice = (): DeviceEntity =>
  makeDeviceEntity({ trusted: false });

export const trustedDevice = (): DeviceEntity =>
  makeDeviceEntity({
    trusted: true,
    trustedUntil: TEST_DATES.IN_THIRTY_DAYS,
  });

export const expiredTrustDevice = (): DeviceEntity =>
  makeDeviceEntity({
    trusted: true,
    trustedUntil: TEST_DATES.PAST_EXPIRY,
  });

export const createNewDevice = (options: MakeDeviceOptions = {}): DeviceEntity => {
  const now = TEST_DATES.NOW;
  return DeviceEntity.create({
    id: DeviceIdVO.create(options.id ?? TEST_IDS.DEVICE_ID),
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      type: DeviceTypeVO.reconstitute(options.type ?? 'mobile'),
      fingerprint: DeviceFingerprintVO.create(options.fingerprint ?? TEST_FINGERPRINT),
      name: options.name ?? 'Test iPhone',
      os: options.os ?? 'iOS 17',
      browser: options.browser ?? 'Safari',
      appVersion: '1.0.0',
      ipAddress: IpAddressVO.create(TEST_IP),
      userAgent: UserAgentVO.create(TEST_USER_AGENT),
    },
    now,
  });
};
