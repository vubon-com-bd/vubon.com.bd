import { VendorBusinessInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-business-info.vo.js';
import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { BusinessNameVO } from '../../../../../src/module/domain/value-objects/primitives/business-name.vo.js';
import { BusinessRegistrationVO } from '../../../../../src/module/domain/value-objects/primitives/business-registration.vo.js';
import { BusinessDescriptionVO } from '../../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeInfo(): VendorBusinessInfoVO {
  return VendorBusinessInfoVO.create({
    type: VendorTypeVO.create('limited_company'),
    businessType: VendorBusinessTypeVO.create('retailer'),
    legalName: BusinessNameVO.create('Acme Trading Ltd'),
    registrationNumber: BusinessRegistrationVO.create('REG-2024-001'),
    description: BusinessDescriptionVO.create('We sell widgets.'),
  });
}

describe('VendorBusinessInfoVO', () => {
  describe('create()', () => {
    it('creates with all fields', () => {
      const v = makeInfo();
      expect(v.type.value).toBe('limited_company');
      expect(v.legalName.value).toBe('Acme Trading Ltd');
    });

    it('throws when corporate type missing registration', () => {
      expect(() =>
        VendorBusinessInfoVO.create({
          type: VendorTypeVO.create('limited_company'),
          businessType: VendorBusinessTypeVO.create('retailer'),
          legalName: BusinessNameVO.create('Acme Ltd'),
        }),
      ).toThrow(ValidationError);
    });

    it('individual type does not require registration', () => {
      const v = VendorBusinessInfoVO.create({
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        legalName: BusinessNameVO.create('Acme'),
      });
      expect(v.registrationNumber).toBeUndefined();
    });
  });

  describe('helpers', () => {
    it('isCorporate', () => {
      expect(makeInfo().isCorporate()).toBe(true);
    });

    it('requiresInventory', () => {
      expect(makeInfo().requiresInventory()).toBe(true);
    });

    it('hasDescription', () => {
      expect(makeInfo().hasDescription()).toBe(true);
    });

    it('hasDescription false for missing', () => {
      const v = VendorBusinessInfoVO.create({
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('service_provider'),
        legalName: BusinessNameVO.create('Acme'),
      });
      expect(v.hasDescription()).toBe(false);
    });
  });
});
