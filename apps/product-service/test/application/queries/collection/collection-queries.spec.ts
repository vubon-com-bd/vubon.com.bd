/**
 * Collection Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { GetCollectionHandler } from '../../../../src/module/application/queries/collection/get-collection.handler.js';
import { GetCollectionQuery } from '../../../../src/module/application/queries/collection/get-collection.query.js';
import { ListFeaturedCollectionsHandler } from '../../../../src/module/application/queries/collection/list-featured-collections.handler.js';
import { ListFeaturedCollectionsQuery } from '../../../../src/module/application/queries/collection/list-featured-collections.query.js';
import { ListActiveCollectionsHandler } from '../../../../src/module/application/queries/collection/list-active-collections.handler.js';
import { ListActiveCollectionsQuery } from '../../../../src/module/application/queries/collection/list-active-collections.query.js';
import { createMockCollectionService, type MockedCollectionService } from '../../../mocks/services.js';
import { createMockCollectionRepository, type MockedCollectionRepository } from '../../../mocks/repositories.js';
import { buildCollection } from '../../../fixtures.js';
import { COLLECTION_ID } from '../../../helpers.js';

describe('Collection Query Handlers', () => {
  describe('GetCollectionHandler', () => {
    it('should return null when not found', async () => {
      const repo = createMockCollectionRepository();
      repo.findById.mockResolvedValueOnce(null);

      const handler = new GetCollectionHandler(repo);
      const result = await handler.execute(new GetCollectionQuery(COLLECTION_ID));

      expect(result).toBeNull();
    });

    it('should return mapped DTO when found', async () => {
      const repo = createMockCollectionRepository();
      repo.findById.mockResolvedValueOnce(buildCollection());

      const handler = new GetCollectionHandler(repo);
      const result = await handler.execute(new GetCollectionQuery(COLLECTION_ID));

      expect(result?.id).toBe(COLLECTION_ID);
    });
  });

  describe('ListFeaturedCollectionsHandler', () => {
    let service: MockedCollectionService;

    beforeEach(() => {
      service = createMockCollectionService();
      service.listFeatured.mockResolvedValue([]);
    });

    it('should call service.listFeatured with limit', async () => {
      const handler = new ListFeaturedCollectionsHandler(service);

      await handler.execute(new ListFeaturedCollectionsQuery(5));

      expect(service.listFeatured).toHaveBeenCalledWith(5);
    });

    it('should accept undefined limit', async () => {
      const handler = new ListFeaturedCollectionsHandler(service);

      await handler.execute(new ListFeaturedCollectionsQuery());

      expect(service.listFeatured).toHaveBeenCalledWith(undefined);
    });
  });

  describe('ListActiveCollectionsHandler', () => {
    it('should call service.listActive', async () => {
      const service = createMockCollectionService();
      service.listActive.mockResolvedValue([]);

      const handler = new ListActiveCollectionsHandler(service);
      const result = await handler.execute(new ListActiveCollectionsQuery());

      expect(service.listActive).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
