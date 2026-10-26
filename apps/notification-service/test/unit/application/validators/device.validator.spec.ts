import { DeviceValidator } from '@application/validators/device.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { DEVICE_DTO } from '@application-fixtures/dtos.fixture.js';

describe('DeviceValidator', () => {
  it('validateRegister accepts valid', () => {
    expect(() => DeviceValidator.validateRegister(DEVICE_DTO.register)).not.toThrow();
  });

  it('validateRegister rejects empty', () => {
    expect(() => DeviceValidator.validateRegister({})).toThrow(ApplicationValidationError);
  });

  it('validateRegister rejects missing token', () => {
    expect(() =>
      DeviceValidator.validateRegister({ ...DEVICE_DTO.register, token: '' }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateRegister rejects invalid userId UUID', () => {
    expect(() =>
      DeviceValidator.validateRegister({ ...DEVICE_DTO.register, userId: 'not-uuid' }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateUpdateToken accepts valid', () => {
    expect(() => DeviceValidator.validateUpdateToken(DEVICE_DTO.updateToken)).not.toThrow();
  });

  it('validateUpdateToken rejects empty newToken', () => {
    expect(() =>
      DeviceValidator.validateUpdateToken({ ...DEVICE_DTO.updateToken, newToken: '' }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateUpdateToken rejects invalid deviceId UUID', () => {
    expect(() =>
      DeviceValidator.validateUpdateToken({ ...DEVICE_DTO.updateToken, deviceId: 'not-uuid' }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateUnregister accepts valid', () => {
    expect(() => DeviceValidator.validateUnregister(DEVICE_DTO.unregister)).not.toThrow();
  });

  it('validateUnregister rejects bad UUID', () => {
    expect(() => DeviceValidator.validateUnregister({ deviceId: 'not-uuid' }))
      .toThrow(ApplicationValidationError);
  });

  it('non-Zod error rethrown', () => {
    expect(() => DeviceValidator.validateRegister(null)).toThrow();
  });
});
