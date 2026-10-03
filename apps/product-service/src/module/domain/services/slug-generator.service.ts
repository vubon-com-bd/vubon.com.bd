/**
 * SlugGenerator Domain Service
 * @module product-service/domain/services
 *
 * Generates URL-safe slugs and ensures uniqueness within a scope.
 */
export interface SlugUniquenessChecker {
  isUnique(candidate: string): Promise<boolean>;
}

export class SlugGeneratorService {
  /**
   * Generate a slug from a text, optionally appending a numeric suffix
   * to avoid collisions until the checker returns true.
   */
  async generateUniqueSlug(
    raw: string,
    checker: SlugUniquenessChecker,
    maxAttempts = 20,
  ): Promise<string> {
    const base = this.toSlug(raw);
    if (base.length === 0) {
      throw new Error('Cannot generate slug from empty input');
    }
    if (await checker.isUnique(base)) return base;
    for (let i = 1; i <= maxAttempts; i++) {
      const candidate = `${base}-${i}`;
      if (await checker.isUnique(candidate)) return candidate;
    }
    throw new Error(`Could not generate unique slug after ${maxAttempts} attempts`);
  }

  toSlug(raw: string): string {
    return raw
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
