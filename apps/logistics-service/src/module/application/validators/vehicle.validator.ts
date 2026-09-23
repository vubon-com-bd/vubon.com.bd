import { VehicleSchema } from '@vubon/shared-schemas/logistics';

export class VehicleValidator {
  static validate(input: unknown) {
    return VehicleSchema.parse(input);
  }
}
