/**
 * AddressValidationService — BD address validation
 * @module identity-service/domain/services
 */
import { DIVISION, DISTRICT } from '@vubon/shared-constants/common';
import { USER_ADDRESS } from '@vubon/shared-constants/user';
import { REGEX } from '@vubon/shared-constants/common';

export interface AddressValidationCheckInput {
  readonly line1: string;
  readonly city: string;
  readonly division: string;
  readonly district: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface AddressValidationCheckResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export class AddressValidationService {
  static validate(input: AddressValidationCheckInput): AddressValidationCheckResult {
    const errors: string[] = [];

    if (input.line1.trim().length < USER_ADDRESS.LINE_MIN_LENGTH) {
      errors.push(`line1 must be at least ${USER_ADDRESS.LINE_MIN_LENGTH} chars`);
    }
    if (input.city.trim().length === 0) {
      errors.push('city is required');
    }
    if (input.country === 'BD') {
      if (!Object.values(DIVISION).includes(input.division as never)) {
        errors.push('invalid division');
      }
      if (!Object.values(DISTRICT).includes(input.district as never)) {
        errors.push('invalid district');
      }
      if (!REGEX.POSTAL_BD.test(input.postalCode)) {
        errors.push('postal code must be 4 digits for BD');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static isValid(input: AddressValidationCheckInput): boolean {
    return AddressValidationService.validate(input).valid;
  }

  static isBangladeshiDivision(division: string): boolean {
    return Object.values(DIVISION).includes(division as never);
  }
}
