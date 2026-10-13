/**
 * ProductDescriptionVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/product-description.vo.js';

describe('ProductDescriptionVO', () => {
  describe('create()', () => {
    it('creates valid description', () => {
      const vo = ProductDescriptionVO.create('A great product description');
      expect(vo.value).toBe('A great product description');
    });

    it('trims whitespace', () => {
      const vo = ProductDescriptionVO.create('  desc  ');
      expect(vo.value).toBe('desc');
    });

    it('throws for empty string', () => {
      expect(() => ProductDescriptionVO.create('')).toThrow();
    });

    it('throws for whitespace only', () => {
      expect(() => ProductDescriptionVO.create('   ')).toThrow();
    });

    it('throws for > 5000 chars', () => {
      expect(() => ProductDescriptionVO.create('A'.repeat(5001))).toThrow();
    });
  });

  describe('wordCount()', () => {
    it('counts words', () => {
      const vo = ProductDescriptionVO.create('This is a test');
      expect(vo.wordCount).toBe(4);
    });

    it('0 for empty after trim would throw, test single word', () => {
      const vo = ProductDescriptionVO.create('word');
      expect(vo.wordCount).toBe(1);
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = ProductDescriptionVO.reconstitute('X');
      expect(vo.value).toBe('X');
    });
  });
});
