/**
 * DeliveryMethodPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { DeliveryMethodEntity } from '../../../../domain/entities/delivery-method.entity.js';
import { DeliveryMethodVO } from '../../../../domain/value-objects/composites/delivery-method.vo.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '../../../../domain/value-objects/primitives/delivery-method-type.vo.js';
import { toNum } from './order.prisma.mapper.js';

export interface PrismaDeliveryMethodRow {
  id: string;
  name: string;
  type: string;
  carrier: string | null;
  baseCost: unknown;
  currency: string;
  estimatedDays: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class DeliveryMethodPrismaMapper {
  static toDomain(raw: PrismaDeliveryMethodRow): DeliveryMethodEntity {
    const vo = DeliveryMethodVO.create({
      id: DeliveryMethodIdVO.reconstitute(raw.id),
      name: raw.name,
      type: DeliveryMethodTypeVO.reconstitute(raw.type),
      carrier: raw.carrier ?? undefined,
      baseCost: toNum(raw.baseCost),
      currency: raw.currency,
      estimatedDays: raw.estimatedDays,
      isActive: raw.isActive,
    });
    return DeliveryMethodEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      version: 0,
      props: { vo },
    });
  }

  static toPersistence(entity: DeliveryMethodEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value,
      carrier: vo.carrier ?? null,
      baseCost: vo.baseCost,
      currency: vo.currency,
      estimatedDays: vo.estimatedDays,
      isActive: vo.isActive,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
