/**
 * ContactValidator
 */
import { AddContactRequestSchema } from '@vubon/shared-schemas/user';
import { REGEX } from '@vubon/shared-constants/common';
import type { AddContactRequestDTO } from '../dtos/requests/contact/index.js';

export interface ContactValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class ContactValidator {
  static validateAdd(input: unknown): ContactValidationResult<AddContactRequestDTO> {
    const result = AddContactRequestSchema.safeParse(input);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }
    return { success: true, data: result.data as AddContactRequestDTO };
  }

  static validateByType(
    type: string,
    value: string
  ): ContactValidationResult<{ type: string; value: string }> {
    if (type === 'email') {
      if (!REGEX.EMAIL.test(value)) {
        return { success: false, errors: [`value: invalid email "${value}"`] };
      }
    } else if (type === 'phone' || type === 'whatsapp') {
      if (!REGEX.PHONE_BD.test(value) && !REGEX.PHONE_INTL.test(value)) {
        return { success: false, errors: [`value: invalid phone "${value}"`] };
      }
    } else if (type === 'website') {
      if (!REGEX.URL.test(value)) {
        return { success: false, errors: [`value: invalid URL "${value}"`] };
      }
    } else if (value.trim().length < 2) {
      return { success: false, errors: ['value: too short'] };
    }
    return { success: true, data: { type, value } };
  }

  static assertValidAdd(input: unknown): AddContactRequestDTO {
    const result = ContactValidator.validateAdd(input);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid add contact input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }
}
