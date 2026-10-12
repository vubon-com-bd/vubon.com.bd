import { VendorPhoneVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-phone.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorPhoneVO', () => {
  describe('create()', () => {
    it('accepts BD local format', () => {
      expect(VendorPhoneVO.create('01712345678').value).toBeDefined();
    });

    it('accepts +880 format', () => {
      expect(VendorPhoneVO.create('+8801712345678').value).toBeDefined();
    });

    it('throws on invalid phone', () => {
      expect(() => VendorPhoneVO.create('not-phone')).toThrow(ValidationError);
    });
  });

  describe('isBangladeshi()', () => {
    it('true for local', () => {
      expect(VendorPhoneVO.create('01712345678').isBangladeshi()).toBe(true);
    });

    it('true for +880', () => {
      expect(VendorPhoneVO.create('+8801712345678').isBangladeshi()).toBe(true);
    });
  });

  describe('getDigits()', () => {
    it('strips non-digits', () => {
      expect(VendorPhoneVO.create('+8801712345678').getDigits()).toBe('8801712345678');
    });
  });
});
