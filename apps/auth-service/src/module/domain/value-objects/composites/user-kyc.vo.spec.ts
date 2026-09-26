/**
 * UserKycVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserKycVO } from './user-kyc.vo';
import { UserIdVO } from '../primitives/user-id.vo';

describe('UserKycVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('of()', () => {
    it('should create not_submitted KYC', () => {
      const vo = UserKycVO.of({
        userId,
        status: 'not_submitted',
        documentType: 'nid',
        documentNumber: '1234567890',
      });
      expect(vo.status).toBe('not_submitted');
    });

    it('should create pending KYC', () => {
      const vo = UserKycVO.of({
        userId,
        status: 'pending',
        documentType: 'passport',
        documentNumber: 'AB1234567',
      });
      expect(vo.status).toBe('pending');
    });

    it('should reject document number too short', () => {
      expect(() => UserKycVO.of({
        userId, status: 'pending', documentType: 'nid', documentNumber: '123',
      })).toThrow('length invalid');
    });

    it('should reject document number too long', () => {
      expect(() => UserKycVO.of({
        userId, status: 'pending', documentType: 'nid', documentNumber: 'x'.repeat(41),
      })).toThrow('length invalid');
    });

    it('should require rejection reason when status=rejected', () => {
      expect(() => UserKycVO.of({
        userId, status: 'rejected', documentType: 'nid', documentNumber: '1234567890',
      })).toThrow('Rejected KYC must have a reason');
    });

    it('should accept rejected with reason', () => {
      const vo = UserKycVO.of({
        userId, status: 'rejected', documentType: 'nid', documentNumber: '1234567890',
        rejectionReason: 'Blurry photo',
      });
      expect(vo.status).toBe('rejected');
    });
  });

  describe('isApproved()', () => {
    it('should return true for approved', () => {
      const vo = UserKycVO.of({
        userId, status: 'approved', documentType: 'nid', documentNumber: '1234567890',
      });
      expect(vo.isApproved()).toBe(true);
    });

    it('should return false for pending', () => {
      const vo = UserKycVO.of({
        userId, status: 'pending', documentType: 'nid', documentNumber: '1234567890',
      });
      expect(vo.isApproved()).toBe(false);
    });
  });

  describe('canSubmit()', () => {
    it('should return true for not_submitted', () => {
      const vo = UserKycVO.of({
        userId, status: 'not_submitted', documentType: 'nid', documentNumber: '1234567890',
      });
      expect(vo.canSubmit()).toBe(true);
    });

    it('should return true for rejected', () => {
      const vo = UserKycVO.of({
        userId, status: 'rejected', documentType: 'nid', documentNumber: '1234567890',
        rejectionReason: 'reason',
      });
      expect(vo.canSubmit()).toBe(true);
    });

    it('should return false for pending', () => {
      const vo = UserKycVO.of({
        userId, status: 'pending', documentType: 'nid', documentNumber: '1234567890',
      });
      expect(vo.canSubmit()).toBe(false);
    });

    it('should return false for approved', () => {
      const vo = UserKycVO.of({
        userId, status: 'approved', documentType: 'nid', documentNumber: '1234567890',
      });
      expect(vo.canSubmit()).toBe(false);
    });
  });
});
