/**
 * Brand Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { CreateBrandHandler } from '../../../../src/module/application/commands/brand/create-brand.handler.js';
import { CreateBrandCommand } from '../../../../src/module/application/commands/brand/create-brand.command.js';
import { UpdateBrandHandler } from '../../../../src/module/application/commands/brand/update-brand.handler.js';
import { UpdateBrandCommand } from '../../../../src/module/application/commands/brand/update-brand.command.js';
import { DeleteBrandHandler } from '../../../../src/module/application/commands/brand/delete-brand.handler.js';
import { DeleteBrandCommand } from '../../../../src/module/application/commands/brand/delete-brand.command.js';
import { ActivateBrandHandler } from '../../../../src/module/application/commands/brand/activate-brand.handler.js';
import { ActivateBrandCommand } from '../../../../src/module/application/commands/brand/activate-brand.command.js';
import { DeactivateBrandHandler } from '../../../../src/module/application/commands/brand/deactivate-brand.handler.js';
import { DeactivateBrandCommand } from '../../../../src/module/application/commands/brand/deactivate-brand.command.js';
import { FeatureBrandHandler } from '../../../../src/module/application/commands/brand/feature-brand.handler.js';
import { FeatureBrandCommand } from '../../../../src/module/application/commands/brand/feature-brand.command.js';
import { createMockBrandService, type MockedBrandService } from '../../../mocks/services.js';
import { USER_ID, BRAND_ID } from '../../../helpers.js';

describe('Brand Command Handlers', () => {
  let service: MockedBrandService;

  beforeEach(() => {
    service = createMockBrandService();
    service.create.mockResolvedValue({} as never);
    service.update.mockResolvedValue({} as never);
    service.remove.mockResolvedValue(undefined);
    service.activate.mockResolvedValue({} as never);
    service.deactivate.mockResolvedValue({} as never);
    service.feature.mockResolvedValue({} as never);
  });

  describe('CreateBrandHandler', () => {
    it('should call service.create with dto + actorId', async () => {
      const handler = new CreateBrandHandler(service);
      const dto = { name: 'Sony', slug: 'sony' };

      await handler.execute(new CreateBrandCommand(dto as never, USER_ID));

      expect(service.create).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('UpdateBrandHandler', () => {
    it('should call service.update with dto + actorId', async () => {
      const handler = new UpdateBrandHandler(service);
      const dto = { brandId: BRAND_ID, name: 'Sony Updated' };

      await handler.execute(new UpdateBrandCommand(dto as never, USER_ID));

      expect(service.update).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('DeleteBrandHandler', () => {
    it('should call service.remove with brandId + actorId', async () => {
      const handler = new DeleteBrandHandler(service);

      await handler.execute(new DeleteBrandCommand(BRAND_ID, USER_ID));

      expect(service.remove).toHaveBeenCalledWith(BRAND_ID, USER_ID);
    });
  });

  describe('ActivateBrandHandler', () => {
    it('should call service.activate', async () => {
      const handler = new ActivateBrandHandler(service);

      await handler.execute(new ActivateBrandCommand(BRAND_ID, USER_ID));

      expect(service.activate).toHaveBeenCalledWith(BRAND_ID, USER_ID);
    });
  });

  describe('DeactivateBrandHandler', () => {
    it('should call service.deactivate', async () => {
      const handler = new DeactivateBrandHandler(service);

      await handler.execute(new DeactivateBrandCommand(BRAND_ID, USER_ID));

      expect(service.deactivate).toHaveBeenCalledWith(BRAND_ID, USER_ID);
    });
  });

  describe('FeatureBrandHandler', () => {
    it('should call service.feature', async () => {
      const handler = new FeatureBrandHandler(service);

      await handler.execute(new FeatureBrandCommand(BRAND_ID, USER_ID));

      expect(service.feature).toHaveBeenCalledWith(BRAND_ID, USER_ID);
    });
  });
});
