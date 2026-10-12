/**
 * Domain vendor errors — unit tests
 * @module vendor-service/test/unit/domain/errors
 */
import {
  VendorNotFoundError,
  VendorAlreadyExistsError,
  VendorSlugConflictError,
  VendorEmailConflictError,
  InvalidVendorStatusError,
  InvalidVendorTypeError,
  InvalidVendorBusinessTypeError,
  InvalidVendorTierError,
  InvalidVendorStatusTransitionError,
  VendorNotApprovedError,
  VendorSuspendedError,
  VendorInactiveError,
} from '../../../../src/module/domain/errors/vendor.errors.js';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('Domain vendor errors', () => {
  describe('VendorNotFoundError', () => {
    it('extends NotFoundError', () => {
      const e = new VendorNotFoundError(UUID);
      expect(e).toBeInstanceOf(NotFoundError);
      expect(e).toBeInstanceOf(DomainError);
      expect(e).toBeInstanceOf(Error);
    });

    it('has correct name', () => {
      expect(new VendorNotFoundError(UUID).name).toBe('VendorNotFoundError');
    });

    it('has 404 status', () => {
      expect(new VendorNotFoundError(UUID).httpStatus).toBe(404);
    });

    it('includes vendorId in message', () => {
      expect(new VendorNotFoundError(UUID).message).toContain(UUID);
    });

    it('exposes entityType + entityId', () => {
      const e = new VendorNotFoundError(UUID);
      expect(e.entityType).toBe('Vendor');
      expect(e.entityId).toBe(UUID);
    });

    it('serializes to JSON', () => {
      const json = new VendorNotFoundError(UUID).toJSON();
      expect(json.name).toBe('VendorNotFoundError');
      expect(json.httpStatus).toBe(404);
    });
  });

  describe('VendorAlreadyExistsError', () => {
    it('extends ConflictError', () => {
      const e = new VendorAlreadyExistsError('email', 'a@b.com');
      expect(e).toBeInstanceOf(ConflictError);
      expect(e).toBeInstanceOf(DomainError);
    });

    it('has correct name', () => {
      expect(new VendorAlreadyExistsError('email', 'a@b.com').name).toBe('VendorAlreadyExistsError');
    });

    it('has 409 status', () => {
      expect(new VendorAlreadyExistsError('email', 'a@b.com').httpStatus).toBe(409);
    });

    it('includes field + value in message', () => {
      const e = new VendorAlreadyExistsError('email', 'a@b.com');
      expect(e.message).toContain('email');
      expect(e.message).toContain('a@b.com');
    });
  });

  describe('VendorSlugConflictError', () => {
    it('extends ConflictError', () => {
      expect(new VendorSlugConflictError('acme')).toBeInstanceOf(ConflictError);
    });

    it('has correct name + status', () => {
      const e = new VendorSlugConflictError('acme');
      expect(e.name).toBe('VendorSlugConflictError');
      expect(e.httpStatus).toBe(409);
    });

    it('includes slug in message', () => {
      expect(new VendorSlugConflictError('acme').message).toContain('acme');
    });
  });

  describe('VendorEmailConflictError', () => {
    it('extends ConflictError', () => {
      expect(new VendorEmailConflictError('a@b.com')).toBeInstanceOf(ConflictError);
    });

    it('has correct name', () => {
      expect(new VendorEmailConflictError('a@b.com').name).toBe('VendorEmailConflictError');
    });

    it('includes email in message', () => {
      expect(new VendorEmailConflictError('a@b.com').message).toContain('a@b.com');
    });
  });

  describe('InvalidVendorStatusError', () => {
    it('extends ValidationError', () => {
      expect(new InvalidVendorStatusError('bad', ['a', 'b'])).toBeInstanceOf(ValidationError);
    });

    it('has correct name + 422 status', () => {
      const e = new InvalidVendorStatusError('bad', ['a', 'b']);
      expect(e.name).toBe('InvalidVendorStatusError');
      expect(e.httpStatus).toBe(422);
    });

    it('includes allowed values in message', () => {
      const e = new InvalidVendorStatusError('bad', ['pending', 'active']);
      expect(e.message).toContain('bad');
      expect(e.message).toContain('pending');
    });

    it('sets field to status', () => {
      expect(new InvalidVendorStatusError('bad', []).field).toBe('status');
    });
  });

  describe('InvalidVendorTypeError', () => {
    it('extends ValidationError', () => {
      expect(new InvalidVendorTypeError('bad', [])).toBeInstanceOf(ValidationError);
    });

    it('has correct name', () => {
      expect(new InvalidVendorTypeError('bad', []).name).toBe('InvalidVendorTypeError');
    });

    it('sets field to type', () => {
      expect(new InvalidVendorTypeError('bad', []).field).toBe('type');
    });
  });

  describe('InvalidVendorBusinessTypeError', () => {
    it('extends ValidationError', () => {
      expect(new InvalidVendorBusinessTypeError('bad', [])).toBeInstanceOf(ValidationError);
    });

    it('has correct name', () => {
      expect(new InvalidVendorBusinessTypeError('bad', []).name).toBe('InvalidVendorBusinessTypeError');
    });

    it('sets field to businessType', () => {
      expect(new InvalidVendorBusinessTypeError('bad', []).field).toBe('businessType');
    });
  });

  describe('InvalidVendorTierError', () => {
    it('extends ValidationError', () => {
      expect(new InvalidVendorTierError('bad', [])).toBeInstanceOf(ValidationError);
    });

    it('has correct name', () => {
      expect(new InvalidVendorTierError('bad', []).name).toBe('InvalidVendorTierError');
    });

    it('sets field to tier', () => {
      expect(new InvalidVendorTierError('bad', []).field).toBe('tier');
    });
  });

  describe('InvalidVendorStatusTransitionError', () => {
    it('extends BusinessRuleError', () => {
      const e = new InvalidVendorStatusTransitionError('pending', 'active');
      expect(e).toBeInstanceOf(BusinessRuleError);
    });

    it('has correct name', () => {
      expect(new InvalidVendorStatusTransitionError('pending', 'active').name).toBe(
        'InvalidVendorStatusTransitionError',
      );
    });

    it('has 400 status', () => {
      expect(new InvalidVendorStatusTransitionError('pending', 'active').httpStatus).toBe(400);
    });

    it('includes from/to in message', () => {
      const e = new InvalidVendorStatusTransitionError('pending', 'active');
      expect(e.message).toContain('pending');
      expect(e.message).toContain('active');
    });

    it('sets rule to INVALID_VENDOR_STATUS_TRANSITION', () => {
      expect(new InvalidVendorStatusTransitionError('a', 'b').rule).toBe(
        'INVALID_VENDOR_STATUS_TRANSITION',
      );
    });
  });

  describe('VendorNotApprovedError', () => {
    it('extends BusinessRuleError', () => {
      expect(new VendorNotApprovedError(UUID, 'pending')).toBeInstanceOf(BusinessRuleError);
    });

    it('has correct name + rule', () => {
      const e = new VendorNotApprovedError(UUID, 'pending');
      expect(e.name).toBe('VendorNotApprovedError');
      expect(e.rule).toBe('VENDOR_NOT_APPROVED');
    });

    it('includes vendorId in message', () => {
      expect(new VendorNotApprovedError(UUID, 'pending').message).toContain(UUID);
    });
  });

  describe('VendorSuspendedError', () => {
    it('extends BusinessRuleError', () => {
      expect(new VendorSuspendedError(UUID, 'policy')).toBeInstanceOf(BusinessRuleError);
    });

    it('has correct name + rule', () => {
      const e = new VendorSuspendedError(UUID, 'policy');
      expect(e.name).toBe('VendorSuspendedError');
      expect(e.rule).toBe('VENDOR_SUSPENDED');
    });

    it('includes reason in message when provided', () => {
      expect(new VendorSuspendedError(UUID, 'policy violation').message).toContain('policy violation');
    });

    it('works without reason', () => {
      expect(new VendorSuspendedError(UUID).message).toContain(UUID);
    });
  });

  describe('VendorInactiveError', () => {
    it('extends BusinessRuleError', () => {
      expect(new VendorInactiveError(UUID)).toBeInstanceOf(BusinessRuleError);
    });

    it('has correct name + rule', () => {
      const e = new VendorInactiveError(UUID);
      expect(e.name).toBe('VendorInactiveError');
      expect(e.rule).toBe('VENDOR_INACTIVE');
    });
  });

  describe('general properties', () => {
    it('all errors have unique codes', () => {
      const codes = new Set<string>();
      codes.add(new VendorNotFoundError(UUID).code);
      codes.add(new VendorAlreadyExistsError('email', 'x').code);
      expect(codes.size).toBeGreaterThanOrEqual(2);
    });

    it('all errors have toJSON', () => {
      const e = new VendorNotFoundError(UUID);
      expect(typeof e.toJSON).toBe('function');
      const json = e.toJSON();
      expect(json).toHaveProperty('name');
      expect(json).toHaveProperty('code');
      expect(json).toHaveProperty('httpStatus');
      expect(json).toHaveProperty('message');
    });

    it('all errors are instanceof Error', () => {
      expect(new VendorNotFoundError(UUID)).toBeInstanceOf(Error);
      expect(new VendorAlreadyExistsError('e', 'x')).toBeInstanceOf(Error);
      expect(new InvalidVendorStatusError('a', [])).toBeInstanceOf(Error);
    });
  });
});
