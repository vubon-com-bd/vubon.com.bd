/**
 * CheckoutPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import {
  type CheckoutRepository,
  type CheckoutListOptions,
  type CheckoutPaginationResult,
} from '../../../../domain/repositories/checkout.repository.interface.js';
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity.js';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { CheckoutPrismaMapper } from '../mappers/checkout.prisma.mapper.js';
import type { PrismaCheckoutRow } from '../mappers/checkout.prisma.mapper.js';

interface CheckoutDelegate {
  findFirst(args: unknown): Promise<PrismaCheckoutRow | null>;
  findUnique(args: unknown): Promise<PrismaCheckoutRow | null>;
  findMany(args?: unknown): Promise<PrismaCheckoutRow[]>;
  create(args: unknown): Promise<PrismaCheckoutRow>;
  update(args: unknown): Promise<PrismaCheckoutRow>;
  delete(args: unknown): Promise<PrismaCheckoutRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class CheckoutPrismaRepository implements CheckoutRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): CheckoutDelegate {
    return this.prisma.getModel<CheckoutDelegate>('checkout');
  }

  async findById(id: string): Promise<CheckoutEntity | null> {
    return this.findByIdVO(CheckoutIdVO.reconstitute(id));
  }

  async findByIdVO(id: CheckoutIdVO): Promise<CheckoutEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? CheckoutPrismaMapper.toDomain(raw) : null;
  }

  async findByCustomer(customerId: string): Promise<readonly CheckoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { customerId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CheckoutPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly CheckoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => CheckoutPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly CheckoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => CheckoutPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: CheckoutEntity): Promise<CheckoutEntity> {
    const data = CheckoutPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return CheckoutPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return CheckoutPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }

  async findPaginated(options: CheckoutListOptions): Promise<CheckoutPaginationResult> {
    const where = this.buildWhere(options);

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map((r) => CheckoutPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findExpired(olderThanMinutes: number): Promise<readonly CheckoutEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['started', 'in_progress'] },
        expiresAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => CheckoutPrismaMapper.toDomain(r));
  }

  async findAbandoned(olderThanMinutes: number): Promise<readonly CheckoutEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'abandoned',
        updatedAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => CheckoutPrismaMapper.toDomain(r));
  }

  private buildWhere(options: CheckoutListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.customerId) where['customerId'] = f.customerId;
    if (f.status) where['status'] = f.status;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }
}
