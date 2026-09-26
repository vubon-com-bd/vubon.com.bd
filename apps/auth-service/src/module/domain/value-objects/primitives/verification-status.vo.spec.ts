/**
 * VerificationStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { VerificationStatusVO } from './verification-status.vo';

describe('VerificationStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['pending', 'verified', 'rejected', 'expired'].forEach((s) => {
        const vo = VerificationStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => VerificationStatusVO.of('unknown')).toThrow();
    });
  });

  describe('static factories', () => {
    it('should create pending', () => {
      expect(VerificationStatusVO.pending().value).toBe('pending');
    });
  });

  describe('isActive()', () => {
    it('should return true only for verified', () => {
      expect(VerificationStatusVO.of('verified').isActive()).toBe(true);
      ['pending', 'rejected', 'expired'].forEach((s) => {
        expect(VerificationStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });

  describe('canRetry()', () => {
    it('should return true for pending', () => {
      expect(VerificationStatusVO.of('pending').canRetry()).toBe(true);
    });

    it('should return true for expired', () => {
      expect(VerificationStatusVO.of('expired').canRetry()).toBe(true);
    });

    it('should return false for verified', () => {
      expect(VerificationStatusVO.of('verified').canRetry()).toBe(false);
    });

    it('should return false for rejected', () => {
      expect(VerificationStatusVO.of('rejected').canRetry()).toBe(false);
    });
  });
});
