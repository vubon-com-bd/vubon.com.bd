import { CourierSchema } from '@vubon/shared-schemas/logistics';

export class CourierValidator {
  static validate(input: unknown) {
    return CourierSchema.parse(input);
  }
}
