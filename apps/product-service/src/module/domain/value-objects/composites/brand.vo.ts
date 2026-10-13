/**
 * Brand Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { BRAND } from '@vubon/shared-constants/business';

import { BrandIdVO } from '../primitives/brand-id.vo.js';
import { BrandNameVO } from '../primitives/brand-name.vo.js';
import { BrandSlugVO } from '../primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../primitives/brand-logo.vo.js';

export interface BrandVOProps {
  readonly id: BrandIdVO;
  readonly name: BrandNameVO;
  readonly slug: BrandSlugVO;
  readonly description?: string;
  readonly logo?: BrandLogoVO;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly status: string;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
}

export class BrandVO extends BaseVO<BrandVOProps> {
  private constructor(props: BrandVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: BrandVOProps): BrandVO {
    const vo = new BrandVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BrandVOProps): BrandVO {
    return new BrandVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.description !== undefined) {
      if (v.description.length > BRAND.DESCRIPTION_MAX_LENGTH) {
        throw new ValidationError(
          `Brand description exceeds ${BRAND.DESCRIPTION_MAX_LENGTH}`,
          'description',
        );
      }
    }

    if (v.bannerUrl && !REGEX.URL.test(v.bannerUrl)) {
      throw new ValidationError('Brand bannerUrl must be a valid URL', 'bannerUrl');
    }

    if (v.website && !REGEX.URL.test(v.website)) {
      throw new ValidationError('Brand website must be a valid URL', 'website');
    }

    if (!Number.isInteger(v.productCount) || v.productCount < 0) {
      throw new ValidationError('Brand productCount must be non-negative integer', 'productCount');
    }
  }

  get id(): BrandIdVO { return this.value.id; }
  get name(): BrandNameVO { return this.value.name; }
  get slug(): BrandSlugVO { return this.value.slug; }
  get description(): string | undefined { return this.value.description; }
  get logo(): BrandLogoVO | undefined { return this.value.logo; }
  get bannerUrl(): string | undefined { return this.value.bannerUrl; }
  get website(): string | undefined { return this.value.website; }
  get status(): string { return this.value.status; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get productCount(): number { return this.value.productCount; }
  get country(): string | undefined { return this.value.country; }

  hasLogo(): boolean { return this.logo !== undefined; }
  hasBanner(): boolean { return this.bannerUrl !== undefined; }
  hasWebsite(): boolean { return this.website !== undefined; }
  hasCountry(): boolean { return this.country !== undefined; }

  isActive(): boolean { return this.status === 'active'; }
  hasProducts(): boolean { return this.productCount > 0; }
}
