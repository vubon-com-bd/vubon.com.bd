import { jest } from '@jest/globals';
import { VendorSlugService } from '../../../../src/module/application/services/impl/vendor-slug.service.js';
import type { VendorRepository } from '../../../../src/module/domain/repositories/vendor.repository.interface.js';

function makeRepoMock(): jest.Mocked<VendorRepository> {
  return {
    existsBySlug: jest.fn(),
    findPaginated: jest.fn(),
  } as unknown as jest.Mocked<VendorRepository>;
}

describe('VendorSlugService', () => {
  let service: VendorSlugService;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSlugService(repo);
  });

  describe('checkAvailability()', () => {
    it('returns available when free', async () => {
      repo.existsBySlug.mockResolvedValue(false);
      const r = await service.checkAvailability('acme-store');
      expect(r.available).toBe(true);
    });

    it('suggests alternative when taken', async () => {
      repo.existsBySlug.mockResolvedValue(true);
      const r = await service.checkAvailability('acme-store');
      expect(r.available).toBe(false);
      expect(r.suggestion).toBeDefined();
    });
  });

  describe('suggestFor()', () => {
    it('returns available suggestion', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 1000,
        totalPages: 0,
      });
      const r = await service.suggestFor('Acme Store');
      expect(r.slug).toBe('acme-store');
      expect(r.available).toBe(true);
    });
  });

  describe('isSuspicious()', () => {
    it('flags reserved slugs', () => {
      expect(service.isSuspicious('admin')).toBe(true);
      expect(service.isSuspicious('vubon')).toBe(true);
    });

    it('does not flag normal slugs', () => {
      expect(service.isSuspicious('acme-store')).toBe(false);
    });
  });
});
