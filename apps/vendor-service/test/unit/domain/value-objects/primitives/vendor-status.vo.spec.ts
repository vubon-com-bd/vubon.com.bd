import { VendorStatusVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { InvalidVendorStatusError } from '../../../../../src/module/domain/errors/vendor.errors.js';

describe('VendorStatusVO', () => {
  describe('create()', () => {
    it.each([
      'pending', 'approved', 'active', 'inactive',
      'suspended', 'rejected', 'blocked', 'deleted',
    ])('creates from valid status "%s"', (s) => {
      expect(VendorStatusVO.create(s).value).toBe(s);
    });

    it('throws on invalid status', () => {
      expect(() => VendorStatusVO.create('bogus')).toThrow(InvalidVendorStatusError);
    });

    it('throws on non-string', () => {
      expect(() => VendorStatusVO.create(123 as unknown as string)).toThrow();
    });
  });

  describe('named constructors', () => {
    it.each([
      ['pending', VendorStatusVO.pending],
      ['approved', VendorStatusVO.approved],
      ['active', VendorStatusVO.active],
      ['inactive', VendorStatusVO.inactive],
      ['suspended', VendorStatusVO.suspended],
      ['rejected', VendorStatusVO.rejected],
      ['blocked', VendorStatusVO.blocked],
      ['deleted', VendorStatusVO.deleted],
    ])('creates %s', (expected, fn) => {
      expect(fn().value).toBe(expected);
    });
  });

  describe('predicates', () => {
    it('isPending / isApproved / isActive / isInactive / isSuspended / isRejected / isBlocked', () => {
      expect(VendorStatusVO.pending().isPending()).toBe(true);
      expect(VendorStatusVO.approved().isApproved()).toBe(true);
      expect(VendorStatusVO.active().isActive()).toBe(true);
      expect(VendorStatusVO.inactive().isInactive()).toBe(true);
      expect(VendorStatusVO.suspended().isSuspended()).toBe(true);
      expect(VendorStatusVO.rejected().isRejected()).toBe(true);
      expect(VendorStatusVO.blocked().isBlocked()).toBe(true);
    });
  });

  describe('isOperational()', () => {
    it('true for active and approved', () => {
      expect(VendorStatusVO.active().isOperational()).toBe(true);
      expect(VendorStatusVO.approved().isOperational()).toBe(true);
    });

    it('false for others', () => {
      expect(VendorStatusVO.pending().isOperational()).toBe(false);
      expect(VendorStatusVO.suspended().isOperational()).toBe(false);
    });
  });

  describe('isEditable()', () => {
    it('false for deleted', () => {
      expect(VendorStatusVO.deleted().isEditable()).toBe(false);
    });

    it('false for blocked', () => {
      expect(VendorStatusVO.blocked().isEditable()).toBe(false);
    });

    it('true for others', () => {
      expect(VendorStatusVO.active().isEditable()).toBe(true);
    });
  });

  describe('isFinal()', () => {
    it('true for deleted and blocked', () => {
      expect(VendorStatusVO.deleted().isFinal()).toBe(true);
      expect(VendorStatusVO.blocked().isFinal()).toBe(true);
    });

    it('false for active', () => {
      expect(VendorStatusVO.active().isFinal()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → approved/rejected/blocked', () => {
      expect(VendorStatusVO.pending().canTransitionTo('approved')).toBe(true);
      expect(VendorStatusVO.pending().canTransitionTo('rejected')).toBe(true);
      expect(VendorStatusVO.pending().canTransitionTo('active')).toBe(false);
    });

    it('approved → active/inactive/suspended/blocked', () => {
      expect(VendorStatusVO.approved().canTransitionTo('active')).toBe(true);
      expect(VendorStatusVO.approved().canTransitionTo('inactive')).toBe(true);
      expect(VendorStatusVO.approved().canTransitionTo('suspended')).toBe(true);
    });

    it('active → inactive/suspended/blocked/deleted', () => {
      expect(VendorStatusVO.active().canTransitionTo('inactive')).toBe(true);
      expect(VendorStatusVO.active().canTransitionTo('deleted')).toBe(true);
      expect(VendorStatusVO.active().canTransitionTo('approved')).toBe(false);
    });

    it('deleted → nothing', () => {
      expect(VendorStatusVO.deleted().canTransitionTo('active')).toBe(false);
    });

    it('suspended → active/inactive/blocked/deleted', () => {
      expect(VendorStatusVO.suspended().canTransitionTo('active')).toBe(true);
      expect(VendorStatusVO.suspended().canTransitionTo('deleted')).toBe(true);
    });
  });
});
