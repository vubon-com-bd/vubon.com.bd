/**
 * OrderItemPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type OrderItemRepository } from '../../../../domain/repositories/order-item.repository.interface.js';
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderPrismaService } from '../prisma.service.js';
import { OrderItemPrismaMapper } from '../mappers/order-item.prisma.mapper.js';
import type { PrismaOrderItemRow } from '../mappers/order-item.prisma.mapper.js';

interface OrderItemDelegate {
  findFirst(args: unknown): Promise<PrismaOrderItemRow | null>;
  findUnique(args: unknown): Promise<PrismaOrderItemRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderItemRow[]>;
  create(args: unknown): Promise<PrismaOrderItemRow>;
  update(args: unknown): Promise<PrismaOrderItemRow>;
  delete(args: unknown): Promise<PrismaOrderItemRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class OrderItemPrismaRepository implements OrderItemRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): OrderItemDelegate {
    return this.prisma.getModel<OrderItemDelegate>('orderItem');
  }

  async findById(id: string): Promise<OrderItemEntity | null> {
    return this.findByIdVO(OrderItemIdVO.reconstitute(id));
  }

  async findByIdVO(id: OrderItemIdVO): Promise<OrderItemEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? OrderItemPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async findByProduct(productId: string): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId, deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async findByVendor(vendorId: string): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { vendorId, deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async findByOrderAndStatus(
    orderId: string,
    status: string,
  ): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, status, deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async findAll(): Promise<readonly OrderItemEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => OrderItemPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: OrderItemEntity): Promise<OrderItemEntity> {
    const data = OrderItemPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return OrderItemPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return OrderItemPrismaMapper.toDomain(created);
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
}
