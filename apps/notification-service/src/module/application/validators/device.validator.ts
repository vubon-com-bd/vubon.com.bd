import { RegisterDeviceSchema, UpdateDeviceTokenSchema } from '../dtos/requests/device';

export class DeviceValidator {
  static validateRegister(input: unknown) {
    return RegisterDeviceSchema.parse(input);
  }

  static validateUpdateToken(input: unknown) {
    return UpdateDeviceTokenSchema.parse(input);
  }
}
