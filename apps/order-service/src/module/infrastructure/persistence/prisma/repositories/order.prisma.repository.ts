/**
 * OrderPrismaRepository — implements OrderRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import {
  type OrderRepository,
  type OrderListOptions,
  type OrderPaginationResult,
  type OrderStats,
} from '../../../../domain/repositories/order.repository.interface.js';
import { OrderEntity } from '../../../../domain/entities/order.entity.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderPrismaMapper } from '../mappers/order.prisma.mapper.js';
import type { PrismaOrderRow } from '../mappers/order.prisma.mapper.js';

interface OrderDelegate {
  findFirst(args: unknown): Promise<PrismaOrderRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderRow[]>;
  create(args: unknown): Promise<PrismaOrderRow>;
  update(args: unknown): Promise<PrismaOrderRow>;
  delete(args: unknown): Promise<PrismaOrderRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderDelegate {
    return this.prisma.getModel<OrderDelegate>('order');
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.findByIdVO(OrderIdVO.reconstitute(id));
  }

  async findByIdVO(id: OrderIdVO): Promise<OrderEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? OrderPrismaMapper.toDomain(raw) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<OrderEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { orderNumber, deletedAt: null },
    });
    return raw ? OrderPrismaMapper.toDomain(raw) : null;
  }

  async findByCustomer(customerId: string): Promise<readonly OrderEntity[]> {
    const rows = await this.delegate.findMany({
      where: { customerId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderEntity): Promise<OrderEntity> {
    const data = OrderPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return OrderPrismaMapper.toDomain(created);
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

  async findPaginated(options: OrderListOptions): Promise<OrderPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

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
      items: rows.map((r) => OrderPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(customerId?: string): Promise<OrderStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (customerId) where['customerId'] = customerId;

    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, total: true, currency: true },
    })) as unknown as Array<{ status: string; total: unknown; currency: string }>;

    const byStatus: Record<string, number> = {};
    let totalRevenue = 0;
    let currency = 'BDT';

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      totalRevenue += Number(r.total);
      currency = r.currency;
    }

    return {
      total: rows.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      averageOrderValue: rows.length
        ? Math.round((totalRevenue / rows.length) * 100) / 100
        : 0,
      currency,
      byStatus,
    };
  }

  async findStalePending(olderThanMinutes: number): Promise<readonly OrderEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  async findExpiredUnconfirmed(olderThanHours: number): Promise<readonly OrderEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  async findAwaitingFulfillment(): Promise<readonly OrderEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'confirmed', deletedAt: null } as never,
    });
    return rows.map((r) => OrderPrismaMapper.toDomain(r));
  }

  private buildWhere(options: OrderListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };

    if (f.customerId) where['customerId'] = f.customerId;
    if (f.vendorId) where['vendorIds'] = { has: f.vendorId };
    if (f.status) where['status'] = f.status;
    if (f.priority) where['priority'] = f.priority;
    if (f.channel) where['type'] = f.channel;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    if (f.minTotal !== undefined || f.maxTotal !== undefined) {
      where['total'] = {
        ...(f.minTotal !== undefined ? { gte: f.minTotal } : {}),
        ...(f.maxTotal !== undefined ? { lte: f.maxTotal } : {}),
      };
    }
    return where;
  }

  private buildOrderBy(options: OrderListOptions): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const map: Record<string, string> = {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      totalAmount: 'total',
      status: 'status',
    };
    const field = map[options.sortBy ?? 'createdAt'] ?? 'createdAt';
    return { [field]: dir };
  }
}
