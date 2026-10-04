/**
 * Category Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { GetCategoryHandler } from '../../../../src/module/application/queries/category/get-category.handler.js';
import { GetCategoryQuery } from '../../../../src/module/application/queries/category/get-category.query.js';
import { GetCategoryTreeHandler } from '../../../../src/module/application/queries/category/get-category-tree.handler.js';
import { GetCategoryTreeQuery } from '../../../../src/module/application/queries/category/get-category-tree.query.js';
import { ListCategoriesByParentHandler } from '../../../../src/module/application/queries/category/list-categories-by-parent.handler.js';
import { ListCategoriesByParentQuery } from '../../../../src/module/application/queries/category/list-categories-by-parent.query.js';
import { createMockCategoryService, type MockedCategoryService } from '../../../mocks/services.js';
import { createMockCategoryRepository, type MockedCategoryRepository } from '../../../mocks/repositories.js';
import { buildCategory } from '../../../fixtures.js';
import { CATEGORY_ID } from '../../../helpers.js';

describe('Category Query Handlers', () => {
  describe('GetCategoryHandler', () => {
    it('should call service.getById', async () => {
      const service = createMockCategoryService();
      service.getById.mockResolvedValue(null);

      const handler = new GetCategoryHandler(service);

      const result = await handler.execute(new GetCategoryQuery(CATEGORY_ID));

      expect(service.getById).toHaveBeenCalledWith(CATEGORY_ID);
      expect(result).toBeNull();
    });
  });

  describe('GetCategoryTreeHandler', () => {
    it('should call service.getTree', async () => {
      const service = createMockCategoryService();
      service.getTree.mockResolvedValue([]);

      const handler = new GetCategoryTreeHandler(service);

      const result = await handler.execute(new GetCategoryTreeQuery());

      expect(service.getTree).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('ListCategoriesByParentHandler', () => {
    let repo: MockedCategoryRepository;

    beforeEach(() => {
      repo = createMockCategoryRepository();
    });

    it('should find roots when no parentId', async () => {
      repo.findRoots.mockResolvedValueOnce([]);

      const handler = new ListCategoriesByParentHandler(repo);
      const result = await handler.execute(new ListCategoriesByParentQuery());

      expect(repo.findRoots).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should find by parentId when provided', async () => {
      repo.findByParentId.mockResolvedValueOnce([buildCategory()]);

      const handler = new ListCategoriesByParentHandler(repo);
      const result = await handler.execute(new ListCategoriesByParentQuery(CATEGORY_ID));

      expect(repo.findByParentId).toHaveBeenCalled();
      expect(result.length).toBe(1);
    });
  });
});
