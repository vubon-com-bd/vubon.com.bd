/**
 * VariantOptionSetVO — Ensures variant option combinations are unique
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface VariantOptionItem {
  readonly name: string;
  readonly value: string;
}

export class VariantOptionSetVO extends BaseVO<readonly VariantOptionItem[]> {
  private constructor(items: readonly VariantOptionItem[]) {
    super(Object.freeze([...items]));
  }

  static create(items: readonly VariantOptionItem[]): VariantOptionSetVO {
    if (items.length === 0) {
      throw new Error('VariantOptionSet must contain at least one option');
    }
    const seen = new Set<string>();
    for (const item of items) {
      const key = `${item.name.toLowerCase()}::${item.value.toLowerCase()}`;
      if (seen.has(key)) {
        throw new Error(`Duplicate variant option: ${item.name}=${item.value}`);
      }
      seen.add(key);
    }
    return new VariantOptionSetVO(items);
  }

  static reconstitute(items: readonly VariantOptionItem[]): VariantOptionSetVO {
    return new VariantOptionSetVO(items);
  }

  /**
   * Unique signature used for SKU generation or dedup
   */
  signature(): string {
    return [...this.value]
      .map((o) => `${o.name}:${o.value}`)
      .sort()
      .join('|');
  }

  has(name: string, value: string): boolean {
    return this.value.some(
      (o) => o.name.toLowerCase() === name.toLowerCase() && o.value.toLowerCase() === value.toLowerCase()
    );
  }

  get size(): number {
    return this.value.length;
  }
}
