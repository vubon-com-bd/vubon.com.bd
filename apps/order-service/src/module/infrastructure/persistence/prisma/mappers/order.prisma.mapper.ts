/**
 * OrderPrismaMapper — row ↔ OrderEntity
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderEntity } from '../../../../domain/entities/order.entity.js';
import { OrderVO } from '../../../../domain/value-objects/composites/order.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderNumberVO } from '../../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../domain/value-objects/primitives/order-status.vo.js';
import { OrderChannelVO } from '../../../../domain/value-objects/primitives/order-channel.vo.js';
import { OrderSourceVO } from '../../../../domain/value-objects/primitives/order-source.vo.js';
import { OrderNoteVO } from '../../../../domain/value-objects/primitives/order-note.vo.js';
import { OrderSubtotalVO } from '../../../../domain/value-objects/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../../../../domain/value-objects/primitives/order-discount.vo.js';
import { OrderTaxVO } from '../../../../domain/value-objects/primitives/order-tax.vo.js';
import { OrderShippingVO } from '../../../../domain/value-objects/primitives/order-shipping.vo.js';
import { OrderTotalVO } from '../../../../domain/value-objects/primitives/order-total.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

export interface PrismaOrderRow {
  id: string;
  orderNumber: string;
  customerId: string;
  vendorIds: string[];
  type: string;
  status: string;
  priority: string;
  subtotal: unknown;
  discountAmount: unknown;
  taxAmount: unknown;
  shippingAmount: unknown;
  total: unknown;
  currency: string;
  paymentId: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  shippingMethod: string | null;
  trackingNumber: string | null;
  notes: string | null;
  customerNotes: string | null;
  confirmedAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  cancelledAt: Date | null;
  completedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class OrderPrismaMapper {
  static toDomain(raw: PrismaOrderRow): OrderEntity {
    const vo = OrderVO.create({
      id: OrderIdVO.reconstitute(raw.id),
      orderNumber: OrderNumberVO.reconstitute(raw.orderNumber),
      customerId: CustomerIdVO.reconstitute(raw.customerId),
      status: OrderStatusVO.reconstitute(raw.status),
      channel: OrderChannelVO.reconstitute('web'),
      source: OrderSourceVO.reconstitute('customer'),
      subtotal: OrderSubtotalVO.create(toNum(raw.subtotal), raw.currency),
      discount: OrderDiscountVO.create(toNum(raw.discountAmount), raw.currency),
      tax: OrderTaxVO.create(toNum(raw.taxAmount), raw.currency),
      shipping: OrderShippingVO.create(toNum(raw.shippingAmount), raw.currency),
      total: OrderTotalVO.create(toNum(raw.total), raw.currency),
      note: raw.notes ? OrderNoteVO.reconstitute(raw.notes) : undefined,
    });
    return OrderEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        vo,
        items: [],
        shippingAddress: undefined as never,
        billingAddress: undefined,
        paymentMethod: raw.paymentMethod ?? undefined,
        confirmedAt: toIso(raw.confirmedAt),
        shippedAt: toIso(raw.shippedAt),
        deliveredAt: toIso(raw.deliveredAt),
        completedAt: toIso(raw.completedAt),
        cancelledAt: toIso(raw.cancelledAt),
      },
    });
  }

  static toPersistence(entity: OrderEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderNumber: vo.orderNumber.value,
      customerId: vo.customerId.value,
      type: 'regular',
      status: vo.status.value,
      priority: 'normal',
      subtotal: vo.subtotal.amount,
      discountAmount: vo.discount.amount,
      taxAmount: vo.tax.amount,
      shippingAmount: vo.shipping.amount,
      total: vo.total.amount,
      currency: vo.total.currency,
      paymentMethod: entity.paymentMethod ?? null,
      notes: entity.note?.value ?? null,
      confirmedAt: entity.confirmedAt ? new Date(entity.confirmedAt) : null,
      shippedAt: entity.shippedAt ? new Date(entity.shippedAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
