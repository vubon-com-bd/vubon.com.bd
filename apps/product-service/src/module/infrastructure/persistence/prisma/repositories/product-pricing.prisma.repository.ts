/**
 * ProductPricingPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductPricingRepository,
  PricingListOptions,
  PricingListFilter,
  PricingPaginationResult,
  PricingStats,
} from '../../../../domain/repositories/product-pricing.repository.interface.js';
import { ProductPricingEntity } from '../../../../domain/entities/product-pricing.entity.js';
import { PriceIdVO } from '../../../../domain/value-objects/primitives/price-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductPricingPrismaMapper,
  type PrismaProductPricingRow,
} from '../mappers/product-pricing.prisma.mapper.js';

interface PricingDelegate {
  findFirst(args: unknown): Promise<PrismaProductPricingRow | null>;
  findUnique(args: unknown): Promise<PrismaProductPricingRow | null>;
  findMany(args?: unknown): Promise<PrismaProductPricingRow[]>;
  create(args: unknown): Promise<PrismaProductPricingRow>;
  update(args: unknown): Promise<PrismaProductPricingRow>;
  delete(args: unknown): Promise<PrismaProductPricingRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class ProductPricingPrismaRepository implements ProductPricingRepository {
  private readonly logger = new Logger(ProductPricingPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): PricingDelegate {
    return this.prisma.getModel<PricingDelegate>('productPricing');
  }

  async findById(id: string): Promise<ProductPricingEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductPricingPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductPricingEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductPricingPrismaMapper.toDomain);
  }

  async save(entity: ProductPricingEntity): Promise<ProductPricingEntity> {
    const data = ProductPricingPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductPricingPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductPricingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: PriceIdVO): Promise<ProductPricingEntity | null> {
    return this.findById(id.value);
  }

  async findByProduct(productId: ProductIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { productId: productId.value, variantId: null, deletedAt: null },
    });
    return raw ? ProductPricingPrismaMapper.toDomain(raw) : null;
  }

  async findPaginated(options: PricingListOptions): Promise<PricingPaginationResult> {
    const where = this.buildWhere(options.filter);
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);
    return {
      items: rows.map(ProductPricingPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: PricingListFilter): Promise<PricingStats> {
    const where = this.buildWhere(filter);
    const [total, agg] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.aggregate({
        where,
        _avg: { sellingPrice: true },
        _min: { sellingPrice: true },
        _max: { sellingPrice: true },
      } as never),
    ]);

    const sums = agg as {
      _avg?: { sellingPrice?: unknown };
      _min?: { sellingPrice?: unknown };
      _max?: { sellingPrice?: unknown };
    };

    return {
      total,
      averageSellingPrice: sums._avg?.sellingPrice ? toNum(sums._avg.sellingPrice) : 0,
      minPrice: sums._min?.sellingPrice ? toNum(sums._min.sellingPrice) : 0,
      maxPrice: sums._max?.sellingPrice ? toNum(sums._max.sellingPrice) : 0,
      discountedCount: 0,
      byCurrency: {},
    };
  }

  async findExpired(at: string): Promise<readonly ProductPricingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { effectiveTo: { lt: new Date(at) }, deletedAt: null },
    });
    return rows.map(ProductPricingPrismaMapper.toDomain);
  }

  async findExpiringSoon(
    withinHours: number,
    at: string,
  ): Promise<readonly ProductPricingEntity[]> {
    const cutoff = new Date(new Date(at).getTime() + withinHours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        effectiveTo: { gte: new Date(at), lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(ProductPricingPrismaMapper.toDomain);
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private buildWhere(filter: PricingListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.productId) w['productId'] = filter.productId;
    if (filter.currency) w['currency'] = filter.currency;
    if (filter.hasDiscount === true) w['discountPercent'] = { gt: 0 };
    return w;
  }
}

function toNum(v: unknown): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
}
