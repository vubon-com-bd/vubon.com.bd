/**
 * CollectionTypeVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CollectionTypeVO } from '../../../../src/module/domain/value-objects/primitives/collection-type.vo.js';

describe('CollectionTypeVO', () => {
  describe('create()', () => {
    it('creates manual', () => {
      expect(CollectionTypeVO.create('manual').value).toBe('manual');
    });
    it('creates automatic', () => {
      expect(CollectionTypeVO.create('automatic').value).toBe('automatic');
    });
    it('creates featured', () => {
      expect(CollectionTypeVO.create('featured').value).toBe('featured');
    });
    it('creates trending', () => {
      expect(CollectionTypeVO.create('trending').value).toBe('trending');
    });
    it('creates best_seller', () => {
      expect(CollectionTypeVO.create('best_seller').value).toBe('best_seller');
    });
    it('normalizes case', () => {
      expect(CollectionTypeVO.create('MANUAL').value).toBe('manual');
    });
    it('throws for invalid', () => {
      expect(() => CollectionTypeVO.create('random')).toThrow();
    });
  });

  describe('predicates', () => {
    it('isManual', () => expect(CollectionTypeVO.create('manual').isManual()).toBe(true));
    it('isAutomatic', () => expect(CollectionTypeVO.create('automatic').isAutomatic()).toBe(true));
    it('isFeatured', () => expect(CollectionTypeVO.create('featured').isFeatured()).toBe(true));
    it('isTrending', () => expect(CollectionTypeVO.create('trending').isTrending()).toBe(true));
    it('isNewArrival', () => expect(CollectionTypeVO.create('new_arrival').isNewArrival()).toBe(true));
    it('isBestSeller', () => expect(CollectionTypeVO.create('best_seller').isBestSeller()).toBe(true));
    it('isSeasonal', () => expect(CollectionTypeVO.create('seasonal').isSeasonal()).toBe(true));
  });

  describe('isCurated()', () => {
    it('manual is curated', () => {
      expect(CollectionTypeVO.create('manual').isCurated()).toBe(true);
    });
    it('automatic is not curated', () => {
      expect(CollectionTypeVO.create('automatic').isCurated()).toBe(false);
    });
  });
});
