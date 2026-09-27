/**
 * AddressValidator — BD-specific address validation
 *
 * NOTE: userId / addressId আসে URL params থেকে, তাই schema body-only validate করে।
 * Schema level এ postalCode optional (max 20 chars) — কিন্তু BD-তে 4 digits required।
 * তাই আমরা extra manual check যোগ করি।
 */
import {
  AddAddressRequestSchema,
  UpdateAddressRequestSchema,
} from '@vubon/shared-schemas/user';
import { USER_ADDRESS } from '@vubon/shared-constants/user';
import {
  DISTRICTS_BY_DIVISION,
  REGEX,
} from '@vubon/shared-constants/common';
import type {
  AddAddressRequestDTO,
  UpdateAddressRequestDTO,
} from '../dtos/requests/address/index';

export interface AddressValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

export class AddressValidator {
  /**
   * Canonical Division → District mapping.
   * Sourced from @vubon/shared-constants (all 64 districts).
   */
  private static readonly DISTRICT_BY_DIVISION: Readonly<
    Record<string, readonly string[]>
  > = DISTRICTS_BY_DIVISION as Record<string, readonly string[]>;

  private static validateBdPostalCode(
    code: unknown
  ): readonly string[] | null {
    if (code === undefined || code === null) return null; // optional
    if (typeof code !== 'string') {
      return ['postalCode: must be a string'];
    }
    if (!REGEX.POSTAL_BD.test(code)) {
      return [
        `postalCode: must be ${USER_ADDRESS.POSTAL_CODE_LENGTH} digits (BD format)`,
      ];
    }
    return null;
  }

  static validateAdd(
    body: unknown,
    userId: string
  ): AddressValidationResult<AddAddressRequestDTO> {
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return { success: false, errors: ['userId: required (from auth context)'] };
    }

    const result = AddAddressRequestSchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }

    const postalErrors = AddressValidator.validateBdPostalCode(
      result.data.postalCode
    );
    if (postalErrors) return { success: false, errors: postalErrors };

    return {
      success: true,
      data: { userId: userId.trim(), ...result.data } as AddAddressRequestDTO,
    };
  }

  static validateUpdate(
    body: unknown,
    userId: string,
    addressId: string
  ): AddressValidationResult<UpdateAddressRequestDTO> {
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return { success: false, errors: ['userId: required'] };
    }
    if (typeof addressId !== 'string' || addressId.trim().length === 0) {
      return { success: false, errors: ['addressId: required'] };
    }

    const result = UpdateAddressRequestSchema.safeParse(body);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      };
    }

    const postalErrors = AddressValidator.validateBdPostalCode(
      result.data.postalCode
    );
    if (postalErrors) return { success: false, errors: postalErrors };

    return {
      success: true,
      data: {
        userId: userId.trim(),
        addressId: addressId.trim(),
        ...result.data,
      } as UpdateAddressRequestDTO,
    };
  }

  static validateDivisionDistrictPair(
    division: string,
    district: string
  ): AddressValidationResult<{ division: string; district: string }> {
    const allowed = AddressValidator.DISTRICT_BY_DIVISION[division] ?? [];
    if (!allowed.includes(district)) {
      return {
        success: false,
        errors: [
          `district: "${district}" does not belong to division "${division}"`,
        ],
      };
    }
    return { success: true, data: { division, district } };
  }

  static validatePostalCode(code: string): AddressValidationResult<string> {
    if (!REGEX.POSTAL_BD.test(code)) {
      return {
        success: false,
        errors: [
          `postalCode: must be ${USER_ADDRESS.POSTAL_CODE_LENGTH} digits`,
        ],
      };
    }
    return { success: true, data: code };
  }

  static assertValidAdd(body: unknown, userId: string): AddAddressRequestDTO {
    const result = AddressValidator.validateAdd(body, userId);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid add address input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }

  static assertValidUpdate(
    body: unknown,
    userId: string,
    addressId: string
  ): UpdateAddressRequestDTO {
    const result = AddressValidator.validateUpdate(body, userId, addressId);
    if (!result.success || !result.data) {
      throw new Error(
        `Invalid update address input: ${(result.errors ?? []).join('; ')}`
      );
    }
    return result.data;
  }
}
