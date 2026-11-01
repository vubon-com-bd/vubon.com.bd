import {
  DeviceNotFoundApplicationError,
  DeviceValidationError,
  DeviceRegistrationError,
  DeviceUpdateError,
  DeviceLimitExceededApplicationError,
  DeviceTokenConflictError,
  DeviceQueryError,
} from '@application/errors/device.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Device application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new DeviceNotFoundApplicationError('d')).toBeInstanceOf(ApplicationError);
    expect(new DeviceValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new DeviceRegistrationError('r')).toBeInstanceOf(ApplicationError);
    expect(new DeviceUpdateError('d', 'u')).toBeInstanceOf(ApplicationError);
    expect(new DeviceLimitExceededApplicationError('u', 10)).toBeInstanceOf(ApplicationError);
    expect(new DeviceTokenConflictError('tok')).toBeInstanceOf(ApplicationError);
    expect(new DeviceQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('Limit 409', () => {
    expect(new DeviceLimitExceededApplicationError('u', 10).httpStatus).toBe(409);
  });

  it('Token conflict 409', () => {
    const e = new DeviceTokenConflictError('tokenlongerthan12');
    expect(e.httpStatus).toBe(409);
  });
});
