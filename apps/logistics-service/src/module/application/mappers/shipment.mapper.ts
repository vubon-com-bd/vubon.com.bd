/**
 * ShipmentMapper — Entity → Response DTO
 * @module logistics-service/application/mappers
 */
import type { ShipmentEntity } from '../../domain/entities/shipment.entity.js';
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentSummaryResponseDTO,
  ShipmentListResponseDTO,
} from '../dtos/responses/shipment/shipment-response.dto.js';
import type {
  ShipmentStatusValue,
  ShipmentTypeValue,
  ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';

export class ShipmentMapper {
  static toResponse(entity: ShipmentEntity): ShipmentResponseDTO {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      orderId: entity.orderId.value,
      userId: entity.userId?.value,
      vendorId: entity.vendorId?.value,
      warehouseId: entity.warehouseId?.value,
      courierId: entity.courierId?.value,
      courierTrackingNumber: entity.courierTrackingNumber,
      type: entity.type.value as ShipmentTypeValue,
      priority: entity.priority.value as ShipmentPriorityValue,
      status: entity.status.value as ShipmentStatusValue,
      shippingAddress: entity.shippingAddress.toAddress(),
      pickupAddress: entity.pickupAddress?.toAddress(),
      itemCount: entity.itemCount,
      packageCount: entity.packages.length,
      weightKg: entity.dimensions.actualWeightKg.value,
      volumeM3: entity.dimensions.volumetricWeightKg?.value,
      dimensions: entity.dimensions.dimensions
        ? {
            lengthCm: entity.dimensions.dimensions.lengthCm,
            widthCm: entity.dimensions.dimensions.widthCm,
            heightCm: entity.dimensions.dimensions.heightCm,
          }
        : undefined,
      chargeableWeightKg: entity.dimensions.chargeableWeightKg.value,
      isCOD: entity.isCOD,
      codAmount: entity.codAmount?.amount,
      isInsured: entity.isInsured,
      declaredValue: entity.declaredValue?.amount,
      currency: entity.declaredValue?.currency,
      shippingCost: entity.shippingCost?.amount,
      labelUrl: entity.labelUrl,
      estimatedDeliveryAt: entity.estimatedDeliveryAt,
      pickedUpAt: entity.pickedUpAt,
      deliveredAt: entity.deliveredAt,
      returnedAt: entity.returnedAt,
      cancelledAt: entity.cancelledAt,
      failureReason: entity.failureReason,
      notes: entity.notes?.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: ShipmentEntity): ShipmentPublicResponseDTO {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      status: entity.status.value as ShipmentStatusValue,
      type: entity.type.value as ShipmentTypeValue,
      priority: entity.priority.value as ShipmentPriorityValue,
      estimatedDeliveryAt: entity.estimatedDeliveryAt,
      deliveredAt: entity.deliveredAt,
    };
  }

  static toSummary(entity: ShipmentEntity): ShipmentSummaryResponseDTO {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      status: entity.status.value as ShipmentStatusValue,
      itemCount: entity.itemCount,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly ShipmentEntity[],
    total: number,
    page: number,
    limit: number,
  ): ShipmentListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
