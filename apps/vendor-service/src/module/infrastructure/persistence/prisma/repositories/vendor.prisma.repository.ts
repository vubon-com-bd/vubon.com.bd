/**
 * VendorPrismaRepository — implements VendorRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorRepository,
  VendorListOptions,
  VendorPaginationResult,
  VendorAggregateStats,
} from '../../../../domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../domain/entities/vendor.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../domain/value-objects/primitives/vendor-email.vo.js';
import { VendorStatusVO } from '../../../../domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo.js';
import { VendorTierVO } from '../../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { VendorPrismaMapper } from '../mappers/vendor.prisma-mapper.js';

@Injectable()
export class VendorPrismaRepository implements VendorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorEntity | null> {
    return this.findByIdVO(VendorIdVO.reconstitute(id));
  }

  async findByIdVO(id: VendorIdVO): Promise<VendorEntity | null> {
    const row = await this.prisma.vendor.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? VendorPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findBySlug(slug: VendorSlugVO): Promise<VendorEntity | null> {
    const row = await this.prisma.vendor.findFirst({
      where: { slug: slug.value, deletedAt: null },
    });
    return row ? VendorPrismaMapper.toDomain(row) : null;
  }

  async findByEmail(email: VendorEmailVO): Promise<VendorEntity | null> {
    const row = await this.prisma.vendor.findFirst({
      where: { email: email.value, deletedAt: null },
    });
    return row ? VendorPrismaMapper.toDomain(row) : null;
  }

  async findByUserId(userId: string): Promise<VendorEntity | null> {
    const row = await this.prisma.vendor.findFirst({
      where: { userId, deletedAt: null },
    });
    return row ? VendorPrismaMapper.toDomain(row) : null;
  }

  async findByStatus(status: VendorStatusVO): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findByType(type: VendorTypeVO): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findByTier(tier: VendorTierVO): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { tier: tier.value, deletedAt: null },
      orderBy: { totalSales: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findFeatured(): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { isFeatured: true, deletedAt: null },
      orderBy: { rating: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findVerified(): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: { isVerified: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findPaginated(options: VendorListOptions): Promise<VendorPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter;
    if (f) {
      if (f.status) where.status = f.status;
      if (f.type) where.type = f.type;
      if (f.tier) where.tier = f.tier;
      if (f.isVerified !== undefined) where.isVerified = f.isVerified;
      if (f.isFeatured !== undefined) where.isFeatured = f.isFeatured;
      if (f.minRating !== undefined) where.rating = { gte: f.minRating };
      if (f.search) {
        where.OR = [
          { name: { contains: f.search, mode: 'insensitive' } },
          { displayName: { contains: f.search, mode: 'insensitive' } },
          { slug: { contains: f.search, mode: 'insensitive' } },
        ];
      }
    }

    const sortBy = options.sortBy ?? 'createdAt';
    const sortDir = options.sortDir ?? 'desc';
    const skip = (options.page - 1) * options.limit;

    const [rows, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip,
        take: options.limit,
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return {
      items: rows.map((r) => VendorPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async save(entity: VendorEntity): Promise<VendorEntity> {
    const existing = await this.prisma.vendor.findFirst({ where: { id: entity.id } });
    const data: Record<string, unknown> = {
      userId: entity.userId,
      name: entity.name.value,
      slug: entity.slug.value,
      displayName: entity.displayName.value,
      description: entity.description?.value,
      type: entity.type.value,
      businessType: entity.businessType.value,
      status: entity.status.value,
      tier: entity.tier.value,
      email: entity.email.value,
      phone: entity.contact?.phone?.value,
      website: entity.contact?.website?.value,
      logoUrl: entity.branding?.logo?.value,
      bannerUrl: entity.branding?.banner?.value,
      addressLine1: entity.location?.address.value.line1 ?? '',
      addressLine2: entity.location?.address.value.line2,
      area: entity.location?.address.value.area,
      upazila: entity.location?.address.value.upazila ?? '',
      district: entity.location?.address.value.district ?? '',
      division: entity.location?.address.value.division ?? '',
      postalCode: entity.location?.address.value.postalCode,
      country: entity.location?.address.value.country ?? 'BD',
      rating: entity.rating.value,
      totalSales: entity.totalSales,
      totalOrders: entity.totalOrders,
      isVerified: entity.isVerified,
      isFeatured: entity.isFeatured,
      joinedAt: new Date(entity.joinedAt),
      approvedAt: entity.approvedAt ? new Date(entity.approvedAt) : null,
      suspendedAt: entity.suspendedAt ? new Date(entity.suspendedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };

    let row;
    if (existing) {
      row = await this.prisma.vendor.update({
        where: { id: entity.id },
        data,
      });
    } else {
      row = await this.prisma.vendor.create({
        data: {
          id: entity.id,
          ...data,
          createdAt: new Date(entity.createdAt),
        } as never,
      });
    }
    return VendorPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendor.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }

  async existsBySlug(slug: VendorSlugVO): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { slug: slug.value, deletedAt: null },
    });
    return count > 0;
  }

  async existsByEmail(email: VendorEmailVO): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { email: email.value, deletedAt: null },
    });
    return count > 0;
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { userId, deletedAt: null },
    });
    return count > 0;
  }

  async findPendingApprovalPastSla(hours: number): Promise<readonly VendorEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    const rows = await this.prisma.vendor.findMany({
      where: {
        status: 'pending',
        joinedAt: { lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findInactiveSince(days: number): Promise<readonly VendorEntity[]> {
    const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendor.findMany({
      where: {
        status: 'inactive',
        updatedAt: { lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async findTierUpgradeCandidates(): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany({
      where: {
        status: { in: ['active', 'approved'] },
        deletedAt: null,
      },
      orderBy: { totalSales: 'desc' },
    });
    return rows.map((r) => VendorPrismaMapper.toDomain(r));
  }

  async countByStatus(status: VendorStatusVO): Promise<number> {
    return this.prisma.vendor.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async getAggregateStats(): Promise<VendorAggregateStats> {
    const total = await this.prisma.vendor.count({ where: { deletedAt: null } });

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byTier: Record<string, number> = {};

    const statusGroups = await this.prisma.vendor.groupBy({
      by: ['status'],
      _count: { _all: true },
      where: { deletedAt: null },
    });
    for (const g of statusGroups) {
      byStatus[g.status] = g._count._all;
    }

    const typeGroups = await this.prisma.vendor.groupBy({
      by: ['type'],
      _count: { _all: true },
      where: { deletedAt: null },
    });
    for (const g of typeGroups) {
      byType[g.type] = g._count._all;
    }

    const tierGroups = await this.prisma.vendor.groupBy({
      by: ['tier'],
      _count: { _all: true },
      where: { deletedAt: null },
    });
    for (const g of tierGroups) {
      byTier[g.tier] = g._count._all;
    }

    const verifiedCount = await this.prisma.vendor.count({
      where: { isVerified: true, deletedAt: null },
    });
    const featuredCount = await this.prisma.vendor.count({
      where: { isFeatured: true, deletedAt: null },
    });
    const avgAgg = await this.prisma.vendor.aggregate({
      _avg: { rating: true },
      where: { deletedAt: null },
    });

    return {
      totalVendors: total,
      byStatus,
      byType,
      byTier,
      verifiedCount,
      featuredCount,
      avgRating: Number(avgAgg._avg.rating ?? 0),
    };
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.prisma.vendor.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'deleted' },
    });
  }
}
