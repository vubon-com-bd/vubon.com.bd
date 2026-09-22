import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderEntity } from '../../../../domain/entities/order.entity';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { OrderNumberVO } from '../../../../domain/value-objects/primitives/order-number.vo';
import { OrderStatusVO } from '../../../../domain/value-objects/primitives/order-status.vo';
import { OrderSubtotalVO } from '../../../../domain/value-objects/primitives/order-subtotal.vo';
import { OrderDiscountVO } from '../../../../domain/value-objects/primitives/order-discount.vo';
import { OrderTaxVO } from '../../../../domain/value-objects/primitives/order-tax.vo';
import { OrderShippingVO } from '../../../../domain/value-objects/primitives/order-shipping.vo';
import { OrderTotalVO } from '../../../../domain/value-objects/primitives/order-total.vo';
import { OrderChannelVO } from '../../../../domain/value-objects/primitives/order-channel.vo';
import { OrderSourceVO } from '../../../../domain/value-objects/primitives/order-source.vo';
import { OrderNoteVO } from '../../../../domain/value-objects/primitives/order-note.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import type { OrderRepository } from '../../../../domain/repositories/order.repository.interface';

@Injectable()
export class OrderPrismaRepository
  extends BasePrismaRepository<OrderEntity, OrderIdVO>
  implements OrderRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrder): OrderEntity {
    return OrderEntity.reconstitute(
      OrderIdVO.create(raw.id),
      {
        orderNumber: OrderNumberVO.create(raw.orderNumber),
        customerId: CustomerIdVO.create(raw.customerId),
        vendorId: raw.vendorId ? VendorIdVO.create(raw.vendorId) : null,
        status: OrderStatusVO.create(raw.status),
        channel: OrderChannelVO.create(raw.channel),
        source: OrderSourceVO.create(raw.source),
        subtotal: OrderSubtotalVO.create(Number(raw.subtotal)),
        discount: OrderDiscountVO.create(Number(raw.discount)),
        tax: OrderTaxVO.create(Number(raw.tax)),
        shipping: OrderShippingVO.create(Number(raw.shipping)),
        total: OrderTotalVO.create(Number(raw.total)),
        note: raw.note ? OrderNoteVO.create(raw.note) : null,
        paymentId: raw.paymentId ? PaymentIdVO.create(raw.paymentId) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: OrderIdVO): Promise<OrderEntity | null> {
    const raw = await this.prisma.order.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderEntity[]> {
    const rows = await this.prisma.order.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderEntity): Promise<OrderEntity> {
    const data = {
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      channel: entity.channel.value,
      source: entity.source.value,
      subtotal: entity.subtotal.value,
      discount: entity.discount.value,
      tax: entity.tax.value,
      shipping: entity.shipping.value,
      total: entity.total.value,
      currency: 'BDT',
      note: entity.note?.value ?? null,
      paymentId: entity.paymentId?.value ?? null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.order.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: OrderIdVO): Promise<void> {
    await this.prisma.order.delete({ where: { id: id.value } });
  }

  async findByNumber(number: OrderNumberVO): Promise<OrderEntity | null> {
    const raw = await this.prisma.order.findUnique({
      where: { orderNumber: number.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByNumber(number: OrderNumberVO): Promise<boolean> {
    const count = await this.prisma.order.count({
      where: { orderNumber: number.value },
    });
    return count > 0;
  }

  async findByCustomer(customerId: CustomerIdVO): Promise<readonly OrderEntity[]> {
    const rows = await this.prisma.order.findMany({
      where: { customerId: customerId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly OrderEntity[]> {
    const rows = await this.prisma.order.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly OrderEntity[]> {
    const rows = await this.prisma.order.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}
