import { CreateScheduleSchema, UpdateScheduleSchema } from '../dtos/requests/schedule';

export class ScheduleValidator {
  static validateCreate(input: unknown) {
    return CreateScheduleSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateScheduleSchema.parse(input);
  }
}
