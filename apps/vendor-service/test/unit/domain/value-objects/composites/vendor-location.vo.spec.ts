import { VendorLocationVO } from '../../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { PostalCodeVO } from '../../../../../src/module/domain/value-objects/primitives/postal-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeLocation(): VendorLocationVO {
  return VendorLocationVO.create({
    address: VendorAddressVO.create({
      line1: '123 Main Street',
      upazila: 'Savar',
      district: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1340',
      country: 'BD',
    }),
    division: VendorDivisionVO.create('Dhaka'),
    district: VendorDistrictVO.create('Dhaka'),
    upazila: VendorUpazilaVO.create('Savar'),
    postalCode: PostalCodeVO.create('1340'),
  });
}

describe('VendorLocationVO', () => {
  describe('create()', () => {
    it('creates valid location', () => {
      const v = makeLocation();
      expect(v.division.value).toBe('Dhaka');
      expect(v.district.value).toBe('Dhaka');
    });

    it('throws when address.division mismatches top-level division', () => {
      expect(() =>
        VendorLocationVO.create({
          address: VendorAddressVO.create({
            line1: '123 Main Street',
            upazila: 'Savar',
            district: 'Dhaka',
            division: 'Sylhet',
            country: 'BD',
          }),
          division: VendorDivisionVO.create('Dhaka'),
          district: VendorDistrictVO.create('Dhaka'),
          upazila: VendorUpazilaVO.create('Savar'),
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('helpers', () => {
    it('isBangladeshi', () => {
      expect(makeLocation().isBangladeshi()).toBe(true);
    });

    it('hasPostalCode', () => {
      expect(makeLocation().hasPostalCode()).toBe(true);
    });

    it('hasPostalCode false when missing', () => {
      const v = VendorLocationVO.create({
        address: VendorAddressVO.create({
          line1: '123 Main Street',
          upazila: 'Savar',
          district: 'Dhaka',
          division: 'Dhaka',
          country: 'BD',
        }),
        division: VendorDivisionVO.create('Dhaka'),
        district: VendorDistrictVO.create('Dhaka'),
        upazila: VendorUpazilaVO.create('Savar'),
      });
      expect(v.hasPostalCode()).toBe(false);
    });

    it('oneLine returns formatted address', () => {
      expect(makeLocation().oneLine()).toContain('Dhaka');
    });
  });

  describe('isInSameRegionAs()', () => {
    it('true for same district + upazila', () => {
      const a = makeLocation();
      const b = makeLocation();
      expect(a.isInSameRegionAs(b)).toBe(true);
    });

    it('false for different district', () => {
      const a = makeLocation();
      const b = VendorLocationVO.create({
        address: VendorAddressVO.create({
          line1: '123 Main Street',
          upazila: 'Savar',
          district: 'Sylhet',
          division: 'Sylhet',
          country: 'BD',
        }),
        division: VendorDivisionVO.create('Sylhet'),
        district: VendorDistrictVO.create('Sylhet'),
        upazila: VendorUpazilaVO.create('Savar'),
      });
      expect(a.isInSameRegionAs(b)).toBe(false);
    });
  });
});
