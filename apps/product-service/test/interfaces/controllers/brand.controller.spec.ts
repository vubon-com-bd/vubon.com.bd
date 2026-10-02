/**
 * BrandController — unit tests
 */
import { jest } from '@jest/globals';
import { BrandController } from '../../../src/module/interfaces/controllers/rest/brand.controller.js';
import { CreateBrandCommand } from '../../../src/module/application/commands/brand/create-brand.command.js';
import { UpdateBrandCommand } from '../../../src/module/application/commands/brand/update-brand.command.js';
import { DeleteBrandCommand } from '../../../src/module/application/commands/brand/delete-brand.command.js';
import { ActivateBrandCommand } from '../../../src/module/application/commands/brand/activate-brand.command.js';
import { DeactivateBrandCommand } from '../../../src/module/application/commands/brand/deactivate-brand.command.js';
import { FeatureBrandCommand } from '../../../src/module/application/commands/brand/feature-brand.command.js';
import { GetBrandQuery } from '../../../src/module/application/queries/brand/get-brand.query.js';
import { GetBrandBySlugQuery } from '../../../src/module/application/queries/brand/get-brand-by-slug.query.js';
import { ListFeaturedBrandsQuery } from '../../../src/module/application/queries/brand/list-featured-brands.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockAdmin } from '../../mocks/users.js';
import { BRAND_ID, USER_ID } from '../../helpers.js';

describe('BrandController', () => {
  let controller: BrandController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new BrandController(commandBus, queryBus);
  });

  describe('create', () => {
    it('should dispatch CreateBrandCommand with actorId', async () => {
      commandBus.execute.mockResolvedValueOnce({});

      await controller.create({ name: 'Sony', slug: 'sony' } as never, mockAdmin() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as CreateBrandCommand;
      expect(cmd.actorId).toBe(USER_ID === 'user-11111111-1111-1111-1111-111111111111' ? 'admin-11111111-1111-1111-1111-111111111111' : USER_ID);
    });
  });

  describe('featured', () => {
    it('should dispatch ListFeaturedBrandsQuery with limit', async () => {
      queryBus.execute.mockResolvedValueOnce([]);
      await controller.featured(15);
      const q = queryBus.execute.mock.calls[0][0] as ListFeaturedBrandsQuery;
      expect(q.limit).toBe(15);
    });
  });

  describe('getBySlug', () => {
    it('should dispatch GetBrandBySlugQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(null);
      await controller.getBySlug('sony');
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetBrandBySlugQuery));
    });
  });

  describe('getById', () => {
    it('should dispatch GetBrandQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(null);
      await controller.getById(BRAND_ID);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetBrandQuery));
    });
  });

  describe('update', () => {
    it('should dispatch UpdateBrandCommand with brandId + actorId', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.update(BRAND_ID, { name: 'Sony Updated' } as never, mockAdmin() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as UpdateBrandCommand;
      expect(cmd.dto.brandId).toBe(BRAND_ID);
      expect(cmd.actorId).toBe('admin-11111111-1111-1111-1111-111111111111');
    });
  });

  describe('activate / deactivate / feature', () => {
    it('activate', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.activate(BRAND_ID, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ActivateBrandCommand));
    });

    it('deactivate', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.deactivate(BRAND_ID, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeactivateBrandCommand));
    });

    it('feature', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.feature(BRAND_ID, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(FeatureBrandCommand));
    });
  });

  describe('remove', () => {
    it('should dispatch DeleteBrandCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(undefined);
      await controller.remove(BRAND_ID, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteBrandCommand));
    });
  });
});
