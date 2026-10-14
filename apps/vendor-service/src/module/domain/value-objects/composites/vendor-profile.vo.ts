/**
 * VendorProfileVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর public profile data — UI-facing।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { VendorNameVO } from '../primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../primitives/vendor-slug.vo.js';
import { BusinessDescriptionVO } from '../primitives/business-description.vo.js';
import { RatingValueVO } from '../primitives/rating-value.vo.js';

export interface VendorProfileVOProps {
  readonly vendorId: VendorIdVO;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly displayName: string;
  readonly tagline?: string;
  readonly description?: BusinessDescriptionVO;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly socialLinks: readonly string[];
  readonly rating: RatingValueVO;
  readonly reviewCount: number;
  readonly isFeatured: boolean;
  readonly isVerified: boolean;
}

export class VendorProfileVO extends BaseVO<VendorProfileVOProps> {
  private constructor(props: VendorProfileVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorProfileVOProps): VendorProfileVO {
    const vo = new VendorProfileVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorProfileVOProps): VendorProfileVO {
    return new VendorProfileVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.tagline && v.tagline.length > 160) {
      throw new ValidationError('VendorProfile tagline max 160 chars', 'tagline');
    }
    if (v.website && !REGEX.URL.test(v.website)) {
      throw new ValidationError('VendorProfile website must be a valid URL', 'website');
    }
    if (v.logoUrl && !REGEX.URL.test(v.logoUrl)) {
      throw new ValidationError('VendorProfile logoUrl must be a valid URL', 'logoUrl');
    }
    if (v.bannerUrl && !REGEX.URL.test(v.bannerUrl)) {
      throw new ValidationError('VendorProfile bannerUrl must be a valid URL', 'bannerUrl');
    }
    if (!Number.isInteger(v.reviewCount) || v.reviewCount < 0) {
      throw new ValidationError('VendorProfile reviewCount must be non-negative', 'reviewCount');
    }
    if (v.socialLinks.length > 10) {
      throw new ValidationError('VendorProfile cannot have more than 10 social links', 'socialLinks');
    }
    for (const link of v.socialLinks) {
      if (!REGEX.URL.test(link)) {
        throw new ValidationError(`Invalid social link: ${link}`, 'socialLinks');
      }
    }
  }

  // Getters
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get name(): VendorNameVO { return this.value.name; }
  get slug(): VendorSlugVO { return this.value.slug; }
  get displayName(): string { return this.value.displayName; }
  get tagline(): string | undefined { return this.value.tagline; }
  get description(): BusinessDescriptionVO | undefined { return this.value.description; }
  get logoUrl(): string | undefined { return this.value.logoUrl; }
  get bannerUrl(): string | undefined { return this.value.bannerUrl; }
  get website(): string | undefined { return this.value.website; }
  get socialLinks(): readonly string[] { return this.value.socialLinks; }
  get rating(): RatingValueVO { return this.value.rating; }
  get reviewCount(): number { return this.value.reviewCount; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get isVerified(): boolean { return this.value.isVerified; }

  // Predicates
  hasTagline(): boolean { return this.tagline !== undefined; }
  hasLogo(): boolean { return this.logoUrl !== undefined; }
  hasBanner(): boolean { return this.bannerUrl !== undefined; }
  hasSocialLinks(): boolean { return this.socialLinks.length > 0; }
  hasDescription(): boolean { return this.description !== undefined; }

  /** Profile complete enough for public display */
  isComplete(): boolean {
    return (
      this.hasLogo() &&
      this.hasDescription() &&
      this.isVerified
    );
  }

  /** Rating should be shown publicly */
  shouldShowRating(): boolean {
    return this.rating.meetsDisplayThreshold(this.reviewCount);
  }
}
