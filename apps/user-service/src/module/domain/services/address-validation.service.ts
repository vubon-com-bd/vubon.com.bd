import { DivisionVO } from '../value-objects/primitives/division.vo';
import { DistrictVO } from '../value-objects/primitives/district.vo';

export class AddressValidationService {
  static validateDistrictDivision(
    district: DistrictVO,
    _division: DivisionVO,
  ): boolean {
    // Basic validation — district and division must be non-empty
    return district.value.length > 0 && _division.value.length > 0;
  }
}
