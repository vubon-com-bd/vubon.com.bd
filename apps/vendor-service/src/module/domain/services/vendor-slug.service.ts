/**
 * VendorSlugService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Deterministic slug generation from name
 *  - Reserved slug protection
 *  - Collision resolution (-2, -3, ... -N)
 *  - Slug uniqueness verification helper
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo.js';

/**
 * Reserved slugs — can't be used by vendors
 */
const RESERVED_SLUGS = new Set([
  'new',
  'edit',
  'search',
  'admin',
  'api',
  'vendor',
  'vendors',
  'store',
  'shop',
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
  'logout',
  'signup',
  'signin',
  'dashboard',
  'settings',
  'profile',
  'support',
  'help',
  'about',
  'contact',
  'terms',
  'privacy',
  'policy',
]);

const MAX_SUFFIX_ATTEMPTS = 1000;

export interface SlugGenerateInput {
  readonly name: string;
  readonly existingSlugs: readonly string[];
}

export interface SlugGenerateResult {
  readonly slug: VendorSlugVO;
  readonly attempts: number;
  readonly collisionResolved: boolean;
}

export class VendorSlugService {
  /**
   * Name থেকে vendor slug generate করে।
   * Collision থাকলে -2, -3 ... suffix বসায়।
   */
  static generate(input: SlugGenerateInput): SlugGenerateResult {
    if (!input.name || input.name.trim().length === 0) {
      throw new BusinessRuleError(
        'Cannot generate slug from empty name',
        'SLUG_NAME_REQUIRED',
      );
    }

    const base = VendorSlugVO.fromName(input.name).value;
    if (base.length === 0) {
      throw new ValidationError(
        'Name produced an empty slug',
        'slug',
      );
    }

    if (RESERVED_SLUGS.has(base)) {
      return this.appendSuffix(base, input.existingSlugs, 2, 1);
    }

    if (!input.existingSlugs.includes(base)) {
      return {
        slug: VendorSlugVO.reconstitute(base),
        attempts: 0,
        collisionResolved: false,
      };
    }

    return this.appendSuffix(base, input.existingSlugs, 2, 0);
  }

  /**
   * Reserved কিনা check।
   */
  static isReserved(slug: string): boolean {
    return RESERVED_SLUGS.has(slug.trim().toLowerCase());
  }

  /**
   * Custom slug validate + reserved check।
   */
  static validateCustom(rawSlug: string): VendorSlugVO {
    const slug = VendorSlugVO.create(rawSlug);
    if (RESERVED_SLUGS.has(slug.value)) {
      throw new BusinessRuleError(
        `Slug "${slug.value}" is reserved and cannot be used`,
        'SLUG_RESERVED',
        { slug: slug.value },
      );
    }
    return slug;
  }

  /**
   * নাম পরিবর্তন হলে slug regenerate করা উচিত কিনা।
   */
  static shouldRegenerate(
    oldName: string,
    newName: string,
    currentSlug: string,
  ): boolean {
    if (!oldName || !newName) return false;
    if (oldName.trim() === newName.trim()) return false;

    const generated = VendorSlugVO.fromName(oldName).value;
    return currentSlug === generated;
  }

  /**
   * দুটি slug একই কিনা (case-insensitive)।
   */
  static areEquivalent(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  /**
   * Slug থেকে base part extract করো (suffix ছাড়া)।
   */
  static extractBase(slug: string): string {
    return slug.replace(/-\d+$/, '');
  }

  /**
   * Slug থেকে suffix number extract করো (default 0)।
   */
  static extractSuffix(slug: string): number {
    const match = slug.match(/-(\d+)$/);
    return match ? parseInt(match[1]!, 10) : 0;
  }

  /**
   * Reserved slug list এর snapshot।
   */
  static getReservedSlugs(): readonly string[] {
    return [...RESERVED_SLUGS];
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
          slug: VendorSlugVO.reconstitute(candidate),
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
