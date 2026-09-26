import { ReturnShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export class ReturnShipmentValidator {
  static validateCreate(input: unknown) {
    return ReturnShipmentCreateInputSchema.parse(input);
  }
}
