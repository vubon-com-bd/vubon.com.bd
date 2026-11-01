/**
 * ProductControllerMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductControllerMapper } from '../../../../src/module/interfaces/mappers/product.controller.mapper.js';

describe('ProductControllerMapper', () => {
  const VALID_UUID = '11111111-1111-4111-8111-111111111111';
  const CATEGORY_ID = '22222222-2222-4222-8222-222222222222';

  describe('toCreateAppDto()', () => {
    it('maps HTTP DTO to app DTO', () => {
      const http = {
        name: 'Test Product',
        slug: 'test-product',
        sku: 'TEST-SKU-001',
        type: 'physical',
        categoryId: CATEGORY_ID,
        price: 1000,
        currency: 'BDT',
      };
      const result = ProductControllerMapper.toCreateAppDto(http as never);
      expect(result.name).toBe('Test Product');
      expect(result.slug).toBe('test-product');
      expect(result.sku).toBe('TEST-SKU-001');
      expect(result.type).toBe('physical');
      expect(result.price).toBe(1000);
      expect(result.currency).toBe('BDT');
    });

    it('preserves optional fields', () => {
      const http = {
        name: 'Test',
        slug: 'test',
        sku: 'TEST-001',
        type: 'physical',
        categoryId: CATEGORY_ID,
        price: 100,
        currency: 'BDT',
        description: 'Test desc',
        tags: ['tag1', 'tag2'],
      };
      const result = ProductControllerMapper.toCreateAppDto(http as never);
      expect(result.description).toBe('Test desc');
      expect(result.tags).toEqual(['tag1', 'tag2']);
    });
  });

  describe('toUpdateAppDto()', () => {
    it('maps patch + productId', () => {
      const patch = {
        name: 'Updated',
        description: 'New desc',
        isFeatured: true,
      };
      const result = ProductControllerMapper.toUpdateAppDto(
        VALID_UUID,
        patch as never,
      );
      expect(result.productId).toBe(VALID_UUID);
      expect(result.patch.name).toBe('Updated');
      expect(result.patch.isFeatured).toBe(true);
    });

    it('includes actorId when provided', () => {
      const result = ProductControllerMapper.toUpdateAppDto(
        VALID_UUID,
        { name: 'X' } as never,
        'user-123',
      );
      expect(result.actorId).toBe('user-123');
    });
  });

  describe('toListOptions()', () => {
    it('maps query to list options', () => {
      const q = {
        page: 1,
        limit: 20,
        status: 'published',
        categoryId: CATEGORY_ID,
      };
      const result = ProductControllerMapper.toListOptions(q as never);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.filter?.status).toBe('published');
      expect(result.filter?.categoryId).toBe(CATEGORY_ID);
    });

    it('applies defaults for page + limit', () => {
      const result = ProductControllerMapper.toListOptions({} as never);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });
  });
});
