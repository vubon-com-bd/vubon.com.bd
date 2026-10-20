/**
 * OrderFulfillmentPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderFulfillmentEntity } from '../../../../domain/entities/order-fulfillment.entity.js';
import { OrderFulfillmentVO } from '../../../../domain/value-objects/composites/order-fulfillment.vo.js';
import { FulfillmentIdVO } from '../../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { toIso } from './order.prisma.mapper.js';

export interface PrismaOrderFulfillmentRow {
  id: string;
  orderId: string;
  vendorId: string | null;
  status: string;
  type: string;
  itemIds: string[];
  trackingNumber: string | null;
  courierId: string | null;
  warehouseId: string | null;
  shippingCost: unknown;
  currency: string;
  fulfilledAt: Date | null;
  deliveredAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderFulfillmentPrismaMapper {
  static toDomain(raw: PrismaOrderFulfillmentRow): OrderFulfillmentEntity {
    const vo = OrderFulfillmentVO.create({
      id: FulfillmentIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
      status: FulfillmentStatusVO.reconstitute(raw.status),
      itemIds: raw.itemIds,
      trackingNumber: raw.trackingNumber ?? undefined,
      courierId: raw.courierId ?? undefined,
      warehouseId: raw.warehouseId ?? undefined,
      fulfilledAt: toIso(raw.fulfilledAt),
      deliveredAt: toIso(raw.deliveredAt),
    });
    return OrderFulfillmentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: OrderFulfillmentEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      vendorId: vo.vendorId?.value ?? null,
      status: vo.status.value,
      type: 'standard',
      itemIds: [...vo.itemIds],
      trackingNumber: vo.trackingNumber ?? null,
      courierId: vo.courierId ?? null,
      warehouseId: vo.warehouseId ?? null,
      fulfilledAt: vo.fulfilledAt ? new Date(vo.fulfilledAt) : null,
      deliveredAt: vo.deliveredAt ? new Date(vo.deliveredAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
