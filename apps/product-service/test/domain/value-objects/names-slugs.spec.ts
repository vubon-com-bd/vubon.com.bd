/**
 * Name and Slug Value Objects — grouped tests
 */
import { AttributeNameVO } from '../../../src/module/domain/value-objects/primitives/attribute-name.vo.js';
import { BrandNameVO } from '../../../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { CategoryNameVO } from '../../../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CollectionNameVO } from '../../../src/module/domain/value-objects/primitives/collection-name.vo.js';
import { VariantNameVO } from '../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { BrandSlugVO } from '../../../src/module/domain/value-objects/primitives/brand-slug.vo.js';
import { CategorySlugVO } from '../../../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CollectionSlugVO } from '../../../src/module/domain/value-objects/primitives/collection-slug.vo.js';

describe('Name VOs', () => {
  const nameVOs = [
    { name: 'AttributeNameVO', factory: AttributeNameVO, sample: 'Color' },
    { name: 'BrandNameVO', factory: BrandNameVO, sample: 'Sony' },
    { name: 'CategoryNameVO', factory: CategoryNameVO, sample: 'Electronics' },
    { name: 'CollectionNameVO', factory: CollectionNameVO, sample: 'Summer Sale' },
    { name: 'VariantNameVO', factory: VariantNameVO, sample: 'Red / Large' },
  ];

  describe.each(nameVOs)('$name', ({ factory, sample }) => {
    it('should create with valid name', () => {
      expect(factory.create(sample).value).toBe(sample);
    });

    it('should trim whitespace', () => {
      expect(factory.create('  ' + sample + '  ').value).toBe(sample);
    });

    it('should reject empty string', () => {
      expect(() => factory.create('')).toThrow();
    });

    it('should reject too long names (>200 chars)', () => {
      expect(() => factory.create('A'.repeat(201))).toThrow();
    });
  });
});

describe('Slug VOs', () => {
  const slugVOs = [
    { name: 'BrandSlugVO', factory: BrandSlugVO, sample: 'sony' },
    { name: 'CategorySlugVO', factory: CategorySlugVO, sample: 'electronics' },
    { name: 'CollectionSlugVO', factory: CollectionSlugVO, sample: 'summer-sale' },
  ];

  describe.each(slugVOs)('$name', ({ factory, sample }) => {
    it('should create with valid slug', () => {
      expect(factory.create(sample).value).toBe(sample);
    });

    it('should lowercase input', () => {
      expect(factory.create(sample.toUpperCase()).value).toBe(sample);
    });

    it('should reject empty string', () => {
      expect(() => factory.create('')).toThrow();
    });

    it('should reject too long slugs', () => {
      expect(() => factory.create('a'.repeat(200))).toThrow();
    });
  });

  describe('BrandSlugVO.fromName()', () => {
    it('converts simple name', () => {
      expect(BrandSlugVO.fromName('Sony Corporation').value).toBe('sony-corporation');
    });
  });

  describe('CategorySlugVO.fromName()', () => {
    it('removes accents', () => {
      expect(CategorySlugVO.fromName('Café Resto').value).toBe('cafe-resto');
    });
  });
});
