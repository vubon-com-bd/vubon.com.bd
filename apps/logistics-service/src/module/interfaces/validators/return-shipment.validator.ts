import { ReturnShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export class ReturnShipmentValidator {
  static validate(input: unknown) {
    return ReturnShipmentCreateInputSchema.parse(input);
  }
}
