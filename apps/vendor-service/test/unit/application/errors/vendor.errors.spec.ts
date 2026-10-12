/**
 * Application vendor errors — unit tests
 * @module vendor-service/test/unit/application/errors
 */
import {
  VendorAlreadyExistsError,
  VendorRegistrationFailedError,
  VendorUpdateFailedError,
  VendorSlugUnavailableError,
  VendorActivationFailedError,
  VendorOnboardingIncompleteError,
  VendorNotActiveError,
  VendorNotFoundError,
} from '../../../../src/module/application/errors/vendor.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Application vendor errors', () => {
  describe('VendorAlreadyExistsError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorAlreadyExistsError()).toBeInstanceOf(ApplicationError);
    });

    it('has 409 status', () => {
      expect(new VendorAlreadyExistsError().httpStatus).toBe(409);
    });

    it('includes ownerId in message when provided', () => {
      expect(new VendorAlreadyExistsError('user-1').message).toContain('user-1');
    });

    it('falls back without ownerId', () => {
      expect(new VendorAlreadyExistsError().message).toBe('Vendor already exists');
    });

    it('has correct name', () => {
      expect(new VendorAlreadyExistsError().name).toBe('VendorAlreadyExistsError');
    });
  });

  describe('VendorRegistrationFailedError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorRegistrationFailedError('reason')).toBeInstanceOf(ApplicationError);
    });

    it('has 400 status', () => {
      expect(new VendorRegistrationFailedError('reason').httpStatus).toBe(400);
    });

    it('includes reason in message', () => {
      expect(new VendorRegistrationFailedError('invalid email').message).toContain('invalid email');
    });
  });

  describe('VendorUpdateFailedError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorUpdateFailedError('x')).toBeInstanceOf(ApplicationError);
    });

    it('has correct status + name', () => {
      const e = new VendorUpdateFailedError('x');
      expect(e.httpStatus).toBe(400);
      expect(e.name).toBe('VendorUpdateFailedError');
    });
  });

  describe('VendorSlugUnavailableError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorSlugUnavailableError('acme')).toBeInstanceOf(ApplicationError);
    });

    it('has 409 status', () => {
      expect(new VendorSlugUnavailableError('acme').httpStatus).toBe(409);
    });

    it('includes slug in message', () => {
      expect(new VendorSlugUnavailableError('acme').message).toContain('acme');
    });
  });

  describe('VendorActivationFailedError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorActivationFailedError('x')).toBeInstanceOf(ApplicationError);
    });

    it('has 400 status + correct name', () => {
      const e = new VendorActivationFailedError('x');
      expect(e.httpStatus).toBe(400);
      expect(e.name).toBe('VendorActivationFailedError');
    });
  });

  describe('VendorOnboardingIncompleteError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorOnboardingIncompleteError(['step1'])).toBeInstanceOf(ApplicationError);
    });

    it('has 422 status', () => {
      expect(new VendorOnboardingIncompleteError(['x']).httpStatus).toBe(422);
    });

    it('lists missing steps in message', () => {
      const e = new VendorOnboardingIncompleteError(['step1', 'step2']);
      expect(e.message).toContain('step1');
      expect(e.message).toContain('step2');
    });

    it('has correct name', () => {
      expect(new VendorOnboardingIncompleteError(['x']).name).toBe(
        'VendorOnboardingIncompleteError',
      );
    });
  });

  describe('VendorNotActiveError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorNotActiveError('v-1')).toBeInstanceOf(ApplicationError);
    });

    it('has 403 status', () => {
      expect(new VendorNotActiveError('v-1').httpStatus).toBe(403);
    });

    it('includes vendorId in message', () => {
      expect(new VendorNotActiveError('v-1').message).toContain('v-1');
    });
  });

  describe('VendorNotFoundError', () => {
    it('extends ApplicationError', () => {
      expect(new VendorNotFoundError('v-1')).toBeInstanceOf(ApplicationError);
    });

    it('has 404 status', () => {
      expect(new VendorNotFoundError('v-1').httpStatus).toBe(404);
    });

    it('includes vendorId in message', () => {
      expect(new VendorNotFoundError('v-1').message).toContain('v-1');
    });
  });

  describe('general properties', () => {
    it('all errors have code + httpStatus', () => {
      const errors = [
        new VendorAlreadyExistsError(),
        new VendorRegistrationFailedError('x'),
        new VendorSlugUnavailableError('x'),
        new VendorNotActiveError('v'),
        new VendorNotFoundError('v'),
      ];
      for (const e of errors) {
        expect(typeof e.code).toBe('string');
        expect(typeof e.httpStatus).toBe('number');
      }
    });

    it('all errors have toJSON', () => {
      const json = new VendorNotFoundError('v-1').toJSON();
      expect(json).toHaveProperty('name');
      expect(json).toHaveProperty('code');
      expect(json).toHaveProperty('httpStatus');
      expect(json).toHaveProperty('message');
    });

    it('all errors are instanceof Error', () => {
      expect(new VendorNotFoundError('v')).toBeInstanceOf(Error);
      expect(new VendorAlreadyExistsError()).toBeInstanceOf(Error);
    });
  });
});
