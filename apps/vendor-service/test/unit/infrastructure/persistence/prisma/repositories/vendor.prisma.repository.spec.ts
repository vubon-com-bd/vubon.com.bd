/**
 * VendorPrismaRepository — unit tests
 * @module vendor-service/test/unit/infrastructure/persistence/prisma/repositories
 */
import { jest } from '@jest/globals';
import { VendorPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor.prisma.repository.js';
import {
  createMockPrisma,
  makeVendorRow,
} from '@helpers/prisma-test-harness';
import { VendorIdVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { VendorSlugVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorTierVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorPrismaRepository', () => {
  let repo: VendorPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorPrismaRepository(prisma.prisma);
  });

  describe('findById / findByIdVO', () => {
    it('returns entity when found', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(makeVendorRow());
      expect((await repo.findById(UUID))?.id).toBe(UUID);
    });

    it('returns null when not found', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(null);
      expect(await repo.findById(UUID)).toBeNull();
    });

    it('passes id + deletedAt null', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(null);
      await repo.findByIdVO(VendorIdVO.create(UUID));
      expect(prisma.mock.vendor.findFirst).toHaveBeenCalledWith({
        where: { id: UUID, deletedAt: null },
      });
    });
  });

  describe('findAll', () => {
    it('returns list', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findAll()).length).toBe(1);
    });

    it('returns empty', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([]);
      expect(await repo.findAll()).toEqual([]);
    });
  });

  describe('findBySlug', () => {
    it('returns entity', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(makeVendorRow());
      expect((await repo.findBySlug(VendorSlugVO.create('acme-store')))?.slug.value).toBe('acme-store');
    });

    it('uses slug + deletedAt null', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(null);
      await repo.findBySlug(VendorSlugVO.create('acme-store'));
      expect(prisma.mock.vendor.findFirst).toHaveBeenCalledWith({
        where: { slug: 'acme-store', deletedAt: null },
      });
    });
  });

  describe('findByEmail', () => {
    it('returns entity', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(makeVendorRow());
      expect(await repo.findByEmail(VendorEmailVO.create('shop@acme.com'))).not.toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('returns entity', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(makeVendorRow());
      expect((await repo.findByUserId(UUID))?.userId).toBe(UUID);
    });
    it('returns null', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(null);
      expect(await repo.findByUserId(UUID)).toBeNull();
    });
  });

  describe('findByStatus / findByType / findByTier', () => {
    it('findByStatus', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findByStatus(VendorStatusVO.pending())).length).toBe(1);
    });
    it('findByType', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findByType(VendorTypeVO.create('individual'))).length).toBe(1);
    });
    it('findByTier', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findByTier(VendorTierVO.reconstitute('bronze'))).length).toBe(1);
    });
  });

  describe('findFeatured / findVerified', () => {
    it('findFeatured', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow({ isFeatured: true })]);
      expect((await repo.findFeatured()).length).toBe(1);
    });
    it('findVerified', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow({ isVerified: true })]);
      expect((await repo.findVerified()).length).toBe(1);
    });
  });

  describe('findPaginated', () => {
    it('paginates with defaults', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      prisma.mock.vendor.count.mockResolvedValue(1);
      const r = await repo.findPaginated({ page: 1, limit: 20 });
      expect(r.items).toHaveLength(1);
      expect(r.totalPages).toBe(1);
    });

    it('applies search filter', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([]);
      prisma.mock.vendor.count.mockResolvedValue(0);
      await repo.findPaginated({ page: 1, limit: 20, filter: { search: 'acme' } });
      const call = prisma.mock.vendor.findMany.mock.calls[0]?.[0] as { where: { OR?: unknown } };
      expect(call.where.OR).toBeDefined();
    });

    it('applies multiple filters', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([]);
      prisma.mock.vendor.count.mockResolvedValue(0);
      await repo.findPaginated({
        page: 1,
        limit: 20,
        filter: {
          status: 'active',
          type: 'individual',
          tier: 'gold',
          isVerified: true,
          isFeatured: false,
          minRating: 4,
        },
      });
      const call = prisma.mock.vendor.findMany.mock.calls[0]?.[0] as { where: Record<string, unknown> };
      expect(call.where.status).toBe('active');
      expect(call.where.type).toBe('individual');
      expect(call.where.tier).toBe('gold');
      expect(call.where.isVerified).toBe(true);
      expect(call.where.isFeatured).toBe(false);
      expect(call.where.rating).toEqual({ gte: 4 });
    });
  });

  describe('exists variants', () => {
    it('existsBySlug true', async () => {
      prisma.mock.vendor.count.mockResolvedValue(1);
      expect(await repo.existsBySlug(VendorSlugVO.create('acme'))).toBe(true);
    });
    it('existsBySlug false', async () => {
      prisma.mock.vendor.count.mockResolvedValue(0);
      expect(await repo.existsBySlug(VendorSlugVO.create('acme'))).toBe(false);
    });
    it('existsByEmail', async () => {
      prisma.mock.vendor.count.mockResolvedValue(1);
      expect(await repo.existsByEmail(VendorEmailVO.create('a@b.com'))).toBe(true);
    });
    it('existsByUserId', async () => {
      prisma.mock.vendor.count.mockResolvedValue(1);
      expect(await repo.existsByUserId(UUID)).toBe(true);
    });
    it('exists true', async () => {
      prisma.mock.vendor.count.mockResolvedValue(1);
      expect(await repo.exists(UUID)).toBe(true);
    });
    it('exists false', async () => {
      prisma.mock.vendor.count.mockResolvedValue(0);
      expect(await repo.exists(UUID)).toBe(false);
    });
  });

  describe('countByStatus', () => {
    it('returns count', async () => {
      prisma.mock.vendor.count.mockResolvedValue(5);
      expect(await repo.countByStatus(VendorStatusVO.active())).toBe(5);
    });
  });

  describe('getAggregateStats', () => {
    it('aggregates', async () => {
      prisma.mock.vendor.count
        .mockResolvedValueOnce(100)
        .mockResolvedValueOnce(50)
        .mockResolvedValueOnce(10);
      prisma.mock.vendor.groupBy
        .mockResolvedValueOnce([{ status: 'active', _count: { _all: 60 } }])
        .mockResolvedValueOnce([{ type: 'individual', _count: { _all: 80 } }])
        .mockResolvedValueOnce([{ tier: 'bronze', _count: { _all: 40 } }]);
      prisma.mock.vendor.aggregate.mockResolvedValue({ _avg: { rating: 4.5 } });
      const r = await repo.getAggregateStats();
      expect(r.totalVendors).toBe(100);
      expect(r.avgRating).toBe(4.5);
    });

    it('handles null avg', async () => {
      prisma.mock.vendor.count.mockResolvedValue(0);
      prisma.mock.vendor.groupBy.mockResolvedValue([]);
      prisma.mock.vendor.aggregate.mockResolvedValue({ _avg: { rating: null } });
      const r = await repo.getAggregateStats();
      expect(r.avgRating).toBe(0);
    });
  });

  describe('softDelete', () => {
    it('marks deleted', async () => {
      prisma.mock.vendor.update.mockResolvedValue(makeVendorRow({ status: 'deleted' }));
      await repo.softDelete(UUID, UUID);
      expect(prisma.mock.vendor.update).toHaveBeenCalledWith({
        where: { id: UUID },
        data: expect.objectContaining({ status: 'deleted' }),
      });
    });
  });

  describe('save', () => {
    it('updates when existing', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(makeVendorRow());
      prisma.mock.vendor.update.mockResolvedValue(makeVendorRow());
      const entity = (await repo.findById(UUID))!;
      const r = await repo.save(entity);
      expect(r).toBeDefined();
      expect(prisma.mock.vendor.update).toHaveBeenCalled();
    });

    it('creates when new', async () => {
      prisma.mock.vendor.findFirst.mockResolvedValue(null);
      prisma.mock.vendor.create.mockResolvedValue(makeVendorRow());
      const entity = (await (async () => {
        // Build vendor entity via reconstitute path
        const { VendorEntity } = await import(
          '../../../../../../src/module/domain/entities/vendor.entity.js'
        );
        const { VendorNameVO } = await import(
          '../../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js'
        );
        const { VendorBusinessTypeVO } = await import(
          '../../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js'
        );
        const { RatingScoreVO } = await import(
          '../../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js'
        );
        return VendorEntity.create({
          id: UUID,
          now: '2026-01-01T00:00:00.000Z',
          props: {
            userId: UUID,
            name: VendorNameVO.create('Acme'),
            slug: VendorSlugVO.create('acme'),
            displayName: VendorNameVO.create('Acme'),
            type: VendorTypeVO.create('individual'),
            businessType: VendorBusinessTypeVO.create('retailer'),
            email: VendorEmailVO.create('a@b.com'),
            tier: VendorTierVO.reconstitute('bronze'),
            rating: RatingScoreVO.zero(),
            totalSales: 0,
            totalOrders: 0,
            isVerified: false,
            isFeatured: false,
            joinedAt: '2026-01-01T00:00:00.000Z',
          },
        });
      })())!;
      const r = await repo.save(entity);
      expect(r.id).toBe(UUID);
    });
  });

  describe('delete', () => {
    it('deletes by id', async () => {
      prisma.mock.vendor.delete.mockResolvedValue(makeVendorRow());
      await repo.delete(UUID);
      expect(prisma.mock.vendor.delete).toHaveBeenCalledWith({ where: { id: UUID } });
    });
  });

  describe('findPendingApprovalPastSla', () => {
    it('returns list', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findPendingApprovalPastSla(24)).length).toBe(1);
    });
  });

  describe('findInactiveSince', () => {
    it('returns list', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findInactiveSince(30)).length).toBe(1);
    });
  });

  describe('findTierUpgradeCandidates', () => {
    it('returns list', async () => {
      prisma.mock.vendor.findMany.mockResolvedValue([makeVendorRow()]);
      expect((await repo.findTierUpgradeCandidates()).length).toBe(1);
    });
  });
});
