/**
 * ProductPricingRulePrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductPricingRuleRepository,
  PricingRuleListOptions,
  PricingRuleListFilter,
  PricingRulePaginationResult,
} from '../../../../domain/repositories/product-pricing-rule.repository.interface.js';
import { ProductPricingRuleEntity } from '../../../../domain/entities/product-pricing-rule.entity.js';
import { PricingRuleIdVO } from '../../../../domain/value-objects/primitives/pricing-rule-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductPricingRulePrismaMapper,
  type PrismaProductPricingRuleRow,
} from '../mappers/product-pricing-rule.prisma.mapper.js';

interface PricingRuleDelegate {
  findFirst(args: unknown): Promise<PrismaProductPricingRuleRow | null>;
  findUnique(args: unknown): Promise<PrismaProductPricingRuleRow | null>;
  findMany(args?: unknown): Promise<PrismaProductPricingRuleRow[]>;
  create(args: unknown): Promise<PrismaProductPricingRuleRow>;
  update(args: unknown): Promise<PrismaProductPricingRuleRow>;
  delete(args: unknown): Promise<PrismaProductPricingRuleRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class ProductPricingRulePrismaRepository implements ProductPricingRuleRepository {
  private readonly logger = new Logger(ProductPricingRulePrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): PricingRuleDelegate {
    return this.prisma.getModel<PricingRuleDelegate>('pricingRule');
  }

  async findById(id: string): Promise<ProductPricingRuleEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductPricingRulePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductPricingRulePrismaMapper.toDomain);
  }

  async save(entity: ProductPricingRuleEntity): Promise<ProductPricingRuleEntity> {
    const data = ProductPricingRulePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductPricingRulePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductPricingRulePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: PricingRuleIdVO): Promise<ProductPricingRuleEntity | null> {
    return this.findById(id.value);
  }

  async findActiveByPriority(): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map(ProductPricingRulePrismaMapper.toDomain);
  }

  async findByType(type: string): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map(ProductPricingRulePrismaMapper.toDomain);
  }

  async findPaginated(options: PricingRuleListOptions): Promise<PricingRulePaginationResult> {
    const where = this.buildWhere(options.filter);
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { priority: 'asc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);
    return {
      items: rows.map(ProductPricingRulePrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private buildWhere(filter: PricingRuleListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.isActive !== undefined) w['isActive'] = filter.isActive;
    if (filter.type) w['type'] = filter.type;
    if (filter.minPriority !== undefined) w['priority'] = { gte: filter.minPriority };
    return w;
  }
}
