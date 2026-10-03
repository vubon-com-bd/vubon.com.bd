/**
 * SkuGenerator Domain Service
 * @module product-service/domain/services
 *
 * Generates SKU codes from a base prefix + sequence + optional variant key.
 */
export interface SkuUniquenessChecker {
  isUnique(sku: string): Promise<boolean>;
}

export class SkuGeneratorService {
  /**
   * SKU format: <PREFIX>-<seq>[-<variantKey>]
   * Prefix is derived from product name (first 3 uppercase letters).
   */
  async generateProductSku(
    productName: string,
    sequence: number,
    checker: SkuUniquenessChecker,
  ): Promise<string> {
    const prefix = this.toPrefix(productName);
    let candidate = `${prefix}-${String(sequence).padStart(5, '0')}`;
    if (await checker.isUnique(candidate)) return candidate;
    // fallback: append random suffix
    for (let i = 0; i < 10; i++) {
      const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
      candidate = `${prefix}-${String(sequence).padStart(5, '0')}-${rand}`;
      if (await checker.isUnique(candidate)) return candidate;
    }
    throw new Error('Could not generate unique SKU');
  }

  async generateVariantSku(
    productSku: string,
    optionSignature: string,
    checker: SkuUniquenessChecker,
  ): Promise<string> {
    const suffix = this.compactSignature(optionSignature);
    let candidate = `${productSku}-${suffix}`;
    if (await checker.isUnique(candidate)) return candidate;
    for (let i = 1; i < 20; i++) {
      candidate = `${productSku}-${suffix}-${i}`;
      if (await checker.isUnique(candidate)) return candidate;
    }
    throw new Error('Could not generate unique variant SKU');
  }

  private toPrefix(name: string): string {
    const cleaned = name.replace(/[^A-Za-z]/g, '').toUpperCase();
    return cleaned.slice(0, 3).padEnd(3, 'X');
  }

  private compactSignature(sig: string): string {
    return sig
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 8);
  }
}
