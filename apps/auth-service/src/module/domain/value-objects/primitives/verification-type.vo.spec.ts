/**
 * VerificationTypeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { VerificationTypeVO } from './verification-type.vo';

describe('VerificationTypeVO', () => {
  describe('of()', () => {
    it('should accept all valid types', () => {
      ['email', 'phone', 'kyc_document', 'address', 'bank_account', 'business'].forEach((t) => {
        const vo = VerificationTypeVO.of(t);
        expect(vo.value).toBe(t);
      });
    });

    it('should reject invalid type', () => {
      expect(() => VerificationTypeVO.of('unknown')).toThrow();
    });
  });

  describe('requiresDocument()', () => {
    it('should return true for kyc_document', () => {
      expect(VerificationTypeVO.of('kyc_document').requiresDocument()).toBe(true);
    });

    it('should return true for business', () => {
      expect(VerificationTypeVO.of('business').requiresDocument()).toBe(true);
    });

    it('should return false for email', () => {
      expect(VerificationTypeVO.of('email').requiresDocument()).toBe(false);
    });

    it('should return false for phone', () => {
      expect(VerificationTypeVO.of('phone').requiresDocument()).toBe(false);
    });
  });
});
