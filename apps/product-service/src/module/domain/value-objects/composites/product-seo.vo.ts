/**
 * ProductSeo Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export interface ProductSeoVOProps {
  readonly metaTitle?: string;
  readonly metaDescription?: string;
  readonly metaKeywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly ogImage?: string;
  readonly twitterCard?: 'summary' | 'summary_large_image';
  readonly noIndex: boolean;
  readonly noFollow: boolean;
}

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

export class ProductSeoVO extends BaseVO<ProductSeoVOProps> {
  private constructor(props: ProductSeoVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductSeoVOProps): ProductSeoVO {
    const vo = new ProductSeoVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductSeoVOProps): ProductSeoVO {
    return new ProductSeoVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.metaTitle !== undefined) {
      if (v.metaTitle.length < TITLE_MIN || v.metaTitle.length > TITLE_MAX) {
        throw new ValidationError(
          `SEO metaTitle must be ${TITLE_MIN}-${TITLE_MAX} chars`,
          'metaTitle',
        );
      }
    }

    if (v.metaDescription !== undefined) {
      if (v.metaDescription.length < DESC_MIN || v.metaDescription.length > DESC_MAX) {
        throw new ValidationError(
          `SEO metaDescription must be ${DESC_MIN}-${DESC_MAX} chars`,
          'metaDescription',
        );
      }
    }

    if (v.canonicalUrl && !REGEX.URL.test(v.canonicalUrl)) {
      throw new ValidationError('SEO canonicalUrl must be a valid URL', 'canonicalUrl');
    }
    if (v.ogImage && !REGEX.URL.test(v.ogImage)) {
      throw new ValidationError('SEO ogImage must be a valid URL', 'ogImage');
    }

    if (v.twitterCard !== undefined) {
      if (v.twitterCard !== 'summary' && v.twitterCard !== 'summary_large_image') {
        throw new ValidationError('Invalid twitterCard value', 'twitterCard');
      }
    }
  }

  get metaTitle(): string | undefined { return this.value.metaTitle; }
  get metaDescription(): string | undefined { return this.value.metaDescription; }
  get metaKeywords(): readonly string[] | undefined { return this.value.metaKeywords; }
  get canonicalUrl(): string | undefined { return this.value.canonicalUrl; }
  get ogTitle(): string | undefined { return this.value.ogTitle; }
  get ogDescription(): string | undefined { return this.value.ogDescription; }
  get ogImage(): string | undefined { return this.value.ogImage; }
  get twitterCard(): 'summary' | 'summary_large_image' | undefined { return this.value.twitterCard; }
  get noIndex(): boolean { return this.value.noIndex; }
  get noFollow(): boolean { return this.value.noFollow; }

  hasTitle(): boolean { return this.metaTitle !== undefined; }
  hasDescription(): boolean { return this.metaDescription !== undefined; }
  hasKeywords(): boolean { return (this.metaKeywords?.length ?? 0) > 0; }
  hasCanonical(): boolean { return this.canonicalUrl !== undefined; }
  hasOgImage(): boolean { return this.ogImage !== undefined; }

  isIndexable(): boolean { return !this.noIndex; }

  completenessScore(): number {
    let score = 0;
    if (this.hasTitle()) score += 30;
    if (this.hasDescription()) score += 30;
    if (this.hasKeywords()) score += 20;
    if (this.hasCanonical()) score += 10;
    if (this.hasOgImage()) score += 10;
    return score;
  }

  isComplete(): boolean {
    return this.hasTitle() && this.hasDescription() && this.hasKeywords();
  }
}
