/**
 * DeliveryMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { DeliveryEntity } from '../../domain/entities/delivery.entity.js';
import type { DeliveryMethodEntity } from '../../domain/entities/delivery-method.entity.js';
import type {
  DeliveryResponseDTO,
  DeliveryMethodResponseDTO,
} from '../dtos/responses/delivery-response.dto.js';

export class DeliveryMapper {
  static toResponse(entity: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      deliveryMethodId: entity.methodId?.value,
      status: entity.status.value,
      type: entity.type.value,
      trackingNumber: entity.trackingNumber,
      courierId: entity.courierId,
      estimatedAt: entity.estimatedAt,
      deliveredAt: entity.deliveredAt,
      attempts: entity.attempts,
      notes: entity.notes,
      isInTransit: entity.isInTransit(),
      isComplete: entity.isComplete(),
      canRetry: entity.canRetry(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toMethodResponse(entity: DeliveryMethodEntity): DeliveryMethodResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      carrier: entity.carrier,
      baseCost: entity.baseCost,
      currency: entity.currency,
      estimatedDays: entity.estimatedDays,
      isActive: entity.isActive,
      isFree: entity.isFree(),
      isFast: entity.isFast(),
    };
  }

  static toMethodList(
    methods: readonly DeliveryMethodEntity[],
  ): readonly DeliveryMethodResponseDTO[] {
    return methods.map((m) => this.toMethodResponse(m));
  }

  static toList(entities: readonly DeliveryEntity[]): DeliveryResponseDTO[] {
    return entities.map((e) => this.toResponse(e));
  }
}
