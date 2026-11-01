/**
 * ProductSlugService — Real business logic
 * @module product-service/domain/services
 *
 * Responsibilities:
 *  - Deterministic slug generation from name + suffix
 *  - Slug collision resolution (append -2, -3, ... -N)
 *  - Reserved slug protection (e.g. new, edit, search)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo.js';

const RESERVED_SLUGS = new Set([
  'new',
  'edit',
  'search',
  'admin',
  'api',
  'product',
  'products',
  'category',
  'categories',
  'brand',
  'brands',
  'cart',
  'checkout',
  'order',
  'orders',
  'account',
  'login',
  'register',
]);

const MAX_SUFFIX_ATTEMPTS = 1000;

export interface SlugGenerateInput {
  readonly name: string;
  readonly existingSlugs: readonly string[];
}

export interface SlugGenerateResult {
  readonly slug: ProductSlugVO;
  readonly attempts: number;
  readonly collisionResolved: boolean;
}

export class ProductSlugService {
  /**
   * Name থেকে slug তৈরি করে, collision থাকলে -2, -3 ... suffix বসায়।
   */
  static generate(input: SlugGenerateInput): SlugGenerateResult {
    if (!input.name || input.name.trim().length === 0) {
      throw new BusinessRuleError(
        'Cannot generate slug from empty name',
        'SLUG_NAME_REQUIRED',
      );
    }

    const base = ProductSlugVO.fromName(input.name).value;
    if (RESERVED_SLUGS.has(base)) {
      return this.appendSuffix(base, input.existingSlugs, 2, 1);
    }

    if (!input.existingSlugs.includes(base)) {
      return { slug: ProductSlugVO.reconstitute(base), attempts: 0, collisionResolved: false };
    }

    return this.appendSuffix(base, input.existingSlugs, 2, 0);
  }

  /**
   * নাম পরিবর্তন হলে slug regenerate করা উচিত কিনা যাচাই।
   */
  static shouldRegenerate(oldName: string, newName: string, currentSlug: string): boolean {
    if (!oldName || !newName) return false;
    if (oldName.trim() === newName.trim()) return false;

    const generated = ProductSlugVO.fromName(oldName).value;
    return currentSlug === generated;
  }

  /**
   * Slug এর reserved কিনা check।
   */
  static isReserved(slug: string): boolean {
    return RESERVED_SLUGS.has(slug.trim().toLowerCase());
  }

  /**
   * Custom slug validate + reserved check।
   */
  static validateCustom(rawSlug: string): ProductSlugVO {
    const slug = ProductSlugVO.create(rawSlug);
    if (RESERVED_SLUGS.has(slug.value)) {
      throw new BusinessRuleError(
        `Slug "${slug.value}" is reserved and cannot be used`,
        'SLUG_RESERVED',
        { slug: slug.value },
      );
    }
    return slug;
  }

  private static appendSuffix(
    base: string,
    existing: readonly string[],
    startAt: number,
    initialAttempts: number,
  ): SlugGenerateResult {
    let attempts = initialAttempts;
    for (let i = startAt; i <= MAX_SUFFIX_ATTEMPTS; i++) {
      const candidate = `${base}-${i}`;
      attempts++;
      if (!existing.includes(candidate)) {
        return {
          slug: ProductSlugVO.reconstitute(candidate),
          attempts,
          collisionResolved: true,
        };
      }
    }
    throw new BusinessRuleError(
      `Failed to resolve slug collision for "${base}" after ${MAX_SUFFIX_ATTEMPTS} attempts`,
      'SLUG_COLLISION_UNRESOLVED',
      { base },
    );
  }
}
