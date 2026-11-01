/**
 * AddressValidatorService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface AddressValidationInput {
  readonly country: string;
  readonly division?: string;
  readonly district?: string;
  readonly city: string;
  readonly postalCode: string;
  readonly addressLine1: string;
}

export class AddressValidatorService {
  private static readonly VALID_BD_DIVISIONS = [
    'dhaka', 'chittagong', 'rajshahi', 'khulna', 'barisal', 'sylhet', 'rangpur', 'mymensingh',
  ];

  static validate(input: AddressValidationInput): readonly string[] {
    const reasons: string[] = [];

    if (!input.country || input.country.length < 2) {
      reasons.push('invalid_country');
    }

    if (input.country === 'BD') {
      if (!input.division) {
        reasons.push('missing_division');
      } else if (!this.VALID_BD_DIVISIONS.includes(input.division.toLowerCase())) {
        reasons.push('invalid_division');
      }
      if (!input.district) {
        reasons.push('missing_district');
      }
      if (input.postalCode && !/^\d{4}$/.test(input.postalCode)) {
        reasons.push('invalid_postal_code_bd');
      }
    }

    if (!input.addressLine1 || input.addressLine1.trim().length < 3) {
      reasons.push('invalid_address_line');
    }

    if (!input.city || input.city.trim().length < 2) {
      reasons.push('invalid_city');
    }

    return reasons;
  }

  static assertValid(input: AddressValidationInput): void {
    const reasons = this.validate(input);
    if (reasons.length > 0) {
      throw new BusinessRuleError(
        `Invalid address: ${reasons.join(', ')}`,
        'ADDRESS_INVALID',
        { reasons },
      );
    }
  }

  static isBangladeshiDivision(division: string): boolean {
    return this.VALID_BD_DIVISIONS.includes(division.toLowerCase());
  }
}
