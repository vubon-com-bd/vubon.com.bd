/**
 * BrandService — unit tests
 */
import { jest } from '@jest/globals';
import { BrandService } from '../../../src/module/application/services/impl/brand.service.js';
import { BrandNotFoundApplicationError, BrandSlugConflictError } from '../../../src/module/application/errors/brand.errors.js';
import { createMockBrandRepository, type MockedBrandRepository } from '../../mocks/repositories.js';
import { buildBrand } from '../../fixtures.js';
import { USER_ID, BRAND_ID } from '../../helpers.js';

describe('BrandService', () => {
  let service: BrandService;
  let repo: MockedBrandRepository;

  beforeEach(() => {
    repo = createMockBrandRepository();
    repo.save.mockImplementation(async (e) => e);
    repo.existsBySlug.mockResolvedValue(false);
    service = new BrandService(repo);
  });

  describe('create()', () => {
    it('should create brand', async () => {
      const result = await service.create({
        name: 'Sony',
        slug: 'sony',
        description: 'Electronics',
      }, USER_ID);
      expect(result.name).toBe('Sony');
    });

    it('should reject duplicate slug', async () => {
      repo.existsBySlug.mockResolvedValueOnce(true);
      await expect(
        service.create({ name: 'S', slug: 'dup' }, USER_ID),
      ).rejects.toThrow(BrandSlugConflictError);
    });
  });

  describe('update()', () => {
    it('should update name/description', async () => {
      const brand = buildBrand();
      repo.findById.mockResolvedValueOnce(brand);

      const result = await service.update({
        brandId: BRAND_ID,
        name: 'Sony Updated',
        description: 'New desc',
      }, USER_ID);
      expect(result.name).toBe('Sony Updated');
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ brandId: 'missing' }, USER_ID),
      ).rejects.toThrow(BrandNotFoundApplicationError);
    });
  });

  describe('remove()', () => {
    it('should softDelete brand', async () => {
      const brand = buildBrand();
      repo.findById.mockResolvedValueOnce(brand);
      await service.remove(BRAND_ID, USER_ID);
      expect(brand.status).toBe('deleted');
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(service.remove('missing', USER_ID)).rejects.toThrow(BrandNotFoundApplicationError);
    });
  });

  describe('activate/deactivate', () => {
    it('activate', async () => {
      const brand = buildBrand({ status: 'inactive' });
      repo.findById.mockResolvedValueOnce(brand);
      const result = await service.activate(BRAND_ID, USER_ID);
      expect(result.status).toBe('active');
    });

    it('deactivate', async () => {
      const brand = buildBrand({ status: 'active' });
      repo.findById.mockResolvedValueOnce(brand);
      const result = await service.deactivate(BRAND_ID, USER_ID);
      expect(result.status).toBe('inactive');
    });
  });

  describe('feature()', () => {
    it('should feature brand', async () => {
      const brand = buildBrand();
      repo.findById.mockResolvedValueOnce(brand);
      const result = await service.feature(BRAND_ID, USER_ID);
      expect(result.isFeatured).toBe(true);
    });
  });

  describe('getById / getBySlug', () => {
    it('getById returns null when not found', async () => {
      repo.findById.mockResolvedValueOnce(null);
      expect(await service.getById('missing')).toBeNull();
    });

    it('getBySlug returns mapped DTO', async () => {
      repo.findBySlug.mockResolvedValueOnce(buildBrand());
      const result = await service.getBySlug('sony');
      expect(result?.slug).toBe('sony');
    });
  });

  describe('listFeatured()', () => {
    it('should return featured brands', async () => {
      repo.findFeatured.mockResolvedValueOnce([buildBrand({ isFeatured: true })]);
      const result = await service.listFeatured();
      expect(result.length).toBe(1);
    });
  });
});
