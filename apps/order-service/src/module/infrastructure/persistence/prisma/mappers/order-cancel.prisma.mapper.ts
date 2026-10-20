/**
 * OrderCancelPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderCancelEntity } from '../../../../domain/entities/order-cancel.entity.js';
import { OrderCancelVO } from '../../../../domain/value-objects/composites/order-cancel.vo.js';
import { CancelIdVO } from '../../../../domain/value-objects/primitives/cancel-id.vo.js';
import { CancelReasonVO } from '../../../../domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../../domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { toIso } from './order.prisma.mapper.js';

export interface PrismaOrderCancelRow {
  id: string;
  orderId: string;
  reason: string;
  status: string;
  requestedBy: string;
  approvedBy: string | null;
  notes: string | null;
  refundAmount: unknown;
  currency: string;
  restockInventory: boolean;
  requestedAt: Date;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderCancelPrismaMapper {
  static toDomain(raw: PrismaOrderCancelRow): OrderCancelEntity {
    const vo = OrderCancelVO.create({
      id: CancelIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      reason: CancelReasonVO.reconstitute(raw.reason),
      status: CancelStatusVO.reconstitute(raw.status),
      requestedBy: raw.requestedBy,
      approvedBy: raw.approvedBy ?? undefined,
      notes: raw.notes ?? undefined,
      requestedAt: new Date(raw.requestedAt).toISOString(),
      processedAt: toIso(raw.processedAt),
    });
    return OrderCancelEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: OrderCancelEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      reason: vo.reason.value,
      status: vo.status.value,
      requestedBy: vo.requestedBy,
      approvedBy: vo.approvedBy ?? null,
      notes: vo.notes ?? null,
      requestedAt: new Date(vo.requestedAt),
      processedAt: vo.processedAt ? new Date(vo.processedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
