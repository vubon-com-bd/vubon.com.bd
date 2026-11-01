/**
 * ContactValidationService
 * @module identity-service/domain/services
 */
import { REGEX } from '@vubon/shared-constants/common';
import { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';

export interface ContactValidationInput {
  readonly type: string;
  readonly value: string;
}

export interface ContactValidationResult {
  readonly valid: boolean;
  readonly reason?: string;
}

export class ContactValidationService {
  static validate(input: ContactValidationInput): ContactValidationResult {
    if (!input.value || input.value.trim().length === 0) {
      return { valid: false, reason: 'value is required' };
    }

    switch (input.type) {
      case USER_CONTACT_TYPE.EMAIL:
        if (!REGEX.EMAIL.test(input.value)) {
          return { valid: false, reason: 'invalid email format' };
        }
        return { valid: true };

      case USER_CONTACT_TYPE.PHONE:
      case USER_CONTACT_TYPE.WHATSAPP:
        if (!REGEX.PHONE_BD.test(input.value) && !REGEX.PHONE_INTL.test(input.value)) {
          return { valid: false, reason: 'invalid phone format' };
        }
        return { valid: true };

      case USER_CONTACT_TYPE.WEBSITE:
        if (!REGEX.URL.test(input.value)) {
          return { valid: false, reason: 'invalid website URL' };
        }
        return { valid: true };

      default:
        return { valid: true };
    }
  }

  static isValid(input: ContactValidationInput): boolean {
    return ContactValidationService.validate(input).valid;
  }
}
