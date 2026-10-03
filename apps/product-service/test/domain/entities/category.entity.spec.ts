/**
 * CategoryEntity — unit tests
 */
import { CategoryEntity } from '../../../src/module/domain/entities/category.entity.js';
import { CategoryNameVO } from '../../../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { CategoryCreatedEvent, CategoryUpdatedEvent, CategoryMovedEvent, CategoryDeletedEvent } from '../../../src/module/domain/events/category.events.js';
import { buildCategory, buildNewCategory } from '../../fixtures.js';
import { USER_ID, CATEGORY_ID } from '../../helpers.js';

describe('CategoryEntity', () => {
  describe('create()', () => {
    it('should emit CategoryCreatedEvent', () => {
      const cat = buildNewCategory();
      expect(cat.pullDomainEvents()[0]).toBeInstanceOf(CategoryCreatedEvent);
    });
  });

  describe('rename()', () => {
    it('should change name and slug', () => {
      const cat = buildCategory();
      cat.pullDomainEvents();
      cat.rename(
        CategoryNameVO.create('New Electronics'),
        CategorySlugVO.create('new-electronics'),
        USER_ID,
      );
      expect(cat.name.value).toBe('New Electronics');
      expect(cat.slug.value).toBe('new-electronics');
      expect(cat.pullDomainEvents()[0]).toBeInstanceOf(CategoryUpdatedEvent);
    });

    it('should be idempotent when unchanged', () => {
      const cat = buildCategory();
      cat.pullDomainEvents();
      const before = cat.version;
      cat.rename(CategoryNameVO.create('Electronics'), CategorySlugVO.create('electronics'), USER_ID);
      expect(cat.version).toBe(before);
    });
  });

  describe('updateMedia()', () => {
    it('should update image, description, sortOrder', () => {
      const cat = buildCategory();
      cat.pullDomainEvents();
      cat.updateMedia({
        imageUrl: 'https://cdn.example.com/cat.jpg',
        description: 'Updated',
        sortOrder: 5,
        isFeatured: true,
      }, USER_ID);
      expect(cat.imageUrl).toBe('https://cdn.example.com/cat.jpg');
      expect(cat.description).toBe('Updated');
      expect(cat.sortOrder).toBe(5);
      expect(cat.isFeatured).toBe(true);
    });

    it('should reject negative sortOrder', () => {
      const cat = buildCategory();
      expect(() => cat.updateMedia({ sortOrder: -1 }, USER_ID)).toThrow(Error);
    });
  });

  describe('moveTo()', () => {
    it('should move to new parent and update path', () => {
      const cat = buildCategory();
      cat.pullDomainEvents();
      const newParentId = CategoryIdVO.create('cat-parent-new');
      const newParentPath = CategoryPathVO.create([newParentId.value]);
      cat.moveTo({ newParentId, newParentPath, changedBy: USER_ID });
      expect(cat.parentId?.value).toBe(newParentId.value);
      expect(cat.pullDomainEvents()[0]).toBeInstanceOf(CategoryMovedEvent);
    });

    it('should reject move to self', () => {
      const cat = buildCategory();
      expect(() => cat.moveTo({
        newParentId: cat.toIdVO(),
        newParentPath: CategoryPathVO.create([cat.id]),
        changedBy: USER_ID,
      })).toThrow(Error);
    });

    it('should reject move into own descendant', () => {
      const cat = buildCategory({ path: CategoryPathVO.create([CATEGORY_ID, 'child-1']) });
      expect(() => cat.moveTo({
        newParentId: CategoryIdVO.create('child-1'),
        newParentPath: CategoryPathVO.create([CATEGORY_ID, 'child-1']),
        changedBy: USER_ID,
      })).toThrow(Error);
    });

    it('should reject move that exceeds max depth', () => {
      // Parent path of 5 levels; append(id) → 6 levels → exceeds MAX_DEPTH=5
      const deepPath = CategoryPathVO.create(['p1', 'p2', 'p3', 'p4', 'p5']);
      const cat = buildCategory();
      expect(() => cat.moveTo({
        newParentId: CategoryIdVO.create('p5'),
        newParentPath: deepPath,
        changedBy: USER_ID,
      })).toThrow(Error);
    });

    it('should allow moving to root (no parent)', () => {
      const cat = buildCategory();
      cat.moveTo({ newParentId: undefined, newParentPath: CategoryPathVO.root(), changedBy: USER_ID });
      expect(cat.parentId).toBeUndefined();
      expect(cat.depth).toBe(1);
    });
  });

  describe('activate / deactivate / hide', () => {
    it('activate from inactive', () => {
      const cat = buildCategory({ status: 'inactive' });
      cat.activate(USER_ID);
      expect(cat.status).toBe('active');
    });

    it('deactivate from active', () => {
      const cat = buildCategory({ status: 'active' });
      cat.deactivate(USER_ID);
      expect(cat.status).toBe('inactive');
    });

    it('hide sets status hidden', () => {
      const cat = buildCategory();
      cat.hide();
      expect(cat.status).toBe('hidden');
    });
  });

  describe('softDelete()', () => {
    it('should delete leaf category', () => {
      const cat = buildCategory({ hasChildren: false });
      cat.pullDomainEvents();
      cat.softDelete(USER_ID);
      expect(cat.status).toBe('deleted');
      expect(cat.pullDomainEvents()[0]).toBeInstanceOf(CategoryDeletedEvent);
    });

    it('should reject delete with children', () => {
      const cat = buildCategory({ hasChildren: true });
      expect(() => cat.softDelete(USER_ID)).toThrow(Error);
    });
  });

  describe('counts and flags', () => {
    it('increment/decrement product count', () => {
      const cat = buildCategory({ productCount: 0 });
      cat.incrementProductCount();
      expect(cat.productCount).toBe(1);
      cat.decrementProductCount();
      cat.decrementProductCount(); // should not go negative
      expect(cat.productCount).toBe(0);
    });

    it('markHasChildren toggles flag', () => {
      const cat = buildCategory({ hasChildren: false });
      cat.markHasChildren(true);
      expect(cat.hasChildren).toBe(true);
    });
  });

  describe('queries', () => {
    it('isRoot returns true when parentId undefined', () => {
      expect(buildCategory().isRoot()).toBe(true);
      expect(buildCategory({ parentId: CategoryIdVO.create('p') }).isRoot()).toBe(false);
    });

    it('isLeaf returns true when no children', () => {
      expect(buildCategory({ hasChildren: false }).isLeaf()).toBe(true);
      expect(buildCategory({ hasChildren: true }).isLeaf()).toBe(false);
    });

    it('canHaveChildren false at max depth', () => {
      const maxDepthPath = CategoryPathVO.create(['1', '2', '3', '4', '5']);
      const cat = buildCategory({ path: maxDepthPath });
      expect(cat.canHaveChildren()).toBe(false);
    });

    it('toIdVO returns CategoryIdVO', () => {
      expect(buildCategory().toIdVO().value).toBe(CATEGORY_ID);
    });

    it('isActive true for active non-deleted', () => {
      expect(buildCategory({ status: 'active' }).isActive()).toBe(true);
      expect(buildCategory({ status: 'inactive' }).isActive()).toBe(false);
    });
  });

  void CategoryEntity;
});
