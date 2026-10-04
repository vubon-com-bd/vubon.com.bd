/**
 * Brand Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { GetBrandHandler } from '../../../../src/module/application/queries/brand/get-brand.handler.js';
import { GetBrandQuery } from '../../../../src/module/application/queries/brand/get-brand.query.js';
import { GetBrandBySlugHandler } from '../../../../src/module/application/queries/brand/get-brand-by-slug.handler.js';
import { GetBrandBySlugQuery } from '../../../../src/module/application/queries/brand/get-brand-by-slug.query.js';
import { ListFeaturedBrandsHandler } from '../../../../src/module/application/queries/brand/list-featured-brands.handler.js';
import { ListFeaturedBrandsQuery } from '../../../../src/module/application/queries/brand/list-featured-brands.query.js';
import {
  createMockBrandService,
  type MockedBrandService,
} from '../../../mocks/services.js';
import { BRAND_ID } from '../../../helpers.js';

describe('Brand Query Handlers', () => {
  let service: MockedBrandService;

  beforeEach(() => {
    service = createMockBrandService();
    service.getById.mockResolvedValue(null);
    service.getBySlug.mockResolvedValue(null);
    service.listFeatured.mockResolvedValue([]);
  });

  describe('GetBrandHandler', () => {
    it('should call service.getById', async () => {
      const handler = new GetBrandHandler(service);

      const result = await handler.execute(new GetBrandQuery(BRAND_ID));

      expect(service.getById).toHaveBeenCalledWith(BRAND_ID);
      expect(result).toBeNull();
    });
  });

  describe('GetBrandBySlugHandler', () => {
    it('should call service.getBySlug', async () => {
      const handler = new GetBrandBySlugHandler(service);

      await handler.execute(new GetBrandBySlugQuery('sony'));

      expect(service.getBySlug).toHaveBeenCalledWith('sony');
    });
  });

  describe('ListFeaturedBrandsHandler', () => {
    it('should call service.listFeatured with limit', async () => {
      const handler = new ListFeaturedBrandsHandler(service);

      await handler.execute(new ListFeaturedBrandsQuery(10));

      expect(service.listFeatured).toHaveBeenCalledWith(10);
    });

    it('should accept undefined limit', async () => {
      const handler = new ListFeaturedBrandsHandler(service);

      await handler.execute(new ListFeaturedBrandsQuery());

      expect(service.listFeatured).toHaveBeenCalledWith(undefined);
    });
  });
});
