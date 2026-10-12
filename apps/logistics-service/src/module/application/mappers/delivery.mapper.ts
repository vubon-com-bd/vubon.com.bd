import type { DeliveryEntity } from '../../domain/entities/delivery.entity.js';
import type { DeliveryResponseDTO, DeliveryListResponseDTO, DeliveryAttemptResponseDTO } from '../dtos/responses/delivery/delivery-response.dto.js';
import type { DeliveryStatusValue, DeliveryTypeValue } from '@vubon/shared-types/logistics';
export class DeliveryMapper {
  static toResponse(e: DeliveryEntity): DeliveryResponseDTO {
    const attempts: DeliveryAttemptResponseDTO[] = e.attempts.map((a) => ({
      id: a.id, attemptNumber: a.attemptNumber.value,
      status: a.status.value, reason: a.reason, driverId: a.driverId,
      attemptedAt: a.attemptedAt, location: a.location, images: a.images, notes: a.notes,
    }));
    return {
      id: e.id, shipmentId: e.shipmentId.value, orderId: e.orderId.value,
      userId: e.userId?.value,
      status: e.status.value as DeliveryStatusValue,
      type: e.type.value as DeliveryTypeValue,
      driverId: e.driverId?.value, vehicleId: e.vehicleId?.value, routeId: e.routeId?.value,
      recipientName: e.recipientName, recipientPhone: e.recipientPhone as unknown as string | undefined,
      deliveryAddress: e.deliveryAddress.toAddress(),
      scheduledAt: e.scheduledAt, pickedUpAt: e.pickedUpAt, arrivedAt: e.arrivedAt,
      deliveredAt: e.deliveredAt, failedAt: e.failedAt, cancelledAt: e.cancelledAt,
      attemptCount: e.attemptCount, remainingAttempts: e.remainingAttempts,
      attempts, proofType: e.proofOfDelivery?.type,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly DeliveryEntity[], total: number, page: number, limit: number): DeliveryListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
