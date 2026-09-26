import { Injectable } from '@nestjs/common';
import { OrderItem as PrismaOrderItem } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo';
import { OrderItemQuantityVO } from '../../../../domain/value-objects/primitives/order-item-quantity.vo';
import { OrderItemPriceVO } from '../../../../domain/value-objects/primitives/order-item-price.vo';
import { OrderItemStatusVO } from '../../../../domain/value-objects/primitives/order-item-status.vo';
import type { OrderItemRepository } from '../../../../domain/repositories/order-item.repository.interface';

@Injectable()
export class OrderItemPrismaRepository
  extends BasePrismaRepository<OrderItemEntity, OrderItemIdVO>
  implements OrderItemRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderItem): OrderItemEntity {
    return OrderItemEntity.reconstitute(
      OrderItemIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        variantId: raw.variantId ? VariantIdVO.create(raw.variantId) : null,
        productName: raw.productName,
        quantity: OrderItemQuantityVO.create(raw.quantity),
        priceAtPurchase: OrderItemPriceVO.create(Number(raw.priceAtPurchase)),
        status: OrderItemStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: OrderItemIdVO): Promise<OrderItemEntity | null> {
    const raw = await this.prisma.orderItem.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderItemEntity[]> {
    const rows = await this.prisma.orderItem.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderItemEntity): Promise<OrderItemEntity> {
    const data = {
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      productName: entity.productName,
      quantity: entity.quantity.value,
      priceAtPurchase: entity.priceAtPurchase.value,
      currency: 'BDT',
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.orderItem.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, orderId: '', ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: OrderItemIdVO): Promise<void> {
    await this.prisma.orderItem.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly OrderItemEntity[]> {
    const rows = await this.prisma.orderItem.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByOrder(orderId: OrderIdVO): Promise<void> {
    await this.prisma.orderItem.deleteMany({ where: { orderId: orderId.value } });
  }
}
