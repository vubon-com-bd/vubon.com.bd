import { DeliveryScheduleInputSchema } from '@vubon/shared-schemas/logistics';

export class DeliveryValidator {
  static validate(input: unknown) {
    return DeliveryScheduleInputSchema.parse(input);
  }
}
