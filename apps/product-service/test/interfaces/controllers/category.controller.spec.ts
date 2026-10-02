/**
 * CategoryController — unit tests
 */
import { jest } from '@jest/globals';
import { CategoryController } from '../../../src/module/interfaces/controllers/rest/category.controller.js';
import { CreateCategoryCommand } from '../../../src/module/application/commands/category/create-category.command.js';
import { UpdateCategoryCommand } from '../../../src/module/application/commands/category/update-category.command.js';
import { DeleteCategoryCommand } from '../../../src/module/application/commands/category/delete-category.command.js';
import { MoveCategoryCommand } from '../../../src/module/application/commands/category/move-category.command.js';
import { GetCategoryQuery } from '../../../src/module/application/queries/category/get-category.query.js';
import { GetCategoryTreeQuery } from '../../../src/module/application/queries/category/get-category-tree.query.js';
import { ListCategoriesByParentQuery } from '../../../src/module/application/queries/category/list-categories-by-parent.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockAdmin } from '../../mocks/users.js';
import { CATEGORY_ID } from '../../helpers.js';

describe('CategoryController', () => {
  let controller: CategoryController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new CategoryController(commandBus, queryBus);
  });

  describe('create', () => {
    it('should dispatch CreateCategoryCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.create({ name: 'Electronics', slug: 'electronics' } as never, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateCategoryCommand));
    });
  });

  describe('tree', () => {
    it('should dispatch GetCategoryTreeQuery', async () => {
      queryBus.execute.mockResolvedValueOnce([]);
      const result = await controller.tree();
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetCategoryTreeQuery));
      expect(result).toEqual([]);
    });
  });

  describe('roots', () => {
    it('should dispatch ListCategoriesByParentQuery without parentId', async () => {
      queryBus.execute.mockResolvedValueOnce([]);
      await controller.roots();
      const q = queryBus.execute.mock.calls[0][0] as ListCategoriesByParentQuery;
      expect(q.parentId).toBeUndefined();
    });
  });

  describe('byParent', () => {
    it('should dispatch with parentId', async () => {
      queryBus.execute.mockResolvedValueOnce([]);
      await controller.byParent(CATEGORY_ID);
      const q = queryBus.execute.mock.calls[0][0] as ListCategoriesByParentQuery;
      expect(q.parentId).toBe(CATEGORY_ID);
    });
  });

  describe('getById', () => {
    it('should dispatch GetCategoryQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(null);
      await controller.getById(CATEGORY_ID);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetCategoryQuery));
    });
  });

  describe('update', () => {
    it('should dispatch UpdateCategoryCommand', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.update(CATEGORY_ID, { name: 'Updated' } as never, mockAdmin() as never);
      const cmd = commandBus.execute.mock.calls[0][0] as UpdateCategoryCommand;
      expect(cmd.dto.categoryId).toBe(CATEGORY_ID);
    });
  });

  describe('move', () => {
    it('should dispatch MoveCategoryCommand with newParentId', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.move(CATEGORY_ID, { newParentId: 'new-parent' }, mockAdmin() as never);
      const cmd = commandBus.execute.mock.calls[0][0] as MoveCategoryCommand;
      expect(cmd.categoryId).toBe(CATEGORY_ID);
      expect(cmd.newParentId).toBe('new-parent');
    });

    it('should accept null newParentId (move to root)', async () => {
      commandBus.execute.mockResolvedValueOnce({});
      await controller.move(CATEGORY_ID, { newParentId: null }, mockAdmin() as never);
      const cmd = commandBus.execute.mock.calls[0][0] as MoveCategoryCommand;
      expect(cmd.newParentId).toBeNull();
    });
  });

  describe('remove', () => {
    it('should dispatch DeleteCategoryCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(undefined);
      await controller.remove(CATEGORY_ID, mockAdmin() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteCategoryCommand));
    });
  });
});
