/**
 * VendorBrandingVO — logo + banner storefront assets
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorLogoVO } from '../primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../primitives/vendor-banner.vo.js';

export interface VendorBrandingVOProps {
  readonly logo?: VendorLogoVO;
  readonly banner?: VendorBannerVO;
}

export class VendorBrandingVO extends BaseVO<VendorBrandingVOProps> {
  private constructor(props: VendorBrandingVOProps) {
    super(props);
  }

  static create(props: VendorBrandingVOProps): VendorBrandingVO {
    if (props.logo !== undefined && !(props.logo instanceof VendorLogoVO)) {
      throw new ValidationError('Branding logo must be a VendorLogoVO', 'logo');
    }
    if (props.banner !== undefined && !(props.banner instanceof VendorBannerVO)) {
      throw new ValidationError('Branding banner must be a VendorBannerVO', 'banner');
    }
    return new VendorBrandingVO(props);
  }

  static reconstitute(props: VendorBrandingVOProps): VendorBrandingVO {
    return new VendorBrandingVO(props);
  }

  static empty(): VendorBrandingVO {
    return new VendorBrandingVO({});
  }

  get logo(): VendorLogoVO | undefined { return this.value.logo; }
  get banner(): VendorBannerVO | undefined { return this.value.banner; }

  hasLogo(): boolean { return this.value.logo !== undefined; }
  hasBanner(): boolean { return this.value.banner !== undefined; }

  isComplete(): boolean {
    return this.hasLogo() && this.hasBanner();
  }

  isBranded(): boolean {
    return this.hasLogo();
  }

  withLogo(logo: VendorLogoVO): VendorBrandingVO {
    return new VendorBrandingVO({ ...this.value, logo });
  }

  withBanner(banner: VendorBannerVO): VendorBrandingVO {
    return new VendorBrandingVO({ ...this.value, banner });
  }
}
