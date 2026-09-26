import { DriverSchema } from '@vubon/shared-schemas/logistics';

export class DriverValidator {
  static validate(input: unknown) {
    return DriverSchema.parse(input);
  }
}
