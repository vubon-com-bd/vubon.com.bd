/**
 * OrderCancelPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type OrderCancelRepository } from '../../../../domain/repositories/order-cancel.repository.interface.js';
import { OrderCancelEntity } from '../../../../domain/entities/order-cancel.entity.js';
import { CancelIdVO } from '../../../../domain/value-objects/primitives/cancel-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderCancelPrismaMapper } from '../mappers/order-cancel.prisma.mapper.js';
import type { PrismaOrderCancelRow } from '../mappers/order-cancel.prisma.mapper.js';

interface OrderCancelDelegate {
  findFirst(args: unknown): Promise<PrismaOrderCancelRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderCancelRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderCancelRow[]>;
  create(args: unknown): Promise<PrismaOrderCancelRow>;
  update(args: unknown): Promise<PrismaOrderCancelRow>;
  delete(args: unknown): Promise<PrismaOrderCancelRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderCancelPrismaRepository implements OrderCancelRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderCancelDelegate {
    return this.prisma.getModel<OrderCancelDelegate>('orderCancel');
  }

  async findById(id: string): Promise<OrderCancelEntity | null> {
    return this.findByIdVO(CancelIdVO.reconstitute(id));
  }

  async findByIdVO(id: CancelIdVO): Promise<OrderCancelEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? OrderCancelPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly OrderCancelEntity[]> {
    const rows = await this.delegate.findMany({ where: { orderId } });
    return rows.map((r) => OrderCancelPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderCancelEntity[]> {
    const rows = await this.delegate.findMany({ where: { status } });
    return rows.map((r) => OrderCancelPrismaMapper.toDomain(r));
  }

  async findPendingOlderThan(minutes: number): Promise<readonly OrderCancelEntity[]> {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'requested', requestedAt: { lt: cutoff } } as never,
    });
    return rows.map((r) => OrderCancelPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderCancelEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => OrderCancelPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderCancelEntity): Promise<OrderCancelEntity> {
    const data = OrderCancelPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderCancelPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return OrderCancelPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
