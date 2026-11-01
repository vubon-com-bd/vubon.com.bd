/**
 * OrderReturnPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type OrderReturnRepository } from '../../../../domain/repositories/order-return.repository.interface.js';
import { OrderReturnEntity } from '../../../../domain/entities/order-return.entity.js';
import { ReturnIdVO } from '../../../../domain/value-objects/primitives/return-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderReturnPrismaMapper } from '../mappers/order-return.prisma.mapper.js';
import type { PrismaOrderReturnRow } from '../mappers/order-return.prisma.mapper.js';

interface OrderReturnDelegate {
  findFirst(args: unknown): Promise<PrismaOrderReturnRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderReturnRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderReturnRow[]>;
  create(args: unknown): Promise<PrismaOrderReturnRow>;
  update(args: unknown): Promise<PrismaOrderReturnRow>;
  delete(args: unknown): Promise<PrismaOrderReturnRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderReturnPrismaRepository implements OrderReturnRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderReturnDelegate {
    return this.prisma.getModel<OrderReturnDelegate>('orderReturn');
  }

  async findById(id: string): Promise<OrderReturnEntity | null> {
    return this.findByIdVO(ReturnIdVO.reconstitute(id));
  }

  async findByIdVO(id: ReturnIdVO): Promise<OrderReturnEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? OrderReturnPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany({ where: { orderId } });
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async findByCustomer(customerId: string): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany({ where: { customerId } });
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany({ where: { status } });
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async findPickupScheduledBefore(cutoffAt: string): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'pickup_scheduled',
        requestedAt: { lt: new Date(cutoffAt) },
      } as never,
    });
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async findAwaitingInspection(): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'received' } as never,
    });
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => OrderReturnPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderReturnEntity): Promise<OrderReturnEntity> {
    const data = OrderReturnPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderReturnPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return OrderReturnPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
