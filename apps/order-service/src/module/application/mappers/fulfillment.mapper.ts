import { OrderFulfillmentEntity } from '../../domain/entities/order-fulfillment.entity';
import type { FulfillmentResponseDTO } from '../dtos/responses/fulfillment-response.dto';

export class FulfillmentMapper {
  static toResponse(f: OrderFulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: f.id.value,
      orderId: f.orderId.value,
      vendorId: f.vendorId?.value ?? null,
      status: f.status.value,
      startedAt: f.startedAt?.toISOString() ?? null,
      packedAt: f.packedAt?.toISOString() ?? null,
      shippedAt: f.shippedAt?.toISOString() ?? null,
      completedAt: f.completedAt?.toISOString() ?? null,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    };
  }
}
