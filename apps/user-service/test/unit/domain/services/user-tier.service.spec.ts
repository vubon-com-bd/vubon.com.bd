/**
 * UserTierService Unit Test
 *
 * Score rules:
 *   hasVerifiedEmail  : +1
 *   hasVerifiedPhone  : +1
 *   hasKyc            : +2
 *   accountAge >= 30  : +1
 *   accountAge >= 365 : +1
 *
 * Tier:
 *   score >= 5 → platinum
 *   score >= 4 → gold
 *   score >= 2 → silver
 *   else       → bronze
 */
import { UserTierService } from '@domain/services/user-tier.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserTierService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = (type: 'individual' | 'admin' = 'individual') =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create(type),
      now,
    });

  describe('computeTier', () => {
    it('should return bronze for no signals (score 0)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: false,
        hasVerifiedPhone: false,
        hasKyc: false,
        accountAgeDays: 0,
      });
      expect(tier).toBe('bronze');
    });

    it('should return silver for 2 signals (email + phone = 2)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: true,
        hasVerifiedPhone: true,
        hasKyc: false,
        accountAgeDays: 0,
      });
      expect(tier).toBe('silver');
    });

    it('should return silver for 3 signals (email + kyc = 3)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: true,
        hasVerifiedPhone: false,
        hasKyc: true,
        accountAgeDays: 0,
      });
      expect(tier).toBe('silver');
    });

    it('should return gold for score exactly 4 (email + phone + kyc = 4)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: true,
        hasVerifiedPhone: true,
        hasKyc: true,
        accountAgeDays: 0,
      });
      expect(tier).toBe('gold');
    });

    it('should return platinum for score >= 5 (email + phone + kyc + 30days = 5)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: true,
        hasVerifiedPhone: true,
        hasKyc: true,
        accountAgeDays: 30,
      });
      expect(tier).toBe('platinum');
    });

    it('should return platinum for 6 signals (email + phone + kyc + 365 days)', () => {
      const tier = UserTierService.computeTier(buildUser(), {
        hasVerifiedEmail: true,
        hasVerifiedPhone: true,
        hasKyc: true,
        accountAgeDays: 365,
      });
      expect(tier).toBe('platinum');
    });

    it('should return platinum for admin regardless of signals', () => {
      const tier = UserTierService.computeTier(buildUser('admin'), {
        hasVerifiedEmail: false,
        hasVerifiedPhone: false,
        hasKyc: false,
        accountAgeDays: 0,
      });
      expect(tier).toBe('platinum');
    });
  });

  describe('requiresEnhancedKyc', () => {
    it('should be true for gold/platinum', () => {
      expect(UserTierService.requiresEnhancedKyc('gold')).toBe(true);
      expect(UserTierService.requiresEnhancedKyc('platinum')).toBe(true);
    });

    it('should be false for bronze/silver', () => {
      expect(UserTierService.requiresEnhancedKyc('bronze')).toBe(false);
      expect(UserTierService.requiresEnhancedKyc('silver')).toBe(false);
    });
  });

  describe('maxAddressesFor', () => {
    it('should return correct limits per tier', () => {
      expect(UserTierService.maxAddressesFor('bronze')).toBe(3);
      expect(UserTierService.maxAddressesFor('silver')).toBe(5);
      expect(UserTierService.maxAddressesFor('gold')).toBe(10);
      expect(UserTierService.maxAddressesFor('platinum')).toBe(20);
    });
  });
});
