/**
 * VariantSelectionService — Real business logic
 * @module product-service/domain/services
 *
 * Responsibilities:
 *  - Option matrix build (product of option values)
 *  - Variant resolution by selected options
 *  - Combination availability check
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { ProductVariantEntity } from '../entities/product-variant.entity.js';

export interface VariantSelectionOption {
  readonly name: string;
  readonly value: string;
}

export interface VariantResolutionInput {
  readonly variants: readonly ProductVariantEntity[];
  readonly selectedOptions: readonly VariantSelectionOption[];
}

export interface VariantResolutionResult {
  readonly matched: ProductVariantEntity | null;
  readonly partialMatches: readonly ProductVariantEntity[];
  readonly availableOptions: Readonly<Record<string, readonly string[]>>;
}

export class VariantSelectionService {
  /**
   * Selected options → exact variant match।
   */
  static resolve(input: VariantResolutionInput): VariantResolutionResult {
    const { variants, selectedOptions } = input;

    if (selectedOptions.length === 0) {
      return { matched: null, partialMatches: variants, availableOptions: this.availableOptions(variants) };
    }

    const matched = variants.find((v) => this.matchesOptions(v, selectedOptions)) ?? null;

    const partialMatches = matched
      ? []
      : variants.filter((v) => this.partiallyMatches(v, selectedOptions));

    return {
      matched,
      partialMatches,
      availableOptions: this.availableOptions(variants),
    };
  }

  /**
   * একটার বেশি option selection-এর জন্য সব option values এর product।
   */
  static buildOptionMatrix(
    variants: readonly ProductVariantEntity[],
  ): Readonly<Record<string, readonly string[]>> {
    const matrix: Record<string, Set<string>> = {};

    for (const variant of variants) {
      for (const opt of variant.vo.options) {
        if (!matrix[opt.name]) matrix[opt.name] = new Set();
        matrix[opt.name].add(opt.value);
      }
    }

    const result: Record<string, readonly string[]> = {};
    for (const [k, v] of Object.entries(matrix)) {
      result[k] = Array.from(v).sort();
    }
    return result;
  }

  /**
   * Conflict-free selection check — partial selection এর সাথে consistent variants।
   */
  static isSelectionConsistent(
    variants: readonly ProductVariantEntity[],
    selectedOptions: readonly VariantSelectionOption[],
  ): boolean {
    if (selectedOptions.length === 0) return true;
    return variants.some((v) => this.partiallyMatches(v, selectedOptions));
  }

  /**
   * Options এর সাথে exactly matching variant।
   */
  private static matchesOptions(
    variant: ProductVariantEntity,
    selected: readonly VariantSelectionOption[],
  ): boolean {
    const variantOptions = variant.vo.options;
    if (variantOptions.length !== selected.length) return false;

    return selected.every((s) =>
      variantOptions.some(
        (o) => o.name.toLowerCase() === s.name.toLowerCase() &&
               o.value.toLowerCase() === s.value.toLowerCase(),
      ),
    );
  }

  /**
   * Partial match — selected এর সব option variant-এ আছে।
   */
  private static partiallyMatches(
    variant: ProductVariantEntity,
    selected: readonly VariantSelectionOption[],
  ): boolean {
    return selected.every((s) =>
      variant.vo.options.some(
        (o) => o.name.toLowerCase() === s.name.toLowerCase() &&
               o.value.toLowerCase() === s.value.toLowerCase(),
      ),
    );
  }

  /**
   * সব option values map — available vs selected.
   */
  private static availableOptions(
    variants: readonly ProductVariantEntity[],
  ): Readonly<Record<string, readonly string[]>> {
    return this.buildOptionMatrix(variants);
  }

  /**
   * Combined stock across matching variants।
   */
  static totalAvailable(
    variants: readonly ProductVariantEntity[],
    selectedOptions: readonly VariantSelectionOption[] = [],
  ): number {
    const pool =
      selectedOptions.length === 0
        ? variants
        : variants.filter((v) => this.partiallyMatches(v, selectedOptions));

    return pool.reduce((sum, v) => sum + v.vo.stock.value, 0);
  }

  /**
   * Option names must be consistent across variants।
   */
  static validateMatrixConsistency(variants: readonly ProductVariantEntity[]): void {
    if (variants.length === 0) return;

    const baseline = new Set(variants[0].vo.options.map((o) => o.name));
    for (let i = 1; i < variants.length; i++) {
      const current = new Set(variants[i].vo.options.map((o) => o.name));
      if (current.size !== baseline.size) {
        throw new BusinessRuleError(
          'Variants have inconsistent option names',
          'VARIANT_OPTION_MISMATCH',
          { variantId: variants[i].id },
        );
      }
      for (const name of current) {
        if (!baseline.has(name)) {
          throw new BusinessRuleError(
            `Variant option "${name}" not present in baseline`,
            'VARIANT_OPTION_MISMATCH',
            { variantId: variants[i].id, option: name },
          );
        }
      }
    }
  }
}
