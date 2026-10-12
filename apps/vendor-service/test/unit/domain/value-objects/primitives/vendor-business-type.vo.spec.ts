import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { InvalidVendorBusinessTypeError } from '../../../../../src/module/domain/errors/vendor.errors.js';

describe('VendorBusinessTypeVO', () => {
  it('creates retailer', () => {
    expect(VendorBusinessTypeVO.create('retailer').value).toBe('retailer');
  });

  it('throws on invalid type', () => {
    expect(() => VendorBusinessTypeVO.create('bogus')).toThrow(InvalidVendorBusinessTypeError);
  });

  describe('requiresInventory()', () => {
    it('true for retailer/wholesaler/manufacturer', () => {
      expect(VendorBusinessTypeVO.create('retailer').requiresInventory()).toBe(true);
      expect(VendorBusinessTypeVO.create('manufacturer').requiresInventory()).toBe(true);
      expect(VendorBusinessTypeVO.create('wholesaler').requiresInventory()).toBe(true);
    });

    it('false for service_provider', () => {
      expect(VendorBusinessTypeVO.create('service_provider').requiresInventory()).toBe(false);
    });
  });

  describe('requiresShipping()', () => {
    it('false for service_provider', () => {
      expect(VendorBusinessTypeVO.create('service_provider').requiresShipping()).toBe(false);
    });

    it('true for others', () => {
      expect(VendorBusinessTypeVO.create('retailer').requiresShipping()).toBe(true);
    });
  });

  describe('predicates', () => {
    it('isManufacturer', () => {
      expect(VendorBusinessTypeVO.create('manufacturer').isManufacturer()).toBe(true);
    });
    it('isDropshipper', () => {
      expect(VendorBusinessTypeVO.create('dropshipper').isDropshipper()).toBe(true);
    });
    it('isServiceProvider', () => {
      expect(VendorBusinessTypeVO.create('service_provider').isServiceProvider()).toBe(true);
    });
  });
});
