import { EmailRequestSchema } from '../dtos/requests';

export class EmailValidator {
  static validate(input: unknown) {
    return EmailRequestSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return EmailRequestSchema.safeParse(input);
  }
}
