import { PushRequestSchema } from '../dtos/requests';

export class PushValidator {
  static validate(input: unknown) {
    return PushRequestSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return PushRequestSchema.safeParse(input);
  }
}
