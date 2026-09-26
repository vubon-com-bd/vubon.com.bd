/**
 * DeviceTypeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { DeviceTypeVO } from './device-type.vo';

describe('DeviceTypeVO', () => {
  describe('of()', () => {
    it('should accept all valid types', () => {
      ['mobile', 'tablet', 'desktop', 'laptop', 'smart_tv', 'console', 'unknown'].forEach((t) => {
        const vo = DeviceTypeVO.of(t);
        expect(vo.value).toBe(t);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = DeviceTypeVO.of('MOBILE');
      expect(vo.value).toBe('mobile');
    });

    it('should handle spaces → underscore', () => {
      const vo = DeviceTypeVO.of('smart tv');
      expect(vo.value).toBe('smart_tv');
    });

    it('should default unknown values to "unknown"', () => {
      const vo = DeviceTypeVO.of('toaster');
      expect(vo.value).toBe('unknown');
    });
  });

  describe('isMobile()', () => {
    it('should return true for mobile', () => {
      expect(DeviceTypeVO.of('mobile').isMobile()).toBe(true);
    });

    it('should return true for tablet', () => {
      expect(DeviceTypeVO.of('tablet').isMobile()).toBe(true);
    });

    it('should return false for desktop', () => {
      expect(DeviceTypeVO.of('desktop').isMobile()).toBe(false);
    });

    it('should return false for laptop', () => {
      expect(DeviceTypeVO.of('laptop').isMobile()).toBe(false);
    });
  });
});
