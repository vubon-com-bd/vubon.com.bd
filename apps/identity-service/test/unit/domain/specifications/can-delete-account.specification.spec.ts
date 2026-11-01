/**
 * CanDeleteAccountSpecification — Unit Tests
 */
import { CanDeleteAccountSpecification } from '@domain/specifications/can-delete-account.specification.js';

const SPEC = new CanDeleteAccountSpecification();

function make(overrides?: {
  userStatus?: string;
  hasPendingOrders?: boolean;
  hasActiveSubscriptions?: boolean;
  walletBalance?: number;
  isLastAdmin?: boolean;
  hasActiveSessions?: boolean;
}) {
  return {
    userId: 'user-1',
    userStatus: overrides?.userStatus ?? 'active',
    context: {
      hasPendingOrders: overrides?.hasPendingOrders ?? false,
      hasActiveSubscriptions: overrides?.hasActiveSubscriptions ?? false,
      walletBalance: overrides?.walletBalance ?? 0,
      isLastAdmin: overrides?.isLastAdmin ?? false,
      hasActiveSessions: overrides?.hasActiveSessions ?? false,
    },
  };
}

describe('CanDeleteAccountSpecification', () => {
  it('returns true when all conditions met', () => {
    expect(SPEC.isSatisfiedBy(make())).toBe(true);
  });

  it('returns false when already deleted', () => {
    expect(SPEC.isSatisfiedBy(make({ userStatus: 'deleted' }))).toBe(false);
  });

  it('returns false with pending orders', () => {
    expect(SPEC.isSatisfiedBy(make({ hasPendingOrders: true }))).toBe(false);
  });

  it('returns false with active subscriptions', () => {
    expect(SPEC.isSatisfiedBy(make({ hasActiveSubscriptions: true }))).toBe(false);
  });

  it('returns false with non-zero wallet', () => {
    expect(SPEC.isSatisfiedBy(make({ walletBalance: 100 }))).toBe(false);
  });

  it('returns false if last admin', () => {
    expect(SPEC.isSatisfiedBy(make({ isLastAdmin: true }))).toBe(false);
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain(make())).toBeNull();
    });

    it('explains already deleted', () => {
      expect(SPEC.explain(make({ userStatus: 'deleted' }))).toBe(
        'account already deleted',
      );
    });

    it('explains pending orders', () => {
      expect(SPEC.explain(make({ hasPendingOrders: true }))).toBe(
        'user has pending orders',
      );
    });

    it('explains active subscriptions', () => {
      expect(SPEC.explain(make({ hasActiveSubscriptions: true }))).toBe(
        'user has active subscriptions',
      );
    });

    it('explains wallet balance', () => {
      expect(SPEC.explain(make({ walletBalance: 50 }))).toContain('wallet balance');
    });

    it('explains last admin', () => {
      expect(SPEC.explain(make({ isLastAdmin: true }))).toBe(
        'cannot delete last admin account',
      );
    });
  });

  it('strict factory returns instance', () => {
    expect(CanDeleteAccountSpecification.strict()).toBeInstanceOf(
      CanDeleteAccountSpecification,
    );
  });
});
