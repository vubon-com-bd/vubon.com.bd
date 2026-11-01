/**
 * DeliveryPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import {
  type DeliveryRepository,
  type DeliveryListOptions,
  type DeliveryPaginationResult,
} from '../../../../domain/repositories/delivery.repository.interface.js';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { DeliveryPrismaMapper } from '../mappers/delivery.prisma.mapper.js';
import type { PrismaDeliveryRow } from '../mappers/delivery.prisma.mapper.js';

interface DeliveryDelegate {
  findFirst(args: unknown): Promise<PrismaDeliveryRow | null>;
  findUnique(args: unknown): Promise<PrismaDeliveryRow | null>;
  findMany(args?: unknown): Promise<PrismaDeliveryRow[]>;
  create(args: unknown): Promise<PrismaDeliveryRow>;
  update(args: unknown): Promise<PrismaDeliveryRow>;
  delete(args: unknown): Promise<PrismaDeliveryRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class DeliveryPrismaRepository implements DeliveryRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): DeliveryDelegate {
    return this.prisma.getModel<DeliveryDelegate>('delivery');
  }

  async findById(id: string): Promise<DeliveryEntity | null> {
    return this.findByIdVO(DeliveryIdVO.reconstitute(id));
  }

  async findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? DeliveryPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByCourier(courierId: string): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { courierId, deletedAt: null },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { trackingNumber, deletedAt: null },
    });
    return raw ? DeliveryPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data = DeliveryPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return DeliveryPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return DeliveryPrismaMapper.toDomain(created);
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

  async findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult> {
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
      items: rows.map((r) => DeliveryPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findRetryable(): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'failed', deletedAt: null } as never,
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findOverdueEstimated(now: string): Promise<readonly DeliveryEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        estimatedAt: { lt: new Date(now) },
        status: { in: ['pending', 'scheduled', 'in_transit'] },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  private buildWhere(options: DeliveryListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.courierId) where['courierId'] = f.courierId;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }
}
