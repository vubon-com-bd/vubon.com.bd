/**
 * VendorContactVO — email, phone, and website
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorEmailVO } from '../primitives/vendor-email.vo.js';
import { VendorPhoneVO } from '../primitives/vendor-phone.vo.js';
import { VendorWebsiteVO } from '../primitives/vendor-website.vo.js';

export interface VendorContactVOProps {
  readonly email: VendorEmailVO;
  readonly phone?: VendorPhoneVO;
  readonly website?: VendorWebsiteVO;
}

export class VendorContactVO extends BaseVO<VendorContactVOProps> {
  private constructor(props: VendorContactVOProps) {
    super(props);
  }

  static create(props: VendorContactVOProps): VendorContactVO {
    if (!(props.email instanceof VendorEmailVO)) {
      throw new ValidationError('Contact requires a valid VendorEmailVO', 'email');
    }
    if (props.phone !== undefined && !(props.phone instanceof VendorPhoneVO)) {
      throw new ValidationError('Contact phone must be a VendorPhoneVO', 'phone');
    }
    if (props.website !== undefined && !(props.website instanceof VendorWebsiteVO)) {
      throw new ValidationError('Contact website must be a VendorWebsiteVO', 'website');
    }
    return new VendorContactVO(props);
  }

  static reconstitute(props: VendorContactVOProps): VendorContactVO {
    return new VendorContactVO(props);
  }

  get email(): VendorEmailVO { return this.value.email; }
  get phone(): VendorPhoneVO | undefined { return this.value.phone; }
  get website(): VendorWebsiteVO | undefined { return this.value.website; }

  hasPhone(): boolean {
    return this.value.phone !== undefined;
  }

  hasWebsite(): boolean {
    return this.value.website !== undefined;
  }

  isFullyComplete(): boolean {
    return this.hasPhone() && this.hasWebsite();
  }

  withPhone(phone: VendorPhoneVO): VendorContactVO {
    return new VendorContactVO({ ...this.value, phone });
  }

  withWebsite(website: VendorWebsiteVO): VendorContactVO {
    return new VendorContactVO({ ...this.value, website });
  }
}
