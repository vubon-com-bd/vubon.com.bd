import { ScheduleDeliveryRequestSchema } from '../dtos/requests/delivery/schedule-delivery.dto';

export class DeliveryValidator {
  static validateSchedule(input: unknown) {
    return ScheduleDeliveryRequestSchema.parse(input);
  }
}
