import type { FulfillmentEntity } from '../../domain/entities/fulfillment.entity.js';
import type { FulfillmentResponseDTO, FulfillmentListResponseDTO } from '../dtos/responses/fulfillment/fulfillment-response.dto.js';
import type { FulfillmentTypeValue, FulfillmentStatusValue, FulfillmentPriorityValue } from '@vubon/shared-types/logistics';
export class FulfillmentMapper {
  static toResponse(e: FulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: e.id, orderId: e.orderId.value,
      vendorId: e.vendorId?.value, warehouseId: e.warehouseId?.value,
      status: e.status.value as FulfillmentStatusValue,
      type: e.type.value as FulfillmentTypeValue,
      priority: e.priority.value as FulfillmentPriorityValue,
      itemIds: e.itemIds, itemCount: e.itemCount,
      assignedTo: e.assignedTo as unknown as string | undefined,
      pickedAt: e.pickedAt, packedAt: e.packedAt, shippedAt: e.shippedAt, cancelledAt: e.cancelledAt,
      notes: e.notes?.value,
      slaDueAt: e.sla?.dueAt, slaBreached: e.isSlaBreached(),
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly FulfillmentEntity[], total: number, page: number, limit: number): FulfillmentListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
