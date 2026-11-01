/**
 * OrderTrackingPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type OrderTrackingRepository } from '../../../../domain/repositories/order-tracking.repository.interface.js';
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity.js';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderTrackingPrismaMapper } from '../mappers/order-tracking.prisma.mapper.js';
import type { PrismaOrderTrackingRow } from '../mappers/order-tracking.prisma.mapper.js';

interface OrderTrackingDelegate {
  findFirst(args: unknown): Promise<PrismaOrderTrackingRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderTrackingRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderTrackingRow[]>;
  create(args: unknown): Promise<PrismaOrderTrackingRow>;
  update(args: unknown): Promise<PrismaOrderTrackingRow>;
  delete(args: unknown): Promise<PrismaOrderTrackingRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderTrackingPrismaRepository implements OrderTrackingRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderTrackingDelegate {
    return this.prisma.getModel<OrderTrackingDelegate>('orderTracking');
  }

  async findById(id: string): Promise<OrderTrackingEntity | null> {
    return this.findByIdVO(TrackingIdVO.reconstitute(id));
  }

  async findByIdVO(id: TrackingIdVO): Promise<OrderTrackingEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? OrderTrackingPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => OrderTrackingPrismaMapper.toDomain(r));
  }

  async findByTrackingNumber(trackingNumber: string): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { trackingNumber },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => OrderTrackingPrismaMapper.toDomain(r));
  }

  async findLatestByOrder(orderId: string): Promise<OrderTrackingEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { orderId },
      orderBy: { occurredAt: 'desc' },
    });
    return raw ? OrderTrackingPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { event: status },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => OrderTrackingPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.delegate.findMany({
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => OrderTrackingPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderTrackingEntity): Promise<OrderTrackingEntity> {
    const data = OrderTrackingPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderTrackingPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return OrderTrackingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
