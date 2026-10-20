/**
 * DeliveryPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity.js';
import { DeliveryVO } from '../../../../domain/value-objects/composites/delivery.vo.js';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo.js';
import { toIso } from './order.prisma.mapper.js';

export interface PrismaDeliveryRow {
  id: string;
  orderId: string;
  deliveryMethodId: string | null;
  status: string;
  type: string;
  trackingNumber: string | null;
  courierId: string | null;
  estimatedAt: Date | null;
  deliveredAt: Date | null;
  attempts: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class DeliveryPrismaMapper {
  static toDomain(raw: PrismaDeliveryRow): DeliveryEntity {
    const vo = DeliveryVO.create({
      id: DeliveryIdVO.reconstitute(raw.id),
      orderId: OrderIdVO.reconstitute(raw.orderId),
      methodId: DeliveryMethodIdVO.reconstitute(raw.deliveryMethodId ?? raw.id),
      status: DeliveryStatusVO.reconstitute(raw.status),
      type: DeliveryTypeVO.reconstitute(raw.type),
      trackingNumber: raw.trackingNumber
        ? TrackingNumberVO.reconstitute(raw.trackingNumber)
        : undefined,
      courierId: raw.courierId ?? undefined,
      estimatedAt: toIso(raw.estimatedAt),
      deliveredAt: toIso(raw.deliveredAt),
      attempts: raw.attempts,
    });
    return DeliveryEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: 0,
      props: { vo },
    });
  }

  static toPersistence(entity: DeliveryEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      deliveryMethodId: vo.methodId.value,
      status: vo.status.value,
      type: vo.type.value,
      trackingNumber: vo.trackingNumber?.value ?? null,
      courierId: vo.courierId ?? null,
      estimatedAt: vo.estimatedAt ? new Date(vo.estimatedAt) : null,
      deliveredAt: vo.deliveredAt ? new Date(vo.deliveredAt) : null,
      attempts: vo.attempts,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
