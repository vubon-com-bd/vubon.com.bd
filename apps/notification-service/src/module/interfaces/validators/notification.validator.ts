import { NotificationRequestSchema } from '../dtos/requests';

export class NotificationValidator {
  static validate(input: unknown) {
    return NotificationRequestSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return NotificationRequestSchema.safeParse(input);
  }
}
