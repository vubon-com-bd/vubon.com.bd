/**
 * RecoveryCodeStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { RecoveryCodeStatusVO } from './recovery-code-status.vo';

describe('RecoveryCodeStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['active', 'used', 'expired'].forEach((s) => {
        const vo = RecoveryCodeStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => RecoveryCodeStatusVO.of('unknown')).toThrow();
      expect(() => RecoveryCodeStatusVO.of('')).toThrow();
    });
  });

  describe('static factories', () => {
    it('should create active status', () => {
      const vo = RecoveryCodeStatusVO.active();
      expect(vo.value).toBe('active');
    });
  });

  describe('canBeUsed()', () => {
    it('should return true only for active', () => {
      expect(RecoveryCodeStatusVO.of('active').canBeUsed()).toBe(true);
      ['used', 'expired'].forEach((s) => {
        expect(RecoveryCodeStatusVO.of(s).canBeUsed()).toBe(false);
      });
    });
  });
});
