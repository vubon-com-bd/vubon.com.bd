/**
 * AddressValidationService — Domain Service
 * @module user-service/domain/services
 *
 * BD-specific address validation:
 *  - Division/District match (uses canonical DISTRICTS_BY_DIVISION)
 *  - Postal code format
 *  - Address line length
 */
import {
  DISTRICTS_BY_DIVISION,
} from '@vubon/shared-constants/common';
import { DivisionVO } from '../value-objects/primitives/division.vo';
import { DistrictVO } from '../value-objects/primitives/district.vo';
import { PostalCodeVO } from '../value-objects/primitives/postal-code.vo';
import { AddressLineVO } from '../value-objects/primitives/address-line.vo';
import { CityVO } from '../value-objects/primitives/city.vo';
import { DistrictDivisionMismatchError } from '../errors/address.errors';

export class AddressValidationService {
  /**
   * Canonical Division → District mapping.
   * Sourced from @vubon/shared-constants (all 64 districts).
   */
  private static readonly DISTRICT_BY_DIVISION: Readonly<
    Record<string, readonly string[]>
  > = DISTRICTS_BY_DIVISION as Record<string, readonly string[]>;

  static validateDivisionDistrictMatch(
    division: DivisionVO,
    district: DistrictVO
  ): void {
    const allowed =
      AddressValidationService.DISTRICT_BY_DIVISION[division.value] ?? [];

    if (!allowed.includes(district.value)) {
      throw new DistrictDivisionMismatchError(district.value, division.value);
    }
  }

  static validateAll(params: {
    division: DivisionVO;
    district: DistrictVO;
    postalCode: PostalCodeVO;
    line: AddressLineVO;
    city: CityVO;
  }): void {
    AddressValidationService.validateDivisionDistrictMatch(
      params.division,
      params.district
    );

    // Additional BD-specific checks
    if (params.line.value.length < 3) {
      throw new Error('Address line too short');
    }
    if (params.city.value.length < 2) {
      throw new Error('City name too short');
    }
  }

  static districtsForDivision(divisionValue: string): readonly string[] {
    return AddressValidationService.DISTRICT_BY_DIVISION[divisionValue] ?? [];
  }
}
