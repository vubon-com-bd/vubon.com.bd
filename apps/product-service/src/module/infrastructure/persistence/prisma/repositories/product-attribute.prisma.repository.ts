/**
 * ProductAttributePrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductAttributeRepository,
  AttributeListOptions,
  AttributeListFilter,
  AttributePaginationResult,
} from '../../../../domain/repositories/product-attribute.repository.interface.js';
import { ProductAttributeEntity } from '../../../../domain/entities/product-attribute.entity.js';
import { AttributeIdVO } from '../../../../domain/value-objects/primitives/attribute-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductAttributePrismaMapper,
  type PrismaProductAttributeRow,
} from '../mappers/product-attribute.prisma.mapper.js';

interface AttributeDelegate {
  findFirst(args: unknown): Promise<PrismaProductAttributeRow | null>;
  findUnique(args: unknown): Promise<PrismaProductAttributeRow | null>;
  findMany(args?: unknown): Promise<PrismaProductAttributeRow[]>;
  create(args: unknown): Promise<PrismaProductAttributeRow>;
  update(args: unknown): Promise<PrismaProductAttributeRow>;
  delete(args: unknown): Promise<PrismaProductAttributeRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class ProductAttributePrismaRepository implements ProductAttributeRepository {
  private readonly logger = new Logger(ProductAttributePrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): AttributeDelegate {
    return this.prisma.getModel<AttributeDelegate>('productAttribute');
  }

  async findById(id: string): Promise<ProductAttributeEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductAttributePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductAttributePrismaMapper.toDomain);
  }

  async save(entity: ProductAttributeEntity): Promise<ProductAttributeEntity> {
    const data = ProductAttributePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductAttributePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductAttributePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: AttributeIdVO): Promise<ProductAttributeEntity | null> {
    return this.findById(id.value);
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, deletedAt: null },
    });
    return rows.map(ProductAttributePrismaMapper.toDomain);
  }

  async findFilterableByProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, isFilterable: true, deletedAt: null },
    });
    return rows.map(ProductAttributePrismaMapper.toDomain);
  }

  async findSearchableByProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, isSearchable: true, deletedAt: null },
    });
    return rows.map(ProductAttributePrismaMapper.toDomain);
  }

  async findPaginated(options: AttributeListOptions): Promise<AttributePaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = { createdAt: 'desc' as const };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(ProductAttributePrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.delegate.count({
      where: { productId: productId.value, deletedAt: null },
    });
  }

  async deleteByProduct(productId: ProductIdVO): Promise<number> {
    const r = await this.delegate.updateMany({
      where: { productId: productId.value },
      data: { deletedAt: new Date() },
    });
    return r.count;
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private buildWhere(filter: AttributeListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.productId) w['productId'] = filter.productId;
    if (filter.isFilterable !== undefined) w['isFilterable'] = filter.isFilterable;
    if (filter.isSearchable !== undefined) w['isSearchable'] = filter.isSearchable;
    if (filter.isRequired !== undefined) w['isRequired'] = filter.isRequired;
    return w;
  }
}
