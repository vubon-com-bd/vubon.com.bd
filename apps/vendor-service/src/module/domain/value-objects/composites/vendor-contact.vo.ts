/**
 * VendorContactVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর একটি যোগাযোগ (contact) channel।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ContactIdVO } from '../primitives/contact-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { ContactTypeVO } from '../primitives/contact-type.vo.js';
import { ContactValueVO } from '../primitives/contact-value.vo.js';

export interface VendorContactVOProps {
  readonly id: ContactIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: ContactTypeVO;
  readonly contactValue: ContactValueVO;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly verifiedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorContactVO extends BaseVO<VendorContactVOProps> {
  private constructor(props: VendorContactVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorContactVOProps): VendorContactVO {
    const vo = new VendorContactVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorContactVOProps): VendorContactVO {
    return new VendorContactVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.type.isEmail() && !v.contactValue.isEmail()) {
      throw new ValidationError('Contact value must be a valid email', 'value');
    }
    if (v.type.isPhone() && !v.contactValue.isPhoneBD() && !v.contactValue.isPhoneIntl()) {
      throw new ValidationError('Contact value must be a valid phone', 'value');
    }
    if (v.type.isWebsite() && !v.contactValue.isUrl()) {
      throw new ValidationError('Contact value must be a valid URL', 'value');
    }
    if (v.type.isSocial() && !v.contactValue.isUrl() && !v.contactValue.isUsername()) {
      throw new ValidationError('Social contact must be a URL or username', 'value');
    }

    if (v.label && v.label.length > 50) {
      throw new ValidationError('Contact label max 50 chars', 'label');
    }

    if (v.isVerified && !v.verifiedAt) {
      throw new ValidationError('Verified contact must have verifiedAt', 'verifiedAt');
    }
    if (!v.isVerified && v.verifiedAt) {
      throw new ValidationError('Unverified contact cannot have verifiedAt', 'verifiedAt');
    }
    if (v.isVerified && !v.type.isVerifiable()) {
      throw new ValidationError('Only verifiable contact types can be verified', 'type');
    }
  }

  // ─── Getters ───
  get id(): ContactIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): ContactTypeVO { return this.value.type; }
  get contactValue(): ContactValueVO { return this.value.contactValue; }
  get label(): string | undefined { return this.value.label; }
  get isPrimary(): boolean { return this.value.isPrimary; }
  get isVerified(): boolean { return this.value.isVerified; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isEmail(): boolean { return this.type.isEmail(); }
  isPhone(): boolean { return this.type.isPhone(); }
  isWhatsapp(): boolean { return this.type.isWhatsapp(); }
  isWebsite(): boolean { return this.type.isWebsite(); }
  isSocial(): boolean { return this.type.isSocial(); }
  isPublic(): boolean { return this.type.isPublic(); }

  hasLabel(): boolean { return this.label !== undefined; }

  /** Can be verified via OTP/callback */
  canBeVerified(): boolean {
    return this.type.isVerifiable() && !this.isVerified;
  }

  /** Needs re-verification (> 1 year old) */
  needsReverification(): boolean {
    if (!this.isVerified || !this.verifiedAt) return false;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return new Date(this.verifiedAt) < oneYearAgo;
  }

  /** Masked value for logs */
  maskedValue(): string {
    return this.contactValue.masked();
  }
}
