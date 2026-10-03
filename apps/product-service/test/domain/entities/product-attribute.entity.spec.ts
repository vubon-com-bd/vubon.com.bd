/**
 * ProductAttributeEntity — unit tests
 */
import { ProductAttributeEntity } from '../../../src/module/domain/entities/product-attribute.entity.js';
import { ATTRIBUTE_TYPE, ATTRIBUTE } from '@vubon/shared-constants/business/product';
import { buildAttribute } from '../../fixtures.js';
import { PRODUCT_ID } from '../../helpers.js';

describe('ProductAttributeEntity', () => {
  describe('constructor invariants', () => {
    it('should reject invalid type', () => {
      expect(() => buildAttribute({ type: 'unknown' })).toThrow(Error);
    });

    it('should reject select without options', () => {
      expect(() =>
        buildAttribute({ type: ATTRIBUTE_TYPE.SELECT, options: [] }),
      ).toThrow(Error);
    });

    it('should reject too many options', () => {
      const tooMany = Array.from({ length: ATTRIBUTE.MAX_OPTIONS + 1 }, (_, i) => ({
        value: `v-${i}`, label: `L-${i}`, sortOrder: i,
      }));
      expect(() =>
        buildAttribute({ options: tooMany }),
      ).toThrow(Error);
    });

    it('should allow text type without options', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.TEXT, options: undefined });
      expect(attr.type).toBe(ATTRIBUTE_TYPE.TEXT);
    });
  });

  describe('rename()', () => {
    it('should update name and slug', () => {
      const attr = buildAttribute();
      attr.rename('New Name', 'new-slug');
      expect(attr.name).toBe('New Name');
      expect(attr.slug).toBe('new-slug');
    });

    it('should reject empty name', () => {
      const attr = buildAttribute();
      expect(() => attr.rename('', 'slug')).toThrow(Error);
    });

    it('should reject empty slug', () => {
      const attr = buildAttribute();
      expect(() => attr.rename('Name', '')).toThrow(Error);
    });
  });

  describe('changeFlags()', () => {
    it('should update individual flags', () => {
      const attr = buildAttribute();
      attr.changeFlags({ isRequired: true, isFilterable: false });
      expect(attr.isRequired).toBe(true);
      expect(attr.isFilterable).toBe(false);
    });
  });

  describe('addOption()', () => {
    it('should add a new option', () => {
      const attr = buildAttribute();
      attr.addOption({ value: 'green', label: 'Green', sortOrder: 3 });
      expect(attr.options?.length).toBe(3);
      expect(attr.hasOption('green')).toBe(true);
    });

    it('should reject duplicate option value', () => {
      const attr = buildAttribute();
      expect(() =>
        attr.addOption({ value: 'red', label: 'Red', sortOrder: 1 }),
      ).toThrow(Error);
    });

    it('should reject add on non-option type', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.TEXT, options: undefined });
      expect(() =>
        attr.addOption({ value: 'x', label: 'X', sortOrder: 0 }),
      ).toThrow(Error);
    });
  });

  describe('removeOption()', () => {
    it('should remove existing option', () => {
      const attr = buildAttribute();
      attr.removeOption('red');
      expect(attr.hasOption('red')).toBe(false);
    });

    it('should be no-op when options undefined', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.TEXT, options: undefined });
      attr.removeOption('x');
      expect(attr.options).toBeUndefined();
    });
  });

  describe('validateValue()', () => {
    it('TEXT accepts string', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.TEXT, options: undefined });
      expect(attr.validateValue('hello')).toBe(true);
      expect(attr.validateValue(123)).toBe(false);
    });

    it('NUMBER accepts finite number', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.NUMBER, options: undefined });
      expect(attr.validateValue(10)).toBe(true);
      expect(attr.validateValue(NaN)).toBe(false);
      expect(attr.validateValue('10')).toBe(false);
    });

    it('BOOLEAN accepts boolean', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.BOOLEAN, options: undefined });
      expect(attr.validateValue(true)).toBe(true);
      expect(attr.validateValue('true')).toBe(false);
    });

    it('SELECT requires option match', () => {
      const attr = buildAttribute();
      expect(attr.validateValue('red')).toBe(true);
      expect(attr.validateValue('purple')).toBe(false);
    });

    it('MULTISELECT requires array of valid options', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.MULTISELECT });
      expect(attr.validateValue(['red', 'blue'])).toBe(true);
      expect(attr.validateValue(['red', 'purple'])).toBe(false);
    });

    it('DATE requires valid ISO string', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.DATE, options: undefined });
      expect(attr.validateValue('2025-01-01')).toBe(true);
      expect(attr.validateValue('not-a-date')).toBe(false);
    });

    it('COLOR behaves like TEXT', () => {
      const attr = buildAttribute({ type: ATTRIBUTE_TYPE.COLOR, options: undefined });
      expect(attr.validateValue('#ff0000')).toBe(true);
    });
  });

  describe('setValue() / clearValue()', () => {
    it('should set valid value', () => {
      const attr = buildAttribute();
      attr.setValue('red');
      expect(attr.value).toBe('red');
    });

    it('should reject invalid value', () => {
      const attr = buildAttribute();
      expect(() => attr.setValue('purple')).toThrow(Error);
    });

    it('clearValue removes value', () => {
      const attr = buildAttribute();
      attr.setValue('red');
      attr.clearValue();
      expect(attr.value).toBeUndefined();
    });
  });

  describe('queries', () => {
    it('isOptionBased true for select/multiselect', () => {
      expect(buildAttribute().isOptionBased()).toBe(true);
      expect(buildAttribute({ type: ATTRIBUTE_TYPE.TEXT, options: undefined }).isOptionBased()).toBe(false);
    });

    it('hasOption', () => {
      const attr = buildAttribute();
      expect(attr.hasOption('red')).toBe(true);
      expect(attr.hasOption('purple')).toBe(false);
    });
  });

  void ProductAttributeEntity;
  void PRODUCT_ID;
});
