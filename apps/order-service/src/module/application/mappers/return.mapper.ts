import { OrderReturnEntity } from '../../domain/entities/order-return.entity';
import type { ReturnResponseDTO } from '../dtos/responses/return-response.dto';

export class ReturnMapper {
  static toResponse(ret: OrderReturnEntity): ReturnResponseDTO {
    return {
      id: ret.id.value,
      orderId: ret.orderId.value,
      customerId: ret.customerId.value,
      reason: ret.reason.value,
      status: ret.status.value,
      approvedAt: ret.approvedAt?.toISOString() ?? null,
      rejectedAt: ret.rejectedAt?.toISOString() ?? null,
      completedAt: ret.completedAt?.toISOString() ?? null,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  }
}
