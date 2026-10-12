import type { ReturnShipmentEntity } from '../../domain/entities/return-shipment.entity.js';
import type { ReturnShipmentResponseDTO, ReturnShipmentListResponseDTO } from '../dtos/responses/return-shipment/return-shipment-response.dto.js';
import type { ReturnShipmentStatusValue, ReturnShipmentTypeValue, ReturnReasonValue } from '@vubon/shared-types/logistics';
export class ReturnShipmentMapper {
  static toResponse(e: ReturnShipmentEntity): ReturnShipmentResponseDTO {
    return {
      id: e.id, rmaNumber: e.rmaNumber.value,
      orderId: e.orderId.value,
      originalShipmentId: e.originalShipmentId?.value,
      userId: e.userId.value,
      status: e.status.value as ReturnShipmentStatusValue,
      type: e.type.value as ReturnShipmentTypeValue,
      reason: e.reason.value as ReturnReasonValue,
      description: e.description?.value,
      images: e.images, itemIds: e.itemIds, itemCount: e.itemCount,
      pickupAddress: e.pickupAddress.toAddress(),
      pickupScheduledAt: e.pickupScheduledAt, pickedUpAt: e.pickedUpAt,
      receivedAt: e.receivedAt, inspectedAt: e.inspectedAt,
      inspectedBy: e.inspectedBy as unknown as string | undefined,
      restockable: e.restockable,
      refundAmount: e.refundAmount?.amount, refundCurrency: e.refundAmount?.currency,
      restockFeeAmount: e.restockFeeAmount, trackingNumber: e.trackingNumber,
      notes: e.notes?.value,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly ReturnShipmentEntity[], total: number, page: number, limit: number): ReturnShipmentListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
