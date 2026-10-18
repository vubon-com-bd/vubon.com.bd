/**
 * DeviceTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { InvalidDeviceTypeError } from '@domain/errors/device.errors.js';

describe('DeviceTypeVO', () => {
  describe('create()', () => {
    it('should create all valid', () => {
      for (const t of ['desktop', 'mobile', 'tablet', 'tv', 'wearable', 'unknown']) {
        expect(DeviceTypeVO.create(t).value).toBe(t);
      }
    });

    it('should normalize case', () => {
      expect(DeviceTypeVO.create(' MOBILE ').value).toBe('mobile');
    });

    it('should throw on empty', () => {
      expect(() => DeviceTypeVO.create('')).toThrow(InvalidDeviceTypeError);
    });

    it('should throw on invalid', () => {
      expect(() => DeviceTypeVO.create('xxx')).toThrow(InvalidDeviceTypeError);
    });
  });

  describe('static factories', () => {
    it('desktop/mobile/tablet/tv/wearable/unknown', () => {
      expect(DeviceTypeVO.desktop().value).toBe('desktop');
      expect(DeviceTypeVO.mobile().value).toBe('mobile');
      expect(DeviceTypeVO.tablet().value).toBe('tablet');
      expect(DeviceTypeVO.tv().value).toBe('tv');
      expect(DeviceTypeVO.wearable().value).toBe('wearable');
      expect(DeviceTypeVO.unknown().value).toBe('unknown');
    });
  });

  describe('predicates', () => {
    it('isDesktop()', () => {
      expect(DeviceTypeVO.desktop().isDesktop()).toBe(true);
      expect(DeviceTypeVO.mobile().isDesktop()).toBe(false);
    });

    it('isMobile()', () => {
      expect(DeviceTypeVO.mobile().isMobile()).toBe(true);
    });

    it('isTablet()', () => {
      expect(DeviceTypeVO.tablet().isTablet()).toBe(true);
    });

    it('isTv()', () => {
      expect(DeviceTypeVO.tv().isTv()).toBe(true);
    });

    it('isWearable()', () => {
      expect(DeviceTypeVO.wearable().isWearable()).toBe(true);
    });

    it('isKnown()', () => {
      expect(DeviceTypeVO.mobile().isKnown()).toBe(true);
      expect(DeviceTypeVO.unknown().isKnown()).toBe(false);
    });

    it('isHandheld()', () => {
      expect(DeviceTypeVO.mobile().isHandheld()).toBe(true);
      expect(DeviceTypeVO.tablet().isHandheld()).toBe(true);
      expect(DeviceTypeVO.wearable().isHandheld()).toBe(true);
      expect(DeviceTypeVO.desktop().isHandheld()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(DeviceTypeVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
