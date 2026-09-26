import { DeliveryScheduleInputSchema } from '@vubon/shared-schemas/logistics';

export class DeliveryValidator {
  static validateSchedule(input: unknown) {
    return DeliveryScheduleInputSchema.parse(input);
  }
}
