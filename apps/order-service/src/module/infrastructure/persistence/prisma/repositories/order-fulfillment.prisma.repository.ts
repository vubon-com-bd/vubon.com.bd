/**
 * OrderFulfillmentPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type OrderFulfillmentRepository } from '../../../../domain/repositories/order-fulfillment.repository.interface.js';
import { OrderFulfillmentEntity } from '../../../../domain/entities/order-fulfillment.entity.js';
import { FulfillmentIdVO } from '../../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderFulfillmentPrismaMapper } from '../mappers/order-fulfillment.prisma.mapper.js';
import type { PrismaOrderFulfillmentRow } from '../mappers/order-fulfillment.prisma.mapper.js';

interface OrderFulfillmentDelegate {
  findFirst(args: unknown): Promise<PrismaOrderFulfillmentRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderFulfillmentRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderFulfillmentRow[]>;
  create(args: unknown): Promise<PrismaOrderFulfillmentRow>;
  update(args: unknown): Promise<PrismaOrderFulfillmentRow>;
  delete(args: unknown): Promise<PrismaOrderFulfillmentRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderFulfillmentPrismaRepository implements OrderFulfillmentRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderFulfillmentDelegate {
    return this.prisma.getModel<OrderFulfillmentDelegate>('orderFulfillment');
  }

  async findById(id: string): Promise<OrderFulfillmentEntity | null> {
    return this.findByIdVO(FulfillmentIdVO.reconstitute(id));
  }

  async findByIdVO(id: FulfillmentIdVO): Promise<OrderFulfillmentEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? OrderFulfillmentPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.delegate.findMany({ where: { orderId } });
    return rows.map((r) => OrderFulfillmentPrismaMapper.toDomain(r));
  }

  async findByVendor(vendorId: string): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.delegate.findMany({ where: { vendorId } });
    return rows.map((r) => OrderFulfillmentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.delegate.findMany({ where: { status } });
    return rows.map((r) => OrderFulfillmentPrismaMapper.toDomain(r));
  }

  async findAwaitingFulfillment(): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: { in: ['unfulfilled', 'pending'] } } as never,
    });
    return rows.map((r) => OrderFulfillmentPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => OrderFulfillmentPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderFulfillmentEntity): Promise<OrderFulfillmentEntity> {
    const data = OrderFulfillmentPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderFulfillmentPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return OrderFulfillmentPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
