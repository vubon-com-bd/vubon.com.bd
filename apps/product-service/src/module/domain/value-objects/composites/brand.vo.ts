/**
 * BrandCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { BrandIdVO } from '../primitives/brand-id.vo.js';
import { BrandNameVO } from '../primitives/brand-name.vo.js';
import { BrandSlugVO } from '../primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../primitives/brand-logo.vo.js';
import { BRAND } from '@vubon/shared-constants/business/product';

export interface BrandCompositeProps {
  readonly id: BrandIdVO;
  readonly name: BrandNameVO;
  readonly slug: BrandSlugVO;
  readonly logo: BrandLogoVO;
  readonly description: string;
  readonly website?: string;
  readonly status: string;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
}

export class BrandCompositeVO extends BaseVO<BrandCompositeProps> {
  private constructor(props: BrandCompositeProps) {
    super(props);
  }

  static create(props: BrandCompositeProps): BrandCompositeVO {
    if (props.description.length > BRAND.DESCRIPTION_MAX_LENGTH) {
      throw new Error(`Brand description cannot exceed ${BRAND.DESCRIPTION_MAX_LENGTH} chars`);
    }
    if (props.productCount < 0) {
      throw new Error('Brand productCount cannot be negative');
    }
    return new BrandCompositeVO(props);
  }

  static reconstitute(props: BrandCompositeProps): BrandCompositeVO {
    return new BrandCompositeVO(props);
  }

  get id(): BrandIdVO { return this.value.id; }
  get name(): BrandNameVO { return this.value.name; }
  get slug(): BrandSlugVO { return this.value.slug; }
  get logo(): BrandLogoVO { return this.value.logo; }
  get status(): string { return this.value.status; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get productCount(): number { return this.value.productCount; }

  isActive(): boolean {
    return this.value.status === 'active';
  }

  hasProducts(): boolean {
    return this.value.productCount > 0;
  }

  hasLogo(): boolean {
    return this.value.logo.value.length > 0;
  }
}
