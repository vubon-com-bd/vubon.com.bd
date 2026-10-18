/**
 * DeviceVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceVO } from '@domain/value-objects/composites/device.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_FINGERPRINT } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
  userId: UserIdVO.create(TEST_IDS.USER_ID),
  type: DeviceTypeVO.mobile(),
  fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
  trusted: false,
  lastActiveAt: TEST_DATES.NOW,
  createdAt: TEST_DATES.NOW,
  ...overrides,
});

describe('DeviceVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = DeviceVO.create(makeProps());
      expect(vo.id.value).toBe(TEST_IDS.DEVICE_ID);
      expect(vo.trusted).toBe(false);
    });

    it('should throw when trusted but no trustedUntil', () => {
      expect(() => DeviceVO.create(makeProps({ trusted: true }))).toThrow(ValidationError);
    });

    it('should allow trusted with trustedUntil', () => {
      const vo = DeviceVO.create(
        makeProps({ trusted: true, trustedUntil: TEST_DATES.IN_THIRTY_DAYS }),
      );
      expect(vo.trusted).toBe(true);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(DeviceVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isTrustActive()', () => {
    it('false when not trusted', () => {
      const vo = DeviceVO.create(makeProps());
      expect(vo.isTrustActive()).toBe(false);
    });

    it('true when trusted + future expiry', () => {
      const vo = DeviceVO.create(
        makeProps({ trusted: true, trustedUntil: TEST_DATES.IN_THIRTY_DAYS }),
      );
      expect(vo.isTrustActive()).toBe(true);
    });

    it('false when trusted but expired', () => {
      const vo = DeviceVO.create(
        makeProps({ trusted: true, trustedUntil: TEST_DATES.PAST_EXPIRY }),
      );
      expect(vo.isTrustActive()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = DeviceVO.reconstitute(makeProps({ trusted: true }));
      expect(vo.trusted).toBe(true);
    });
  });
});
