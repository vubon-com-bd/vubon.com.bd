/**
 * DeviceStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { DeviceStatusVO } from './device-status.vo';

describe('DeviceStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['pending', 'trusted', 'untrusted', 'blocked', 'revoked'].forEach((s) => {
        const vo = DeviceStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => DeviceStatusVO.of('unknown')).toThrow();
    });
  });

  describe('static factories', () => {
    it('should create trusted status', () => {
      const vo = DeviceStatusVO.trusted();
      expect(vo.value).toBe('trusted');
    });
  });

  describe('isActive()', () => {
    it('should return true only for trusted', () => {
      expect(DeviceStatusVO.of('trusted').isActive()).toBe(true);
      ['pending', 'untrusted', 'blocked', 'revoked'].forEach((s) => {
        expect(DeviceStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });

  describe('canLogin()', () => {
    it('should return true for trusted', () => {
      expect(DeviceStatusVO.of('trusted').canLogin()).toBe(true);
    });

    it('should return true for pending', () => {
      expect(DeviceStatusVO.of('pending').canLogin()).toBe(true);
    });

    it('should return false for untrusted', () => {
      expect(DeviceStatusVO.of('untrusted').canLogin()).toBe(false);
    });

    it('should return false for blocked', () => {
      expect(DeviceStatusVO.of('blocked').canLogin()).toBe(false);
    });

    it('should return false for revoked', () => {
      expect(DeviceStatusVO.of('revoked').canLogin()).toBe(false);
    });
  });
});
