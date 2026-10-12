import { VendorContactVO } from '../../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorEmailVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorPhoneVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorWebsiteVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeContact(): VendorContactVO {
  return VendorContactVO.create({
    email: VendorEmailVO.create('shop@acme.com'),
    phone: VendorPhoneVO.create('01712345678'),
    website: VendorWebsiteVO.create('https://acme.com'),
  });
}

describe('VendorContactVO', () => {
  describe('create()', () => {
    it('creates with email only', () => {
      const v = VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') });
      expect(v.email.value).toBe('a@b.com');
      expect(v.phone).toBeUndefined();
      expect(v.website).toBeUndefined();
    });

    it('creates with all fields', () => {
      const v = makeContact();
      expect(v.phone?.value).toBeDefined();
      expect(v.website?.value).toBeDefined();
    });

    it('throws on invalid email', () => {
      expect(() =>
        VendorContactVO.create({ email: 'bad' as never }),
      ).toThrow(ValidationError);
    });
  });

  describe('hasPhone / hasWebsite / isFullyComplete', () => {
    it('hasPhone true when set', () => {
      expect(makeContact().hasPhone()).toBe(true);
    });

    it('hasPhone false when not set', () => {
      const v = VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') });
      expect(v.hasPhone()).toBe(false);
    });

    it('hasWebsite true when set', () => {
      expect(makeContact().hasWebsite()).toBe(true);
    });

    it('isFullyComplete true when all set', () => {
      expect(makeContact().isFullyComplete()).toBe(true);
    });

    it('isFullyComplete false when missing phone', () => {
      const v = VendorContactVO.create({
        email: VendorEmailVO.create('a@b.com'),
        website: VendorWebsiteVO.create('https://acme.com'),
      });
      expect(v.isFullyComplete()).toBe(false);
    });
  });

  describe('withPhone / withWebsite', () => {
    it('withPhone returns new VO', () => {
      const a = VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') });
      const b = a.withPhone(VendorPhoneVO.create('01712345678'));
      expect(b.phone).toBeDefined();
      expect(a.phone).toBeUndefined();
    });

    it('withWebsite returns new VO', () => {
      const a = VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') });
      const b = a.withWebsite(VendorWebsiteVO.create('https://acme.com'));
      expect(b.website).toBeDefined();
    });
  });
});
