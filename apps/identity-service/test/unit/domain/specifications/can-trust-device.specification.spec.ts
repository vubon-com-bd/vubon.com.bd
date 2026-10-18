/**
 * CanTrustDeviceSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanTrustDeviceSpecification } from '@domain/specifications/can-trust-device.specification.js';
import { TEST_IDS } from '@fixtures/index';

const spec = new CanTrustDeviceSpecification();

const baseCtx = {
  currentDeviceCount: 1,
  hasFingerprint: true,
  sameIp: true,
  fromNewCountry: false,
  alreadyTrusted: false,
  requestorIsOwner: true,
};

describe('CanTrustDeviceSpecification', () => {
  describe('isSatisfiedBy()', () => {
    it('true when all met', () => {
      expect(spec.isSatisfiedBy({ deviceId: TEST_IDS.DEVICE_ID, context: baseCtx })).toBe(true);
    });

    it('false when not owner', () => {
      expect(
        spec.isSatisfiedBy({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, requestorIsOwner: false },
        }),
      ).toBe(false);
    });

    it('false when already trusted', () => {
      expect(
        spec.isSatisfiedBy({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, alreadyTrusted: true },
        }),
      ).toBe(false);
    });

    it('false without fingerprint', () => {
      expect(
        spec.isSatisfiedBy({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, hasFingerprint: false },
        }),
      ).toBe(false);
    });

    it('false from new country', () => {
      expect(
        spec.isSatisfiedBy({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, fromNewCountry: true },
        }),
      ).toBe(false);
    });

    it('false when device limit reached', () => {
      expect(
        spec.isSatisfiedBy({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, currentDeviceCount: 10 },
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when passes', () => {
      expect(spec.explain({ deviceId: TEST_IDS.DEVICE_ID, context: baseCtx })).toBeNull();
    });

    it('explains not owner', () => {
      expect(
        spec.explain({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, requestorIsOwner: false },
        }),
      ).toContain('owner');
    });

    it('explains already trusted', () => {
      expect(
        spec.explain({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, alreadyTrusted: true },
        }),
      ).toContain('already trusted');
    });

    it('explains missing fingerprint', () => {
      expect(
        spec.explain({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, hasFingerprint: false },
        }),
      ).toContain('fingerprint');
    });

    it('explains new country', () => {
      expect(
        spec.explain({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, fromNewCountry: true },
        }),
      ).toContain('new country');
    });

    it('explains device limit', () => {
      expect(
        spec.explain({
          deviceId: TEST_IDS.DEVICE_ID,
          context: { ...baseCtx, currentDeviceCount: 10 },
        }),
      ).toContain('Max devices');
    });
  });

  describe('strict()', () => {
    it('should return instance', () => {
      expect(CanTrustDeviceSpecification.strict()).toBeInstanceOf(CanTrustDeviceSpecification);
    });
  });
});
