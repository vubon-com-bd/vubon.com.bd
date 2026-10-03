/**
 * Extra Primitive VOs with unique logic
 */
import { AttributeValueVO } from '../../../src/module/domain/value-objects/primitives/attribute-value.vo.js';
import { BrandLogoVO } from '../../../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { InventoryThresholdVO } from '../../../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { ProductBarcodeVO } from '../../../src/module/domain/value-objects/primitives/product-barcode.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { ProductDimensionVO } from '../../../src/module/domain/value-objects/primitives/product-dimension.vo.js';
import { ProductWeightVO } from '../../../src/module/domain/value-objects/primitives/product-weight.vo.js';
import { ReviewCommentVO } from '../../../src/module/domain/value-objects/primitives/review-comment.vo.js';
import { VariantSkuVO } from '../../../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { ATTRIBUTE } from '@vubon/shared-constants/business/product';

describe('AttributeValueVO', () => {
  it('accepts string', () => {
    expect(AttributeValueVO.create('red').value).toBe('red');
  });

  it('accepts number', () => {
    expect(AttributeValueVO.create(42).value).toBe(42);
  });

  it('accepts boolean', () => {
    expect(AttributeValueVO.create(true).value).toBe(true);
  });

  it('accepts string array', () => {
    expect(AttributeValueVO.create(['a', 'b']).value).toEqual(['a', 'b']);
  });

  it('rejects null/undefined', () => {
    expect(() => AttributeValueVO.create(null as never)).toThrow();
    expect(() => AttributeValueVO.create(undefined as never)).toThrow();
  });

  it('rejects string longer than max', () => {
    expect(() => AttributeValueVO.create('A'.repeat(ATTRIBUTE.VALUE_MAX_LENGTH + 1))).toThrow();
  });

  it('rejects NaN number', () => {
    expect(() => AttributeValueVO.create(NaN)).toThrow();
  });
});

describe('BrandLogoVO', () => {
  it('accepts valid URL', () => {
    expect(BrandLogoVO.create('https://cdn.example.com/logo.png').value).toBe(
      'https://cdn.example.com/logo.png',
    );
  });

  it('accepts empty string', () => {
    expect(BrandLogoVO.create('').value).toBe('');
  });

  it('rejects invalid URL', () => {
    expect(() => BrandLogoVO.create('not-a-url')).toThrow();
  });

  it('empty() returns empty logo', () => {
    expect(BrandLogoVO.empty().value).toBe('');
  });
});

describe('CategoryPathVO', () => {
  it('create with array', () => {
    expect(CategoryPathVO.create(['a', 'b']).value).toEqual(['a', 'b']);
  });

  it('root() returns empty array', () => {
    expect(CategoryPathVO.root().value).toEqual([]);
    expect(CategoryPathVO.root().depth).toBe(0);
  });

  it('append extends path', () => {
    const path = CategoryPathVO.create(['a']).append('b');
    expect(path.value).toEqual(['a', 'b']);
  });

  it('contains checks id in path', () => {
    const path = CategoryPathVO.create(['a', 'b']);
    expect(path.contains('a')).toBe(true);
    expect(path.contains('z')).toBe(false);
  });

  it('rejects path longer than MAX_DEPTH', () => {
    const tooDeep = Array.from({ length: 10 }, (_, i) => `id-${i}`);
    expect(() => CategoryPathVO.create(tooDeep)).toThrow();
  });
});

describe('InventoryThresholdVO', () => {
  it('create positive threshold', () => {
    expect(InventoryThresholdVO.create(10).value).toBe(10);
  });

  it('rejects negative', () => {
    expect(() => InventoryThresholdVO.create(-1)).toThrow();
  });

  it('rejects non-integer', () => {
    expect(() => InventoryThresholdVO.create(1.5)).toThrow();
  });

  it('default() returns configured default', () => {
    expect(InventoryThresholdVO.default().value).toBeGreaterThan(0);
  });

  it('isLowStock returns true at/below threshold (but > 0)', () => {
    const threshold = InventoryThresholdVO.create(10);
    expect(threshold.isLowStock(5)).toBe(true);
    expect(threshold.isLowStock(10)).toBe(true);
    expect(threshold.isLowStock(11)).toBe(false);
    expect(threshold.isLowStock(0)).toBe(false);
  });

  it('isCritical uses critical threshold', () => {
    const threshold = InventoryThresholdVO.create(10);
    expect(threshold.isCritical(2)).toBe(true);
    expect(threshold.isCritical(10)).toBe(false);
  });
});

