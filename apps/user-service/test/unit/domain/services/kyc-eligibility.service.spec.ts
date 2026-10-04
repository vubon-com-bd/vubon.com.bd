/**
 * KycEligibilityService Unit Test
 */
import { KycEligibilityService } from '@domain/services/kyc-eligibility.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('KycEligibilityService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildActiveVerifiedUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    u.activate(now);
    return u;
  };

  describe('check', () => {
    it('should be eligible for active + verified + individual', () => {
      const result = KycEligibilityService.check(buildActiveVerifiedUser(), null);
      expect(result.eligible).toBe(true);
      expect(result.reasons.length).toBe(0);
    });

    it('should not be eligible for deleted user', () => {
      const u = buildActiveVerifiedUser();
      u.delete(now);
      const result = KycEligibilityService.check(u, null);
      expect(result.eligible).toBe(false);
      expect(result.reasons.some((r) => r.includes('deleted'))).toBe(true);
    });

    it('should not be eligible if email not verified', () => {
      const u = UserEntity.create({
        id: UserIdVO.create('u-1'),
        email: UserEmailVO.create('u@example.com'),
        name: UserNameVO.create('User One'),
        type: UserTypeVO.create('individual'),
        now,
      });
      u.activate(now);
      const result = KycEligibilityService.check(u, null);
      expect(result.eligible).toBe(false);
      expect(result.reasons.some((r) => r.includes('Email not verified'))).toBe(true);
    });

    it('should not be eligible if user is not active', () => {
      const u = UserEntity.create({
        id: UserIdVO.create('u-1'),
        email: UserEmailVO.create('u@example.com'),
        name: UserNameVO.create('User One'),
        type: UserTypeVO.create('individual'),
        now,
      });
      u.markEmailVerified();
      // not activated — status is pending
      const result = KycEligibilityService.check(u, null);
      expect(result.eligible).toBe(false);
    });

    it('should not be eligible if user type does not require KYC', () => {
      const u = UserEntity.create({
        id: UserIdVO.create('u-1'),
        email: UserEmailVO.create('u@example.com'),
        name: UserNameVO.create('Admin User'),
        type: UserTypeVO.create('admin'),
        now,
      });
      u.markEmailVerified();
      u.activate(now);
      const result = KycEligibilityService.check(u, null);
      expect(result.eligible).toBe(false);
      expect(result.reasons.some((r) => r.includes('does not require KYC'))).toBe(true);
    });
  });

  describe('assertEligible', () => {
    it('should not throw for eligible user', () => {
      expect(() =>
        KycEligibilityService.assertEligible(buildActiveVerifiedUser(), null)
      ).not.toThrow();
    });

    it('should throw for deleted user', () => {
      const u = buildActiveVerifiedUser();
      u.delete(now);
      expect(() => KycEligibilityService.assertEligible(u, null)).toThrow();
    });

    it('should throw for unverified email', () => {
      const u = UserEntity.create({
        id: UserIdVO.create('u-1'),
        email: UserEmailVO.create('u@example.com'),
        name: UserNameVO.create('User One'),
        type: UserTypeVO.create('individual'),
        now,
      });
      u.activate(now);
      expect(() => KycEligibilityService.assertEligible(u, null)).toThrow();
    });
  });
});
