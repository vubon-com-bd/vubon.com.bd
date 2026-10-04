/**
 * Category Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { CreateCategoryHandler } from '../../../../src/module/application/commands/category/create-category.handler.js';
import { CreateCategoryCommand } from '../../../../src/module/application/commands/category/create-category.command.js';
import { UpdateCategoryHandler } from '../../../../src/module/application/commands/category/update-category.handler.js';
import { UpdateCategoryCommand } from '../../../../src/module/application/commands/category/update-category.command.js';
import { DeleteCategoryHandler } from '../../../../src/module/application/commands/category/delete-category.handler.js';
import { DeleteCategoryCommand } from '../../../../src/module/application/commands/category/delete-category.command.js';
import { MoveCategoryHandler } from '../../../../src/module/application/commands/category/move-category.handler.js';
import { MoveCategoryCommand } from '../../../../src/module/application/commands/category/move-category.command.js';
import { ActivateCategoryHandler } from '../../../../src/module/application/commands/category/activate-category.handler.js';
import { ActivateCategoryCommand } from '../../../../src/module/application/commands/category/activate-category.command.js';
import { DeactivateCategoryHandler } from '../../../../src/module/application/commands/category/deactivate-category.handler.js';
import { DeactivateCategoryCommand } from '../../../../src/module/application/commands/category/deactivate-category.command.js';
import { createMockCategoryService, type MockedCategoryService } from '../../../mocks/services.js';
import { USER_ID, CATEGORY_ID } from '../../../helpers.js';

describe('Category Command Handlers', () => {
  let service: MockedCategoryService;

  beforeEach(() => {
    service = createMockCategoryService();
    service.create.mockResolvedValue({} as never);
    service.update.mockResolvedValue({} as never);
    service.remove.mockResolvedValue(undefined);
    service.move.mockResolvedValue({} as never);
    service.activate.mockResolvedValue({} as never);
    service.deactivate.mockResolvedValue({} as never);
  });

  describe('CreateCategoryHandler', () => {
    it('should call service.create with dto + actorId', async () => {
      const handler = new CreateCategoryHandler(service);
      const dto = { name: 'Electronics', slug: 'electronics' };

      await handler.execute(new CreateCategoryCommand(dto as never, USER_ID));

      expect(service.create).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('UpdateCategoryHandler', () => {
    it('should call service.update with dto + actorId', async () => {
      const handler = new UpdateCategoryHandler(service);
      const dto = { categoryId: CATEGORY_ID, name: 'Updated' };

      await handler.execute(new UpdateCategoryCommand(dto as never, USER_ID));

      expect(service.update).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('DeleteCategoryHandler', () => {
    it('should call service.remove', async () => {
      const handler = new DeleteCategoryHandler(service);

      await handler.execute(new DeleteCategoryCommand(CATEGORY_ID, USER_ID));

      expect(service.remove).toHaveBeenCalledWith(CATEGORY_ID, USER_ID);
    });
  });

  describe('MoveCategoryHandler', () => {
    it('should call service.move with new parent', async () => {
      const handler = new MoveCategoryHandler(service);

      await handler.execute(new MoveCategoryCommand(CATEGORY_ID, 'new-parent-id', USER_ID));

      expect(service.move).toHaveBeenCalledWith(CATEGORY_ID, 'new-parent-id', USER_ID);
    });

    it('should accept null newParentId (move to root)', async () => {
      const handler = new MoveCategoryHandler(service);

      await handler.execute(new MoveCategoryCommand(CATEGORY_ID, null, USER_ID));

      expect(service.move).toHaveBeenCalledWith(CATEGORY_ID, null, USER_ID);
    });
  });

  describe('ActivateCategoryHandler', () => {
    it('should call service.activate', async () => {
      const handler = new ActivateCategoryHandler(service);

      await handler.execute(new ActivateCategoryCommand(CATEGORY_ID, USER_ID));

      expect(service.activate).toHaveBeenCalledWith(CATEGORY_ID, USER_ID);
    });
  });

  describe('DeactivateCategoryHandler', () => {
    it('should call service.deactivate', async () => {
      const handler = new DeactivateCategoryHandler(service);

      await handler.execute(new DeactivateCategoryCommand(CATEGORY_ID, USER_ID));

      expect(service.deactivate).toHaveBeenCalledWith(CATEGORY_ID, USER_ID);
    });
  });
});
