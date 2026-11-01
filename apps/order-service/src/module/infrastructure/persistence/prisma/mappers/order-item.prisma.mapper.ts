/**
 * OrderItemPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity.js';
import { OrderItemVO } from '../../../../domain/value-objects/composites/order-item.vo.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../domain/value-objects/primitives/order-item-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { toNum, toIso } from './order.prisma.mapper.js';

export interface PrismaOrderItemRow {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  vendorId: string | null;
  sku: string;
  name: string;
  imageUrl: string | null;
  type: string;
  status: string;
  quantity: number;
  unitPrice: unknown;
  compareAtPrice: unknown;
  subtotal: unknown;
  discountAmount: unknown;
  taxAmount: unknown;
  shippingAmount: unknown;
  total: unknown;
  currency: string;
  attributes: unknown;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class OrderItemPrismaMapper {
  static toDomain(raw: PrismaOrderItemRow): OrderItemEntity {
    const vo = OrderItemVO.create({
      id: OrderItemIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      productId: ProductIdVO.reconstitute(raw.productId),
      variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
      vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
      name: raw.name,
      sku: raw.sku,
      quantity: OrderItemQuantityVO.reconstitute(raw.quantity),
      unitPrice: OrderItemPriceVO.create(toNum(raw.unitPrice), raw.currency),
      status: OrderItemStatusVO.reconstitute(raw.status),
    });
    return OrderItemEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: OrderItemEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      productId: vo.productId.value,
      variantId: vo.variantId?.value ?? null,
      vendorId: vo.vendorId?.value ?? null,
      sku: vo.sku,
      name: vo.name,
      type: 'product',
      status: vo.status.value,
      quantity: vo.quantity.value,
      unitPrice: vo.unitPrice.amount,
      subtotal: vo.unitPrice.amount * vo.quantity.value,
      total: vo.unitPrice.amount * vo.quantity.value,
      currency: vo.unitPrice.currency,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static _unusedToIso = toIso;
}
