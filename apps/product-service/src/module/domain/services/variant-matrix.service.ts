/**
 * VariantMatrix Domain Service
 * @module product-service/domain/services
 *
 * Generates all unique variant combinations from attribute option sets.
 * e.g. Color [Red, Blue] x Size [S, M] → 4 combos.
 */
export interface AttributeOptionInput {
  readonly name: string;
  readonly values: readonly string[];
}

export interface VariantCombination {
  readonly options: readonly { readonly name: string; readonly value: string }[];
  readonly signature: string;
}

export class VariantMatrixService {
  /**
   * Cartesian product of attribute values.
   */
  generateCombinations(
    attributes: readonly AttributeOptionInput[],
    maxCombos = 500,
  ): readonly VariantCombination[] {
    if (attributes.length === 0) return [];
    for (const a of attributes) {
      if (a.values.length === 0) {
        throw new Error(`Attribute "${a.name}" has no values`);
      }
    }

    let combos: VariantCombination[] = [
      { options: [], signature: '' },
    ];

    for (const attr of attributes) {
      const next: VariantCombination[] = [];
      for (const combo of combos) {
        for (const val of attr.values) {
          const options = [...combo.options, { name: attr.name, value: val }];
          const signature = this.signature(options);
          next.push({ options, signature });
          if (next.length > maxCombos) {
            throw new Error(`Variant combination count exceeds limit ${maxCombos}`);
          }
        }
      }
      combos = next;
    }

    // Deduplicate by signature
    const seen = new Set<string>();
    return combos.filter((c) => {
      if (seen.has(c.signature)) return false;
      seen.add(c.signature);
      return true;
    });
  }

  signature(
    options: readonly { readonly name: string; readonly value: string }[],
  ): string {
    return [...options]
      .map((o) => `${o.name}:${o.value}`)
      .sort()
      .join('|');
  }

  countCombinations(attributes: readonly AttributeOptionInput[]): number {
    return attributes.reduce((acc, a) => acc * a.values.length, 1);
  }
}
