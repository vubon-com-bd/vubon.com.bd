/**
 * AddressValidationService Unit Test
 */
import { AddressValidationService } from '@domain/services/address-validation.service';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';

describe('AddressValidationService', () => {
  describe('validateDivisionDistrictMatch', () => {
    it('should pass when district belongs to division', () => {
      expect(() =>
        AddressValidationService.validateDivisionDistrictMatch(
          DivisionVO.create('dhaka'),
          DistrictVO.create('dhaka')
        )
      ).not.toThrow();
    });

    it('should throw when district does not belong', () => {
      expect(() =>
        AddressValidationService.validateDivisionDistrictMatch(
          DivisionVO.create('sylhet'),
          DistrictVO.create('dhaka')
        )
      ).toThrow('does not belong');
    });
  });

  describe('districtsForDivision', () => {
    it('should return list of districts', () => {
      const districts = AddressValidationService.districtsForDivision('dhaka');
      expect(districts.length).toBeGreaterThan(0);
      expect(districts).toContain('dhaka');
    });

    it('should return empty for unknown division', () => {
      expect(AddressValidationService.districtsForDivision('unknown')).toEqual([]);
    });
  });

  describe('validateAll', () => {
    it('should pass valid data', () => {
      expect(() =>
        AddressValidationService.validateAll({
          division: DivisionVO.create('dhaka'),
          district: DistrictVO.create('dhaka'),
          postalCode: PostalCodeVO.create('1200'),
          line: AddressLineVO.create('123 Main Street'),
          city: CityVO.create('Dhaka'),
        })
      ).not.toThrow();
    });
  });
});
