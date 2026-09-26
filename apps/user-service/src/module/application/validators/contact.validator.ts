import { AddContactRequestSchema } from '@vubon/shared-schemas/user';

export class ContactValidator {
  static validateAdd(input: unknown) {
    return AddContactRequestSchema.parse(input);
  }
}
