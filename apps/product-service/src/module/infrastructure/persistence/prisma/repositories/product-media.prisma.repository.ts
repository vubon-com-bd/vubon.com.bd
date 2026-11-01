/**
 * ProductMediaPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type { ProductMediaRepository } from '../../../../domain/repositories/product-media.repository.interface.js';
import { ProductMediaEntity } from '../../../../domain/entities/product-media.entity.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductMediaPrismaMapper,
  type PrismaProductMediaRow,
} from '../mappers/product-media.prisma.mapper.js';

interface MediaDelegate {
  findFirst(args: unknown): Promise<PrismaProductMediaRow | null>;
  findUnique(args: unknown): Promise<PrismaProductMediaRow | null>;
  findMany(args?: unknown): Promise<PrismaProductMediaRow[]>;
  create(args: unknown): Promise<PrismaProductMediaRow>;
  update(args: unknown): Promise<PrismaProductMediaRow>;
  delete(args: unknown): Promise<PrismaProductMediaRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class ProductMediaPrismaRepository implements ProductMediaRepository {
  private readonly logger = new Logger(ProductMediaPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): MediaDelegate {
    return this.prisma.getModel<MediaDelegate>('productMedia');
  }

  async findById(id: string): Promise<ProductMediaEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductMediaPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductMediaPrismaMapper.toDomain);
  }

  async save(entity: ProductMediaEntity): Promise<ProductMediaEntity> {
    const data = ProductMediaPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductMediaPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductMediaPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByProduct(productId: ProductIdVO): Promise<ProductMediaEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { productId: productId.value, deletedAt: null },
    });
    return raw ? ProductMediaPrismaMapper.toDomain(raw) : null;
  }

  async findAllByProduct(productId: ProductIdVO): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, deletedAt: null },
    });
    return rows.map(ProductMediaPrismaMapper.toDomain);
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
}
