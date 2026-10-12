import { VendorBrandingVO } from '../../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLogoVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const LOGO_URL = 'https://cdn.example.com/logo.png';
const BANNER_URL = 'https://cdn.example.com/banner.jpg';

describe('VendorBrandingVO', () => {
  describe('create()', () => {
    it('creates with logo + banner', () => {
      const v = VendorBrandingVO.create({
        logo: VendorLogoVO.create(LOGO_URL),
        banner: VendorBannerVO.create(BANNER_URL),
      });
      expect(v.logo?.value).toBe(LOGO_URL);
      expect(v.banner?.value).toBe(BANNER_URL);
    });

    it('creates with only logo', () => {
      const v = VendorBrandingVO.create({ logo: VendorLogoVO.create(LOGO_URL) });
      expect(v.hasLogo()).toBe(true);
      expect(v.hasBanner()).toBe(false);
    });

    it('throws on invalid logo type', () => {
      expect(() =>
        VendorBrandingVO.create({ logo: 'bad' as never }),
      ).toThrow(ValidationError);
    });
  });

  describe('empty()', () => {
    it('creates with no logo or banner', () => {
      const v = VendorBrandingVO.empty();
      expect(v.hasLogo()).toBe(false);
      expect(v.hasBanner()).toBe(false);
    });
  });

  describe('isComplete / isBranded', () => {
    it('isComplete true with both', () => {
      const v = VendorBrandingVO.create({
        logo: VendorLogoVO.create(LOGO_URL),
        banner: VendorBannerVO.create(BANNER_URL),
      });
      expect(v.isComplete()).toBe(true);
    });

    it('isComplete false with only logo', () => {
      const v = VendorBrandingVO.create({ logo: VendorLogoVO.create(LOGO_URL) });
      expect(v.isComplete()).toBe(false);
    });

    it('isBranded true with logo', () => {
      const v = VendorBrandingVO.create({ logo: VendorLogoVO.create(LOGO_URL) });
      expect(v.isBranded()).toBe(true);
    });

    it('isBranded false without logo', () => {
      expect(VendorBrandingVO.empty().isBranded()).toBe(false);
    });
  });

  describe('withLogo / withBanner', () => {
    it('withLogo returns new VO', () => {
      const a = VendorBrandingVO.empty();
      const b = a.withLogo(VendorLogoVO.create(LOGO_URL));
      expect(b.hasLogo()).toBe(true);
      expect(a.hasLogo()).toBe(false);
    });

    it('withBanner returns new VO', () => {
      const a = VendorBrandingVO.empty();
      const b = a.withBanner(VendorBannerVO.create(BANNER_URL));
      expect(b.hasBanner()).toBe(true);
    });
  });
});
