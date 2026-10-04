/**
 * BrandEntity — unit tests
 */
import { BrandEntity } from '../../../src/module/domain/entities/brand.entity.js';
import { BrandNameVO } from '../../../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { BrandLogoVO } from '../../../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { BrandCreatedEvent, BrandActivatedEvent, BrandDeactivatedEvent, BrandDeletedEvent } from '../../../src/module/domain/events/brand.events.js';
import { buildBrand, buildNewBrand } from '../../fixtures.js';
import { USER_ID, BRAND_ID } from '../../helpers.js';

describe('BrandEntity', () => {
  describe('create()', () => {
    it('should emit BrandCreatedEvent and bump version', () => {
      const brand = buildNewBrand();
      expect(brand.id).toBe(BRAND_ID);
      expect(brand.version).toBe(1);
      const events = brand.pullDomainEvents();
      expect(events[0]).toBeInstanceOf(BrandCreatedEvent);
    });
  });

  describe('update()', () => {
    it('should update name and description', () => {
      const brand = buildBrand();
      brand.pullDomainEvents();
      brand.update({
        name: BrandNameVO.create('Sony Electronics'),
        description: 'Updated description',
      }, USER_ID);
      expect(brand.name.value).toBe('Sony Electronics');
      expect(brand.description).toBe('Updated description');
    });

    it('should update logo', () => {
      const brand = buildBrand();
      brand.update({ logo: BrandLogoVO.create('https://cdn.example.com/new-logo.png') }, USER_ID);
      expect(brand.logo.value).toBe('https://cdn.example.com/new-logo.png');
    });

    it('should be idempotent (no event if no change)', () => {
      const brand = buildBrand();
      brand.pullDomainEvents();
      const before = brand.version;
      brand.update({}, USER_ID);
      expect(brand.version).toBe(before);
    });

    it('should reject description too long', () => {
      const brand = buildBrand();
      expect(() =>
        brand.update({ description: 'A'.repeat(2001) }, USER_ID),
      ).toThrow(Error);
    });
  });

  describe('activate() / deactivate()', () => {
    it('should activate from INACTIVE', () => {
      const brand = buildBrand({ status: 'inactive' });
      brand.pullDomainEvents();
      brand.activate(USER_ID);
      expect(brand.status).toBe('active');
      expect(brand.pullDomainEvents()[0]).toBeInstanceOf(BrandActivatedEvent);
    });

    it('should be idempotent for already ACTIVE', () => {
      const brand = buildBrand({ status: 'active' });
      const before = brand.version;
      brand.activate(USER_ID);
      expect(brand.version).toBe(before);
    });

    it('should deactivate', () => {
      const brand = buildBrand({ status: 'active' });
      brand.deactivate(USER_ID);
      expect(brand.status).toBe('inactive');
    });
  });

  describe('feature() / unfeature()', () => {
    it('should feature', () => {
      const brand = buildBrand();
      brand.feature();
      expect(brand.isFeatured).toBe(true);
    });

    it('should unfeature', () => {
      const brand = buildBrand({ isFeatured: true });
      brand.unfeature();
      expect(brand.isFeatured).toBe(false);
    });
  });

  describe('incrementProductCount() / decrementProductCount()', () => {
    it('should increment', () => {
      const brand = buildBrand();
      brand.incrementProductCount();
      expect(brand.productCount).toBe(1);
    });

    it('should decrement but not go below 0', () => {
      const brand = buildBrand({ productCount: 0 });
      brand.decrementProductCount();
      expect(brand.productCount).toBe(0);
    });
  });

  describe('softDelete()', () => {
    it('should delete when no products', () => {
      const brand = buildBrand({ productCount: 0 });
      brand.pullDomainEvents();
      brand.softDelete(USER_ID);
      expect(brand.status).toBe('deleted');
      expect(brand.isDeleted()).toBe(true);
      expect(brand.pullDomainEvents()[0]).toBeInstanceOf(BrandDeletedEvent);
    });

    it('should reject delete when products exist', () => {
      const brand = buildBrand({ productCount: 5 });
      expect(() => brand.softDelete(USER_ID)).toThrow(Error);
    });
  });

  describe('queries', () => {
    it('isActive returns true only for active non-deleted', () => {
      expect(buildBrand({ status: 'active' }).isActive()).toBe(true);
      expect(buildBrand({ status: 'inactive' }).isActive()).toBe(false);
    });

    it('hasProducts / hasLogo', () => {
      expect(buildBrand({ productCount: 3 }).hasProducts()).toBe(true);
      expect(buildBrand({ productCount: 0 }).hasProducts()).toBe(false);
      expect(buildBrand().hasLogo()).toBe(true);
      expect(buildBrand({ logo: BrandLogoVO.empty() }).hasLogo()).toBe(false);
    });

    it('toIdVO returns BrandIdVO', () => {
      const brand = buildBrand();
      expect(brand.toIdVO().value).toBe(BRAND_ID);
    });
  });

  void BrandEntity;
});
