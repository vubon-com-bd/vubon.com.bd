/**
 * ID Value Objects — grouped tests
 */
import { AttributeIdVO } from '../../../src/module/domain/value-objects/primitives/attribute-id.vo.js';
import { BrandIdVO } from '../../../src/module/domain/value-objects/primitives/brand-id.vo.js';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { CollectionIdVO } from '../../../src/module/domain/value-objects/primitives/collection-id.vo.js';
import { InventoryIdVO } from '../../../src/module/domain/value-objects/primitives/inventory-id.vo.js';
import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { ReviewIdVO } from '../../../src/module/domain/value-objects/primitives/review-id.vo.js';
import { VariantIdVO } from '../../../src/module/domain/value-objects/primitives/variant-id.vo.js';

const idFactories = [
  { name: 'AttributeIdVO', factory: AttributeIdVO, sample: 'attr-11111111-1111-1111-1111-111111111111' },
  { name: 'BrandIdVO', factory: BrandIdVO, sample: 'brnd-11111111-1111-1111-1111-111111111111' },
  { name: 'CategoryIdVO', factory: CategoryIdVO, sample: 'cat-11111111-1111-1111-1111-111111111111' },
  { name: 'CollectionIdVO', factory: CollectionIdVO, sample: 'coll-11111111-1111-1111-1111-111111111111' },
  { name: 'InventoryIdVO', factory: InventoryIdVO, sample: 'invt-11111111-1111-1111-1111-111111111111' },
  { name: 'ProductIdVO', factory: ProductIdVO, sample: 'prod-11111111-1111-1111-1111-111111111111' },
  { name: 'ReviewIdVO', factory: ReviewIdVO, sample: 'revw-11111111-1111-1111-1111-111111111111' },
  { name: 'VariantIdVO', factory: VariantIdVO, sample: 'vari-11111111-1111-1111-1111-111111111111' },
];

describe('ID Value Objects', () => {
  describe.each(idFactories)('$name', ({ factory, sample }) => {
    it('should create with valid id', () => {
      const vo = factory.create(sample);
      expect(vo.value).toBe(sample);
    });

    it('should reject empty string', () => {
      expect(() => factory.create('')).toThrow();
    });

    it('should reject whitespace-only', () => {
      expect(() => factory.create('   ')).toThrow();
    });

    it('should trim whitespace', () => {
      const vo = factory.create('  ' + sample + '  ');
      expect(vo.value).toBe(sample);
    });

    it('should support reconstitute with any value', () => {
      const vo = factory.reconstitute('x');
      expect(vo.value).toBe('x');
    });

    it('should compare equal by value', () => {
      const a = factory.create(sample);
      const b = factory.create(sample);
      expect(a.equals(b)).toBe(true);
    });

    it('should expose value as JSON', () => {
      const vo = factory.create(sample);
      expect(vo.toJSON()).toBe(sample);
      expect(vo.toString()).toBe(sample);
    });
  });
});
