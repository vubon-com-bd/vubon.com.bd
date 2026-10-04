/**
 * UserKycEntity Unit Test
 */
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';

describe('UserKycEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildKyc = () =>
    UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });

  describe('create', () => {
    it('should start with not_started status', () => {
      const kyc = buildKyc();
      expect(kyc.status.value).toBe('not_started');
      expect(kyc.submittedAt).toBeNull();
      expect(kyc.verifiedAt).toBeNull();
      expect(kyc.isVerified()).toBe(false);
    });
  });

  describe('submit', () => {
    it('should set status to pending and set submittedAt', () => {
      const kyc = buildKyc();
      kyc.submit(now);
      expect(kyc.status.value).toBe('pending');
      expect(kyc.submittedAt).not.toBeNull();
    });

    it('should emit KycSubmittedEvent', () => {
      const kyc = buildKyc();
      kyc.pullDomainEvents();
      kyc.submit(now);
      const events = kyc.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('kyc.submitted');
    });
  });

  describe('approve', () => {
    it('should throw if not submitted yet', () => {
      const kyc = buildKyc();
      expect(() => kyc.approve(now)).toThrow('Cannot approve KYC before submission');
    });

    it('should set status to approved and verifiedAt', () => {
      const kyc = buildKyc();
      kyc.submit(now);
      kyc.approve(now);
      expect(kyc.status.value).toBe('approved');
      expect(kyc.verifiedAt).not.toBeNull();
      expect(kyc.isVerified()).toBe(true);
    });
  });

  describe('reject', () => {
    it('should throw if not pending', () => {
      const kyc = buildKyc();
      expect(() => kyc.reject('bad docs', now)).toThrow('Can only reject a pending KYC');
    });

    it('should set status to rejected with reason', () => {
      const kyc = buildKyc();
      kyc.submit(now);
      kyc.reject('blurry image', now);
      expect(kyc.status.value).toBe('rejected');
      expect(kyc.rejectionReason).toBe('blurry image');
    });
  });
});
