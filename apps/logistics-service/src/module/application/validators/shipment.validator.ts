import { ShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export class ShipmentValidator {
  static validateCreate(input: unknown) {
    return ShipmentCreateInputSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return ShipmentCreateInputSchema.safeParse(input);
  }
}
