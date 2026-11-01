/**
 * OrderReturnPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderReturnEntity } from '../../../../domain/entities/order-return.entity.js';
import { OrderReturnVO } from '../../../../domain/value-objects/composites/order-return.vo.js';
import { ReturnIdVO } from '../../../../domain/value-objects/primitives/return-id.vo.js';
import { ReturnReasonVO } from '../../../../domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../../domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

export interface PrismaOrderReturnRow {
  id: string;
  orderId: string;
  customerId: string;
  status: string;
  reason: string;
  itemIds: string[];
  images: string[];
  notes: string | null;
  refundAmount: unknown;
  restockFee: unknown;
  currency: string;
  requestedAt: Date;
  approvedAt: Date | null;
  pickedUpAt: Date | null;
  receivedAt: Date | null;
  refundedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderReturnPrismaMapper {
  static toDomain(raw: PrismaOrderReturnRow): OrderReturnEntity {
    const vo = OrderReturnVO.create({
      id: ReturnIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      customerId: CustomerIdVO.reconstitute(raw.customerId),
      reason: ReturnReasonVO.reconstitute(raw.reason),
      status: ReturnStatusVO.reconstitute(raw.status),
      itemIds: raw.itemIds,
      notes: raw.notes ?? undefined,
      imageUrls: raw.images.length > 0 ? raw.images : undefined,
      requestedAt: new Date(raw.requestedAt).toISOString(),
    });
    return OrderReturnEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: OrderReturnEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      customerId: vo.customerId.value,
      status: vo.status.value,
      reason: vo.reason.value,
      itemIds: [...vo.itemIds],
      images: vo.imageUrls ? [...vo.imageUrls] : [],
      notes: vo.notes ?? null,
      requestedAt: new Date(vo.requestedAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
