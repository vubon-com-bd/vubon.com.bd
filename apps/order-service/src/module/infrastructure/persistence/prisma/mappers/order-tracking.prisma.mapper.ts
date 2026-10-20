/**
 * OrderTrackingPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity.js';
import { OrderTrackingVO } from '../../../../domain/value-objects/composites/order-tracking.vo.js';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo.js';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

export interface PrismaOrderTrackingRow {
  id: string;
  orderId: string;
  event: string;
  message: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  trackingNumber: string | null;
  createdBy: string | null;
  metadata: unknown;
  occurredAt: Date;
  createdAt: Date;
}

export class OrderTrackingPrismaMapper {
  static toDomain(raw: PrismaOrderTrackingRow): OrderTrackingEntity {
    const vo = OrderTrackingVO.create({
      id: TrackingIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      status: TrackingStatusVO.reconstitute('in_transit'),
      trackingNumber: TrackingNumberVO.reconstitute(raw.trackingNumber ?? raw.id),
      message: raw.message,
      location: raw.location ?? undefined,
      carrier: raw.createdBy ?? undefined,
      occurredAt: new Date(raw.occurredAt).toISOString(),
    });
    return OrderTrackingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.createdAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: OrderTrackingEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      event: 'status_update',
      message: vo.message,
      location: vo.location ?? null,
      trackingNumber: vo.trackingNumber.value,
      occurredAt: new Date(vo.occurredAt),
    };
  }
}
