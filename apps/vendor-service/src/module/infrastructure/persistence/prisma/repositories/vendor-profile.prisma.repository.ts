/**
 * VendorProfilePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorProfileRepository,
  VendorProfileListOptions,
  VendorProfilePaginationResult,
} from '../../../../domain/repositories/vendor-profile.repository.interface.js';
import { VendorProfileEntity } from '../../../../domain/entities/vendor-profile.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorProfilePrismaMapper,
  type VendorProfilePrismaRow,
} from '../mappers/vendor-profile.prisma.mapper.js';

interface ProfileDelegate {
  findFirst(args: unknown): Promise<VendorProfilePrismaRow | null>;
  findMany(args: unknown): Promise<VendorProfilePrismaRow[]>;
  create(args: unknown): Promise<VendorProfilePrismaRow>;
  update(args: unknown): Promise<VendorProfilePrismaRow>;
  delete(args: unknown): Promise<VendorProfilePrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorProfilePrismaRepository implements VendorProfileRepository {
  private readonly logger = new Logger(VendorProfilePrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ProfileDelegate {
    return this.prisma.getModel<ProfileDelegate>('vendorProfile');
  }

  async findById(id: string): Promise<VendorProfileEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? VendorProfilePrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorProfileEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorProfilePrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: string): Promise<VendorProfileEntity | null> {
    return this.findById(id);
  }

  async findBySlug(slug: string): Promise<VendorProfileEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { slug, deletedAt: null },
    });
    return raw ? VendorProfilePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorProfilePrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorProfileEntity): Promise<VendorProfileEntity> {
    const data = VendorProfilePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data,
      });
      return VendorProfilePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorProfilePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorProfileListOptions): Promise<VendorProfilePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.isFeatured !== undefined) where['isFeatured'] = f.isFeatured;
    if (f.isVerified !== undefined) where['isVerified'] = f.isVerified;
    if (f.minRating !== undefined) where['rating'] = { gte: f.minRating };
    if (f.hasLogo) where['logoUrl'] = { not: null };
    if (f.search) {
      where['OR'] = [
        { name: { contains: f.search, mode: 'insensitive' } },
        { displayName: { contains: f.search, mode: 'insensitive' } },
      ];
    }

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(VendorProfilePrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findCompleteProfiles(limit = 50): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        isVerified: true,
        logoUrl: { not: null },
        description: { not: null },
      },
      take: limit,
    });
    return rows.map(VendorProfilePrismaMapper.toDomain);
  }

  async findIncompleteProfiles(limit = 50): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        OR: [{ logoUrl: null }, { description: null }],
      },
      take: limit,
    });
    return rows.map(VendorProfilePrismaMapper.toDomain);
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly complete: number;
    readonly withLogo: number;
    readonly withBanner: number;
    readonly featured: number;
  }> {
    const [total, complete, withLogo, withBanner, featured] = await Promise.all([
      this.delegate.count({ where: { deletedAt: null } }),
      this.delegate.count({
        where: { deletedAt: null, isVerified: true, logoUrl: { not: null }, description: { not: null } },
      }),
      this.delegate.count({ where: { deletedAt: null, logoUrl: { not: null } } }),
      this.delegate.count({ where: { deletedAt: null, bannerUrl: { not: null } } }),
      this.delegate.count({ where: { deletedAt: null, isFeatured: true } }),
    ]);
    return { total, complete, withLogo, withBanner, featured };
  }
}
