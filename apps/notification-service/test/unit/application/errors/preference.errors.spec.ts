import {
  PreferenceNotFoundApplicationError,
  PreferenceValidationError,
  PreferenceUpdateError,
  PreferenceLockedApplicationError,
  PreferenceQueryError,
} from '@application/errors/preference.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Preference application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new PreferenceNotFoundApplicationError('u')).toBeInstanceOf(ApplicationError);
    expect(new PreferenceValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new PreferenceUpdateError('u', 'y')).toBeInstanceOf(ApplicationError);
    expect(new PreferenceLockedApplicationError('u')).toBeInstanceOf(ApplicationError);
    expect(new PreferenceQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('Locked 409', () => {
    expect(new PreferenceLockedApplicationError('u').httpStatus).toBe(409);
  });
});
