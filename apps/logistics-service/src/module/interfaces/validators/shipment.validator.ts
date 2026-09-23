import { ShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export class ShipmentValidator {
  static validate(input: unknown) {
    return ShipmentCreateInputSchema.parse(input);
  }
}
