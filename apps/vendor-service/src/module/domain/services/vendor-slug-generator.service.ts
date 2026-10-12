/**
 * VendorSlugGeneratorService
 * @module vendor-service/domain/services
 *
 * Generate unique, URL-safe slugs for vendors.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo.js';

const MAX_ATTEMPTS = 100;
const SUFFIX_START = 2;

export interface SlugGenerationResult {
  readonly slug: VendorSlugVO;
  readonly isUnique: boolean;
  readonly attempts: number;
}

export class VendorSlugGeneratorService {
  /**
   * Generate a unique slug from a name + a set of already-taken slugs.
   * Appends `-2`, `-3`, ... up to `-99` when collisions occur.
   */
  static generateUnique(
    name: string,
    taken: ReadonlySet<string> | readonly string[],
  ): SlugGenerationResult {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new ValidationError('Name is required to generate slug', 'name');
    }
    const takenSet = taken instanceof Set ? taken : new Set(taken);

    const base = VendorSlugVO.fromName(name);
    if (!takenSet.has(base.value)) {
      return { slug: base, isUnique: true, attempts: 1 };
    }

    const root = base.value.slice(0, 140); // room for suffix
    for (let i = SUFFIX_START; i < MAX_ATTEMPTS + SUFFIX_START; i++) {
      const candidate = `${root}-${i}`;
      if (!takenSet.has(candidate)) {
        return {
          slug: VendorSlugVO.reconstitute(candidate),
          isUnique: true,
          attempts: i,
        };
      }
    }
    // Fallback: timestamp suffix (last resort)
    const fallback = `${root}-${Date.now().toString(36)}`;
    return {
      slug: VendorSlugVO.reconstitute(fallback),
      isUnique: false,
      attempts: MAX_ATTEMPTS,
    };
  }

  /**
   * Ensure a given slug is unique; if taken, generate a variant.
   */
  static ensureUnique(
    desired: string,
    taken: ReadonlySet<string> | readonly string[],
  ): SlugGenerationResult {
    return VendorSlugGeneratorService.generateUnique(desired, taken);
  }

  /**
   * Return a batch of reserved slugs (with common prefixes).
   * Useful when a vendor registers a parent brand.
   */
  static reserveForBrand(name: string): readonly string[] {
    const base = VendorSlugVO.fromName(name).value;
    return [base, `${base}-official`, `${base}-store`, `${base}-shop`];
  }

  /**
   * Suggest a slug from the business name; strips common suffixes.
   */
  static suggestFromBusiness(businessName: string): VendorSlugVO {
    const cleaned = businessName
      .replace(/\b(ltd|limited|llc|inc|corp|co|company|enterprise|enterprises|trading|store|shop)\b\.?/gi, '')
      .trim();
    return VendorSlugVO.fromName(cleaned || businessName);
  }

  /**
   * Check whether two names would collide (same base slug).
   */
  static wouldCollide(nameA: string, nameB: string): boolean {
    try {
      return VendorSlugVO.fromName(nameA).value === VendorSlugVO.fromName(nameB).value;
    } catch {
      return false;
    }
  }

  /**
   * Detect suspicious slugs (impersonation attempts).
   */
  static isSuspicious(slug: string): boolean {
    const lower = slug.toLowerCase();
    const reserved = ['admin', 'support', 'system', 'official', 'vubon', 'root', 'moderator'];
    return reserved.some((r) => lower === r || lower.startsWith(`${r}-`) || lower.endsWith(`-${r}`));
  }
}
