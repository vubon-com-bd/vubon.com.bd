/**
 * ProductPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductPrismaMapper } from '../../../../src/module/infrastructure/persistence/prisma/mappers/product.prisma.mapper.js';
import type { PrismaProductRow } from '../../../../src/module/infrastructure/persistence/prisma/mappers/product.prisma.mapper.js';

function buildRow(): PrismaProductRow {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'Test Product',
    slug: 'test-product',
    sku: 'TEST-SKU-001',
    description: 'Description',
    shortDescription: 'Short',
    type: 'physical',
    status: 'draft',
    categoryId: '22222222-2222-4222-8222-222222222222',
    brandId: null,
    vendorId: null,
    tags: ['tag1'],
    images: ['https://example.com/img.jpg'],
    thumbnailUrl: null,
    videoUrl: null,
    barcode: null,
    weightGrams: 250,
    dimensionLength: 10,
    dimensionWidth: 20,
    dimensionHeight: 5,
    dimensionUnit: 'cm',
    totalStock: 100,
    isFeatured: false,
    isPublished: false,
    publishedAt: null,
    rejectionReason: null,
    archivedAt: null,
    version: 1,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
    deletedAt: null,
    deletedBy: null,
  };
}

describe('ProductPrismaMapper', () => {
  describe('toDomain()', () => {
    it('maps raw row to entity', () => {
      const entity = ProductPrismaMapper.toDomain(buildRow());
      expect(entity.id).toBe('11111111-1111-4111-8111-111111111111');
      expect(entity.vo.name.value).toBe('Test Product');
      expect(entity.vo.slug.value).toBe('test-product');
      expect(entity.vo.sku.value).toBe('TEST-SKU-001');
      expect(entity.vo.totalStock).toBe(100);
      expect(entity.version).toBe(1);
    });

    it('handles nullable fields', () => {
      const row = buildRow();
      const entity = ProductPrismaMapper.toDomain({
        ...row,
        description: null,
        shortDescription: null,
        brandId: null,
        thumbnailUrl: null,
      });
      expect(entity.vo.description).toBeUndefined();
      expect(entity.vo.brandId).toBeUndefined();
    });

    it('preserves dates', () => {
      const entity = ProductPrismaMapper.toDomain(buildRow());
      expect(entity.createdAt).toBe('2026-01-01T00:00:00.000Z');
      expect(entity.updatedAt).toBe('2026-01-02T00:00:00.000Z');
    });
  });

  describe('toPersistence()', () => {
    it('round-trips correctly', () => {
      const entity = ProductPrismaMapper.toDomain(buildRow());
      const data = ProductPrismaMapper.toPersistence(entity);
      expect(data['id']).toBe('11111111-1111-4111-8111-111111111111');
      expect(data['name']).toBe('Test Product');
      expect(data['slug']).toBe('test-product');
      expect(data['sku']).toBe('TEST-SKU-001');
      expect(data['totalStock']).toBe(100);
      expect(data['version']).toBe(1);
    });

    it('handles undefined fields', () => {
      const entity = ProductPrismaMapper.toDomain(buildRow());
      const data = ProductPrismaMapper.toPersistence(entity);
      expect(data['brandId']).toBeNull();
      expect(data['barcode']).toBeNull();
    });
  });
});
