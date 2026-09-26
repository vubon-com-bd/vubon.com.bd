import { DeliveryEntity } from '../../domain/entities/delivery.entity';
import type { DeliveryResponseDTO } from '../dtos/responses/delivery-response.dto';

export class DeliveryMapper {
  static toResponse(delivery: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: delivery.id.value,
      orderId: delivery.orderId.value,
      status: delivery.status.value,
      type: delivery.type.value,
      methodId: delivery.methodId?.value ?? null,
      scheduledAt: delivery.scheduledAt?.toISOString() ?? null,
      attemptedAt: delivery.attemptedAt?.toISOString() ?? null,
      deliveredAt: delivery.deliveredAt?.toISOString() ?? null,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
  }
}
