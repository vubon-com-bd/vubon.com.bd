/**
 * CollectionService — unit tests
 */
import { jest } from '@jest/globals';
import { CollectionService } from '../../../src/module/application/services/impl/collection.service.js';
import { CollectionNotFoundApplicationError, CollectionSlugConflictError } from '../../../src/module/application/errors/collection.errors.js';
import { createMockCollectionRepository, type MockedCollectionRepository } from '../../mocks/repositories.js';
import { buildCollection } from '../../fixtures.js';
import { USER_ID, PRODUCT_ID, COLLECTION_ID } from '../../helpers.js';

describe('CollectionService', () => {
  let service: CollectionService;
  let repo: MockedCollectionRepository;

  beforeEach(() => {
    repo = createMockCollectionRepository();
    repo.save.mockImplementation(async (e) => e);
    repo.existsBySlug.mockResolvedValue(false);
    service = new CollectionService(repo);
  });

  describe('create()', () => {
    it('should create collection', async () => {
      const result = await service.create({
        name: 'Summer Sale',
        slug: 'summer-sale',
        type: 'manual',
      }, USER_ID);
      expect(result.name).toBe('Summer Sale');
    });

    it('should reject duplicate slug', async () => {
      repo.existsBySlug.mockResolvedValueOnce(true);
      await expect(
        service.create({ name: 'X', slug: 'dup', type: 'manual' }, USER_ID),
      ).rejects.toThrow(CollectionSlugConflictError);
    });
  });

  describe('update()', () => {
    it('should update collection', async () => {
      const col = buildCollection();
      repo.findById.mockResolvedValueOnce(col);

      const result = await service.update({
        collectionId: COLLECTION_ID,
        name: 'Winter Sale',
      });
      expect(result.name).toBe('Winter Sale');
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ collectionId: 'missing' }),
      ).rejects.toThrow(CollectionNotFoundApplicationError);
    });
  });

  describe('remove()', () => {
    it('should softDelete collection', async () => {
      const col = buildCollection();
      repo.findById.mockResolvedValueOnce(col);
      await service.remove(COLLECTION_ID, USER_ID);
      expect(col.status).toBe('deleted');
    });
  });

  describe('addProduct() / removeProduct()', () => {
    it('should add product', async () => {
      const col = buildCollection();
      repo.findById.mockResolvedValueOnce(col);

      const result = await service.addProduct(COLLECTION_ID, PRODUCT_ID, USER_ID);
      expect(result.productCount).toBe(1);
    });

    it('should remove product', async () => {
      const col = buildCollection({ productIds: [PRODUCT_ID] });
      repo.findById.mockResolvedValueOnce(col);

      const result = await service.removeProduct(COLLECTION_ID, PRODUCT_ID, USER_ID);
      expect(result.productCount).toBe(0);
    });
  });

  describe('listFeatured / listActive', () => {
    it('listFeatured', async () => {
      repo.findFeatured.mockResolvedValueOnce([buildCollection({ isFeatured: true })]);
      const result = await service.listFeatured();
      expect(result.length).toBe(1);
    });

    it('listActive', async () => {
      repo.findActive.mockResolvedValueOnce([buildCollection({ status: 'active' })]);
      const result = await service.listActive();
      expect(result.length).toBe(1);
    });
  });
});
