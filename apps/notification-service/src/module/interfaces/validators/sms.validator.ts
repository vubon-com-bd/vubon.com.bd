import { SmsRequestSchema } from '../dtos/requests';

export class SmsValidator {
  static validate(input: unknown) {
    return SmsRequestSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return SmsRequestSchema.safeParse(input);
  }
}
