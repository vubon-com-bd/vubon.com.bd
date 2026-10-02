/**
 * CategoryService — unit tests
 */
import { jest } from '@jest/globals';
import { CategoryService } from '../../../src/module/application/services/impl/category.service.js';
import { CategoryNotFoundApplicationError, CategorySlugConflictError } from '../../../src/module/application/errors/category.errors.js';
import { createMockCategoryRepository, type MockedCategoryRepository } from '../../mocks/repositories.js';
import { buildCategory } from '../../fixtures.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { CATEGORY_ID, USER_ID } from '../../helpers.js';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: MockedCategoryRepository;

  beforeEach(() => {
    repo = createMockCategoryRepository();
    repo.save.mockImplementation(async (e) => e);
    repo.existsBySlug.mockResolvedValue(false);
    service = new CategoryService(repo);
  });

  describe('create()', () => {
    it('should create root category', async () => {
      const result = await service.create({
        name: 'Electronics',
        slug: 'electronics',
      }, USER_ID);
      expect(result.name).toBe('Electronics');
    });

    it('should create child with parent path', async () => {
      const parent = buildCategory();
      repo.findById.mockResolvedValueOnce(parent);

      const result = await service.create({
        name: 'Phones',
        slug: 'phones',
        parentId: CATEGORY_ID,
      }, USER_ID);
      expect(result.name).toBe('Phones');
    });

    it('should reject duplicate slug', async () => {
      repo.existsBySlug.mockResolvedValueOnce(true);
      await expect(
        service.create({ name: 'X', slug: 'dup' }, USER_ID),
      ).rejects.toThrow(CategorySlugConflictError);
    });

    it('should throw if parent not found', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.create({ name: 'X', slug: 'x', parentId: 'missing' }, USER_ID),
      ).rejects.toThrow(CategoryNotFoundApplicationError);
    });
  });

  describe('update()', () => {
    it('should update name and description', async () => {
      const cat = buildCategory();
      repo.findById.mockResolvedValueOnce(cat);

      const result = await service.update({
        categoryId: CATEGORY_ID,
        name: 'Updated',
        description: 'New desc',
      }, USER_ID);
      expect(result.name).toBe('Updated');
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ categoryId: 'missing' }, USER_ID),
      ).rejects.toThrow(CategoryNotFoundApplicationError);
    });
  });

  describe('remove()', () => {
    it('should softDelete', async () => {
      const cat = buildCategory();
      repo.findById.mockResolvedValueOnce(cat);
      await service.remove(CATEGORY_ID, USER_ID);
      expect(cat.status).toBe('deleted');
    });
  });

  describe('move()', () => {
    it('should move category to new parent', async () => {
      const cat = buildCategory();
      // Parent must be a different category (not self)
      const parent = buildCategory({
        name: 'Parent',
        path: CategoryPathVO.create(['parent-category-id']),
      });
      parent['id'] = 'parent-category-id'; // mutate via reflection for test

      repo.findById
        .mockResolvedValueOnce(cat)   // service first fetches category
        .mockResolvedValueOnce(parent); // then fetches new parent

      const result = await service.move(CATEGORY_ID, 'parent-category-id', USER_ID);
      expect(result.id).toBe(CATEGORY_ID);
    });

    it('should move to root', async () => {
      const cat = buildCategory();
      repo.findById.mockResolvedValueOnce(cat);

      const result = await service.move(CATEGORY_ID, null, USER_ID);
      expect(result.id).toBe(CATEGORY_ID);
    });
  });

  describe('activate/deactivate', () => {
    it('activate', async () => {
      const cat = buildCategory({ status: 'inactive' });
      repo.findById.mockResolvedValueOnce(cat);
      const result = await service.activate(CATEGORY_ID, USER_ID);
      expect(result.status).toBe('active');
    });

    it('deactivate', async () => {
      const cat = buildCategory({ status: 'active' });
      repo.findById.mockResolvedValueOnce(cat);
      const result = await service.deactivate(CATEGORY_ID, USER_ID);
      expect(result.status).toBe('inactive');
    });
  });

  describe('getTree', () => {
    it('should return tree', async () => {
      repo.findTree.mockResolvedValueOnce([
        { category: buildCategory(), children: [] },
      ]);
      const result = await service.getTree();
      expect(result.length).toBe(1);
    });
  });

  describe('getById / getBySlug', () => {
    it('getById returns null when missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      expect(await service.getById('missing')).toBeNull();
    });

    it('getBySlug returns DTO', async () => {
      repo.findBySlug.mockResolvedValueOnce(buildCategory());
      const result = await service.getBySlug('electronics');
      expect(result?.slug).toBe('electronics');
    });
  });
});
