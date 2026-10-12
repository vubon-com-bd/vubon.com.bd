/**
 * Handler tests — featured, top-rated, search (with mocked services)
 * @module vendor-service/test/unit/application/queries/vendor
 */
import { jest } from '@jest/globals';
import { FindFeaturedVendorsHandler } from '../../../../../src/module/application/queries/vendor/find-featured-vendors.handler.js';
import { FindTopRatedVendorsHandler } from '../../../../../src/module/application/queries/vendor/find-top-rated-vendors.handler.js';
import { SearchVendorsHandler } from '../../../../../src/module/application/queries/vendor/search-vendors.handler.js';
import { FindFeaturedVendorsQuery } from '../../../../../src/module/application/queries/vendor/find-featured-vendors.query.js';
import { FindTopRatedVendorsQuery } from '../../../../../src/module/application/queries/vendor/find-top-rated-vendors.query.js';
import { SearchVendorsQuery } from '../../../../../src/module/application/queries/vendor/search-vendors.query.js';

describe('Vendor Query Handlers', () => {
  let mockSearchService: {
    search: jest.Mock;
    searchPublic: jest.Mock;
    findTopRated: jest.Mock;
    findFeatured: jest.Mock;
  };

  beforeEach(() => {
    mockSearchService = {
      search: jest.fn().mockResolvedValue({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      }),
      searchPublic: jest.fn().mockResolvedValue([]),
      findTopRated: jest.fn().mockResolvedValue([]),
      findFeatured: jest.fn().mockResolvedValue([]),
    };
  });

  describe('FindFeaturedVendorsHandler', () => {
    it('calls searchService.findFeatured with limit', async () => {
      const handler = new FindFeaturedVendorsHandler(mockSearchService as never);
      const r = await handler.execute(new FindFeaturedVendorsQuery(10));
      expect(mockSearchService.findFeatured).toHaveBeenCalledWith(10);
      expect(r).toEqual([]);
    });

    it('uses default limit 10 when not provided', async () => {
      const handler = new FindFeaturedVendorsHandler(mockSearchService as never);
      await handler.execute(new FindFeaturedVendorsQuery());
      expect(mockSearchService.findFeatured).toHaveBeenCalledWith(10);
    });
  });

  describe('FindTopRatedVendorsHandler', () => {
    it('calls searchService.findTopRated with limit', async () => {
      const handler = new FindTopRatedVendorsHandler(mockSearchService as never);
      const r = await handler.execute(new FindTopRatedVendorsQuery(5));
      expect(mockSearchService.findTopRated).toHaveBeenCalledWith(5);
      expect(r).toEqual([]);
    });

    it('uses default limit 10', async () => {
      const handler = new FindTopRatedVendorsHandler(mockSearchService as never);
      await handler.execute(new FindTopRatedVendorsQuery());
      expect(mockSearchService.findTopRated).toHaveBeenCalledWith(10);
    });
  });

  describe('SearchVendorsHandler', () => {
    it('calls searchService.search with input', async () => {
      const handler = new SearchVendorsHandler(mockSearchService as never);
      const input = { query: 'acme', page: 1, limit: 20 };
      const r = await handler.execute(new SearchVendorsQuery(input));
      expect(mockSearchService.search).toHaveBeenCalledWith(input);
      expect(r.total).toBe(0);
    });

    it('handles empty results', async () => {
      const handler = new SearchVendorsHandler(mockSearchService as never);
      const r = await handler.execute(new SearchVendorsQuery({ page: 1, limit: 20 }));
      expect(r.items).toEqual([]);
    });
  });
});
