/**
 * ProductSkuService — Real business logic
 * @module product-service/domain/services
 *
 * SKU format: <VENDOR>-<CATEGORY>-<SEQUENCE><CHECKSUM>
 *  - Vendor: 3-char uppercase code
 *  - Category: 3-char uppercase code
 *  - Sequence: 6-digit zero-padded
 *  - Checksum: Luhn-like 2-char verification
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo.js';
import { VariantSkuVO } from '../value-objects/primitives/variant-sku.vo.js';

export interface SkuGenerateInput {
  readonly vendorCode: string;
  readonly categoryCode: string;
  readonly sequence: number;
}

export interface VariantSkuInput {
  readonly productSku: string;
  readonly optionValues: readonly string[];
}

export class ProductSkuService {
  private static readonly VENDOR_CODE_LENGTH = 3;
  private static readonly CATEGORY_CODE_LENGTH = 3;
  private static readonly SEQUENCE_LENGTH = 6;

  /**
   * Deterministic base SKU generation।
   */
  static generate(input: SkuGenerateInput): ProductSkuVO {
    const vendor = this.normalizeCode(input.vendorCode, this.VENDOR_CODE_LENGTH, 'vendor');
    const category = this.normalizeCode(input.categoryCode, this.CATEGORY_CODE_LENGTH, 'category');

    if (!Number.isInteger(input.sequence) || input.sequence < 1) {
      throw new BusinessRuleError(
        'SKU sequence must be a positive integer',
        'SKU_SEQUENCE_INVALID',
        { sequence: input.sequence },
      );
    }

    const seq = String(input.sequence).padStart(this.SEQUENCE_LENGTH, '0');
    const checksum = this.checksum(vendor + category + seq);
    const sku = `${vendor}-${category}-${seq}${checksum}`;
    return ProductSkuVO.create(sku);
  }

  /**
   * Product SKU থেকে variant SKU (e.g., "-RED-M")।
   */
  static generateVariantSku(input: VariantSkuInput): VariantSkuVO {
    if (input.optionValues.length === 0) {
      throw new BusinessRuleError(
        'Variant SKU requires at least one option value',
        'VARIANT_SKU_OPTIONS_REQUIRED',
      );
    }

    const parts = input.optionValues.map((v) => this.compact(v));
    const variantSku = `${input.productSku}-${parts.join('-')}`;
    return VariantSkuVO.create(variantSku);
  }

  /**
   * SKU change করলে variant SKU updates দরকার কিনা।
   */
  static needsVariantSkuRegeneration(oldProductSku: string, newProductSku: string): boolean {
    return oldProductSku !== newProductSku;
  }

  /**
   * Base SKU validate।
   */
  static validateBase(raw: string): ProductSkuVO {
    return ProductSkuVO.create(raw);
  }

  private static normalizeCode(raw: string, len: number, field: string): string {
    if (typeof raw !== 'string') {
      throw new BusinessRuleError(`SKU ${field} code must be a string`, 'SKU_CODE_INVALID', { field });
    }
    const compact = raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (compact.length === 0) {
      throw new BusinessRuleError(`SKU ${field} code cannot be empty`, 'SKU_CODE_INVALID', { field });
    }
    return compact.slice(0, len).padEnd(len, 'X');
  }

  private static compact(value: string): string {
    return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  }

  /**
   * Simple Luhn-like checksum — 2 uppercase letters।
   */
  private static checksum(source: string): string {
    let sum = 0;
    for (let i = 0; i < source.length; i++) {
      sum += source.charCodeAt(i) * (i + 1);
    }
    const mod = sum % 676;
    const a = String.fromCharCode(65 + Math.floor(mod / 26));
    const b = String.fromCharCode(65 + (mod % 26));
    return `${a}${b}`;
  }
}
