import { OrderCancelEntity } from '../../domain/entities/order-cancel.entity';
import type { CancelResponseDTO } from '../dtos/responses/cancel-response.dto';

export class CancelMapper {
  static toResponse(cancel: OrderCancelEntity): CancelResponseDTO {
    return {
      id: cancel.id.value,
      orderId: cancel.orderId.value,
      customerId: cancel.customerId.value,
      reason: cancel.reason.value,
      status: cancel.status.value,
      approvedAt: cancel.approvedAt?.toISOString() ?? null,
      rejectedAt: cancel.rejectedAt?.toISOString() ?? null,
      createdAt: cancel.createdAt,
      updatedAt: cancel.updatedAt,
    };
  }
}