describe('ProductBarcodeVO', () => {
  it('create with valid barcode', () => {
    expect(ProductBarcodeVO.create('5901234123457').value).toBe('5901234123457');
  });

  it('trim whitespace', () => {
    expect(ProductBarcodeVO.create('  5901234123457  ').value).toBe('5901234123457');
  });

  it('rejects too long (>64 chars)', () => {
    expect(() => ProductBarcodeVO.create('A'.repeat(65))).toThrow();
  });

  it('empty() returns empty', () => {
    expect(ProductBarcodeVO.empty().value).toBe('');
  });
});

describe('ProductDescriptionVO', () => {
  it('create with description', () => {
    expect(ProductDescriptionVO.create('A good product').value).toBe('A good product');
  });

  it('trims whitespace', () => {
    expect(ProductDescriptionVO.create('  desc  ').value).toBe('desc');
  });

  it('empty() returns empty string', () => {
    const vo = ProductDescriptionVO.empty();
    expect(vo.value).toBe('');
    expect(vo.isEmpty).toBe(true);
  });

  it('rejects too long (>5000 chars)', () => {
    expect(() => ProductDescriptionVO.create('A'.repeat(5001))).toThrow();
  });
});

describe('ProductDimensionVO', () => {
  it('create with positive dims', () => {
    const vo = ProductDimensionVO.create(20, 15, 8, 'cm');
    expect(vo.length).toBe(20);
    expect(vo.width).toBe(15);
    expect(vo.height).toBe(8);
    expect(vo.unit).toBe('cm');
  });

  it('rejects non-positive dims', () => {
    expect(() => ProductDimensionVO.create(0, 15, 8)).toThrow();
    expect(() => ProductDimensionVO.create(20, -1, 8)).toThrow();
  });

  it('rejects invalid unit', () => {
    expect(() => ProductDimensionVO.create(20, 15, 8, 'm' as never)).toThrow();
  });

  it('volume() multiplies dims', () => {
    expect(ProductDimensionVO.create(2, 3, 4).volume()).toBe(24);
  });

  it('reconstitute works', () => {
    const vo = ProductDimensionVO.reconstitute(1, 2, 3, 'in');
    expect(vo.unit).toBe('in');
  });
});

describe('ProductWeightVO', () => {
  it('create with positive weight', () => {
    expect(ProductWeightVO.create(0.5).value).toBe(0.5);
  });

  it('rejects zero and negative', () => {
    expect(() => ProductWeightVO.create(0)).toThrow();
    expect(() => ProductWeightVO.create(-1)).toThrow();
  });

  it('rejects above max', () => {
    expect(() => ProductWeightVO.create(10001)).toThrow();
  });

  it('toGrams converts kg to g', () => {
    expect(ProductWeightVO.create(0.5).toGrams()).toBe(500);
  });
});

describe('ReviewCommentVO', () => {
  it('create with valid comment', () => {
    expect(ReviewCommentVO.create('A good comment with length').value).toBe('A good comment with length');
  });

  it('trims whitespace', () => {
    expect(ReviewCommentVO.create('  valid comment  ').value).toBe('valid comment');
  });

  it('empty() returns empty', () => {
    expect(ReviewCommentVO.empty().value).toBe('');
  });

  it('rejects too short (> 0 but < min)', () => {
    expect(() => ReviewCommentVO.create('hi')).toThrow();
  });

  it('rejects too long (> max)', () => {
    expect(() => ReviewCommentVO.create('A'.repeat(2001))).toThrow();
  });
});

describe('VariantSkuVO', () => {
  it('create with valid SKU', () => {
    expect(VariantSkuVO.create('VAR-001').value).toBe('VAR-001');
  });

  it('uppercases', () => {
    expect(VariantSkuVO.create('var-001').value).toBe('VAR-001');
  });

  it('rejects too short', () => {
    expect(() => VariantSkuVO.create('A')).toThrow();
  });

  it('rejects too long', () => {
    expect(() => VariantSkuVO.create('A'.repeat(65))).toThrow();
  });
});
