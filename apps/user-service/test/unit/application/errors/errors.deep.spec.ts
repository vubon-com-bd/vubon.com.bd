/**
 * Application Errors — deep coverage (all constructor branches)
 */
import {
  UserCreationFailedError,
  UserUpdateFailedError,
  UserDeletionFailedError,
  UserNotFoundApplicationError,
  UserAlreadyExistsApplicationError,
} from '@application/errors/user.errors';
import {
  ProfileNotFoundApplicationError,
  ProfileUpdateFailedError,
} from '@application/errors/profile.errors';
import {
  AddressNotFoundApplicationError,
  AddressCreationFailedError,
  AddressUpdateFailedError,
  AddressDeletionFailedError,
  AddressLimitExceededError,
  InvalidAddressTypeError,
} from '@application/errors/address.errors';
import {
  ContactNotFoundApplicationError,
  ContactCreationFailedError,
  ContactUpdateFailedError,
  ContactVerificationFailedError,
  ContactAlreadyVerifiedError,
  ContactLimitExceededError,
} from '@application/errors/contact.errors';
import {
  PreferenceNotFoundApplicationError,
  PreferenceUpdateFailedError,
} from '@application/errors/preference.errors';
import {
  SettingsNotFoundApplicationError,
  SettingsUpdateFailedError,
} from '@application/errors/settings.errors';
import {
  KycNotFoundApplicationError,
  KycSubmissionFailedError,
  KycVerificationFailedError,
} from '@application/errors/kyc.errors';
import {
  ActivityNotFoundApplicationError,
  ActivityRecordFailedError,
} from '@application/errors/activity.errors';

describe('Application Errors — deep coverage', () => {
  describe('codes and statuses', () => {
    it('User errors have expected codes + status', () => {
      expect(new UserCreationFailedError('x').code).toBeDefined();
      expect(new UserUpdateFailedError('u', 'x').code).toBeDefined();
      expect(new UserDeletionFailedError('u', 'x').code).toBeDefined();
      expect(new UserNotFoundApplicationError('u').code).toBeDefined();
      expect(new UserAlreadyExistsApplicationError('e').code).toBeDefined();
    });

    it('Profile errors', () => {
      expect(new ProfileNotFoundApplicationError('u').httpStatus).toBe(404);
      expect(new ProfileUpdateFailedError('u', 'x').httpStatus).toBe(500);
    });

    it('Address errors all httpStatus', () => {
      expect(new AddressNotFoundApplicationError('a').httpStatus).toBe(404);
      expect(new AddressCreationFailedError('x').httpStatus).toBe(500);
      expect(new AddressUpdateFailedError('a', 'x').httpStatus).toBe(500);
      expect(new AddressDeletionFailedError('a', 'x').httpStatus).toBe(500);
      expect(new AddressLimitExceededError(10, 10).httpStatus).toBe(422);
      expect(new InvalidAddressTypeError('x', ['home']).httpStatus).toBe(422);
    });

    it('Contact errors all httpStatus', () => {
      expect(new ContactNotFoundApplicationError('c').httpStatus).toBe(404);
      expect(new ContactCreationFailedError('x').httpStatus).toBe(500);
      expect(new ContactUpdateFailedError('c', 'x').httpStatus).toBe(500);
      expect(new ContactVerificationFailedError('c', 'x').httpStatus).toBe(500);
      expect(new ContactAlreadyVerifiedError('c').httpStatus).toBe(409);
      expect(new ContactLimitExceededError(10, 10).httpStatus).toBe(422);
    });

    it('Preference errors', () => {
      expect(new PreferenceNotFoundApplicationError('u').httpStatus).toBe(404);
      expect(new PreferenceUpdateFailedError('u', 'x').httpStatus).toBe(500);
    });

    it('Settings errors', () => {
      expect(new SettingsNotFoundApplicationError('u').httpStatus).toBe(404);
      expect(new SettingsUpdateFailedError('u', 'x').httpStatus).toBe(500);
    });

    it('KYC errors', () => {
      expect(new KycNotFoundApplicationError('k').httpStatus).toBe(404);
      expect(new KycSubmissionFailedError('u', 'x').httpStatus).toBe(500);
      expect(new KycVerificationFailedError('k', 'x').httpStatus).toBe(500);
    });

    it('Activity errors', () => {
      expect(new ActivityNotFoundApplicationError('a').httpStatus).toBe(404);
      expect(new ActivityRecordFailedError('x').httpStatus).toBe(500);
    });
  });

  describe('toJSON serialization', () => {
    it('UserNotFound serializes to JSON', () => {
      const e = new UserNotFoundApplicationError('user-1');
      const json = e.toJSON();
      expect(json).toHaveProperty('code');
      expect(json).toHaveProperty('httpStatus');
      expect(json).toHaveProperty('message');
    });

    it('AddressLimitExceeded serializes with context', () => {
      const json = new AddressLimitExceededError(10, 10).toJSON();
      expect(json.context).toBeDefined();
    });

    it('InvalidAddressTypeError includes allowed values', () => {
      const e = new InvalidAddressTypeError('weird', ['home', 'work']);
      const json = e.toJSON();
      expect(JSON.stringify(json)).toContain('weird');
    });
  });

  describe('instanceof checks', () => {
    it('User errors are Errors', () => {
      expect(new UserNotFoundApplicationError('u')).toBeInstanceOf(Error);
      expect(new UserCreationFailedError('x')).toBeInstanceOf(Error);
    });

    it('All errors are Errors', () => {
      expect(new ProfileNotFoundApplicationError('u')).toBeInstanceOf(Error);
      expect(new AddressNotFoundApplicationError('a')).toBeInstanceOf(Error);
      expect(new ContactNotFoundApplicationError('c')).toBeInstanceOf(Error);
      expect(new PreferenceNotFoundApplicationError('u')).toBeInstanceOf(Error);
      expect(new SettingsNotFoundApplicationError('u')).toBeInstanceOf(Error);
      expect(new KycNotFoundApplicationError('k')).toBeInstanceOf(Error);
      expect(new ActivityNotFoundApplicationError('a')).toBeInstanceOf(Error);
    });
  });
});
