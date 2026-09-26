/**
 * UserVerificationVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserVerificationVO } from './user-verification.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { VerificationTypeVO } from '../primitives/verification-type.vo';
import { VerificationStatusVO } from '../primitives/verification-status.vo';

describe('UserVerificationVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('of()', () => {
    it('should create valid verification', () => {
      const vo = UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('email'),
        status: VerificationStatusVO.of('pending'),
        requestedAt: Date.now(),
      });
      expect(vo.userId.value).toBe('user-1');
      expect(vo.isComplete()).toBe(false);
    });

    it('should reject completedAt before requestedAt', () => {
      const now = Date.now();
      expect(() => UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('email'),
        status: VerificationStatusVO.of('verified'),
        requestedAt: now,
        completedAt: now - 1000,
      })).toThrow('cannot precede');
    });
  });

  describe('isComplete()', () => {
    it('should return true for verified', () => {
      const vo = UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('email'),
        status: VerificationStatusVO.of('verified'),
        requestedAt: Date.now(),
        completedAt: Date.now(),
      });
      expect(vo.isComplete()).toBe(true);
    });

    it('should return false for pending', () => {
      const vo = UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('email'),
        status: VerificationStatusVO.of('pending'),
        requestedAt: Date.now(),
      });
      expect(vo.isComplete()).toBe(false);
    });
  });

  describe('requiresDocument()', () => {
    it('should return true for kyc_document', () => {
      const vo = UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('kyc_document'),
        status: VerificationStatusVO.of('pending'),
        requestedAt: Date.now(),
      });
      expect(vo.requiresDocument()).toBe(true);
    });

    it('should return false for email', () => {
      const vo = UserVerificationVO.of({
        userId,
        type: VerificationTypeVO.of('email'),
        status: VerificationStatusVO.of('pending'),
        requestedAt: Date.now(),
      });
      expect(vo.requiresDocument()).toBe(false);
    });
  });
});
