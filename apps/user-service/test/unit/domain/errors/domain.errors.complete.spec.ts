/**
 * Domain Errors — full coverage
 */
import {
  UserNotFoundError,
  UserAlreadyExistsError,
  InvalidUserStatusError,
  UserSuspendedError,
  UserDeletedError,
} from '@domain/errors/user.errors';
import {
  ProfileNotFoundError,
  ProfileIncompleteError,
  InvalidVisibilityError,
  AvatarTooLargeError,
  BioTooLongError,
} from '@domain/errors/profile.errors';
import {
  AddressNotFoundError,
  AddressLimitExceededError,
  InvalidPostalCodeError,
  DistrictDivisionMismatchError,
  InvalidDivisionError,
  InvalidDistrictError,
} from '@domain/errors/address.errors';
import {
  ContactNotFoundError,
  ContactLimitExceededError,
  InvalidContactValueError,
  ContactAlreadyVerifiedError,
} from '@domain/errors/contact.errors';
import {
  PreferenceNotFoundError,
  InvalidPreferenceError,
} from '@domain/errors/preference.errors';
import {
  KycNotFoundError,
  KycExpiredError,
  KycNotAllowedError,
  InvalidKycDocumentError,
} from '@domain/errors/kyc.errors';
import {
  SettingsNotFoundError,
  InvalidSettingError,
} from '@domain/errors/settings.errors';
import {
  ActivityNotFoundError,
  ActivityLimitExceededError,
  InvalidActivityTypeError,
} from '@domain/errors/activity.errors';

describe('Domain Errors — complete coverage', () => {
  it('user.errors', () => {
    expect(new UserNotFoundError('u-1').httpStatus).toBe(404);
    expect(new UserAlreadyExistsError('a@b.com').httpStatus).toBe(409);
    expect(new InvalidUserStatusError('a', 'b').code).toBeDefined();
    expect(new UserSuspendedError('u-1').code).toBeDefined();
    expect(new UserSuspendedError('u-1', 'reason').message).toContain('reason');
    expect(new UserDeletedError('u-1').message).toContain('u-1');
  });

  it('profile.errors', () => {
    expect(new ProfileNotFoundError('u-1').httpStatus).toBe(404);
    expect(new ProfileIncompleteError(['a']).message).toContain('a');
    expect(new InvalidVisibilityError('x', ['public']).message).toContain('x');
    expect(new AvatarTooLargeError(10, 5).message).toContain('10');
    expect(new BioTooLongError(600, 500).message).toContain('600');
  });

  it('address.errors', () => {
    expect(new AddressNotFoundError('a-1').httpStatus).toBe(404);
    expect(new AddressLimitExceededError(5, 10).message).toContain('5');
    expect(new InvalidPostalCodeError('abc').message).toContain('abc');
    expect(new DistrictDivisionMismatchError('d', 's').message).toContain('d');
    expect(new InvalidDivisionError('x', ['dhaka']).message).toContain('x');
    expect(new InvalidDistrictError('x', ['dhaka']).message).toContain('x');
  });

  it('contact.errors', () => {
    expect(new ContactNotFoundError('c-1').httpStatus).toBe(404);
    expect(new ContactLimitExceededError(5, 10).message).toContain('5');
    expect(new InvalidContactValueError('email', 'bad').message).toContain('bad');
    expect(new ContactAlreadyVerifiedError('c-1').message).toContain('c-1');
  });

  it('preference.errors', () => {
    expect(new PreferenceNotFoundError('u-1').httpStatus).toBe(404);
    expect(new InvalidPreferenceError('newsletter', 'bad').message).toContain('newsletter');
  });

  it('kyc.errors', () => {
    expect(new KycNotFoundError('k-1').httpStatus).toBe(404);
    expect(new KycExpiredError('k-1').message).toContain('k-1');
    expect(new KycNotAllowedError('r').message).toContain('r');
    expect(new InvalidKycDocumentError('x', ['nid']).message).toContain('x');
  });

  it('settings.errors', () => {
    expect(new SettingsNotFoundError('u-1').httpStatus).toBe(404);
    expect(new InvalidSettingError('theme', 'bad').message).toContain('theme');
  });

  it('activity.errors', () => {
    expect(new ActivityNotFoundError('a-1').httpStatus).toBe(404);
    expect(new ActivityLimitExceededError(100, 100).message).toContain('100');
    expect(new InvalidActivityTypeError('x', ['login']).message).toContain('x');
  });
});
