/**
 * ShipmentControllerMapper — HTTP DTO → Application DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateShipmentRequestDTO, UpdateShipmentRequestDTO, CancelShipmentRequestDTO,
  PickupShipmentRequestDTO, DeliverShipmentRequestDTO, FailShipmentRequestDTO,
  MarkReturnedRequestDTO, AssignCourierRequestDTO, AssignWarehouseRequestDTO,
  PutOnHoldRequestDTO, ReleaseShipmentRequestDTO, MarkDelayedRequestDTO,
  ChangePriorityRequestDTO, GenerateLabelRequestDTO,
} from '../../application/dtos/requests/shipment/shipment.dto.js';
import type { ShipmentListOptionsDTO } from '../../application/services/interfaces/shipment.service.interface.js';
import type {
  CreateShipmentHttpDTO, UpdateShipmentHttpDTO, CancelShipmentHttpDTO,
  PickupShipmentHttpDTO, DeliverShipmentHttpDTO, FailShipmentHttpDTO,
  MarkReturnedHttpDTO, AssignCourierHttpDTO, AssignWarehouseHttpDTO,
  PutOnHoldHttpDTO, MarkDelayedHttpDTO, ChangePriorityHttpDTO,
  GenerateLabelHttpDTO, ListShipmentsHttpQueryDTO,
} from '../dtos/requests/shipment.request.dto.js';
import type {
  ShipmentTypeValue, ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export class ShipmentControllerMapper {
  static toCreateDto(dto: CreateShipmentHttpDTO): CreateShipmentRequestDTO {
    return {
      orderId: dto.orderId,
      userId: dto.userId,
      vendorId: dto.vendorId,
      warehouseId: dto.warehouseId,
      type: dto.type as ShipmentTypeValue,
      priority: dto.priority as ShipmentPriorityValue | undefined,
      shippingAddress: dto.shippingAddress as unknown as Address,
      pickupAddress: dto.pickupAddress as unknown as Address | undefined,
      courierId: dto.courierId,
      packages: dto.packages,
      isCOD: dto.isCOD,
      codAmount: dto.codAmount,
      isInsured: dto.isInsured,
      declaredValue: dto.declaredValue,
      currency: dto.currency,
      shippingCost: dto.shippingCost,
      weightKg: dto.weightKg,
      volumeM3: dto.volumeM3,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toUpdateDto(shipmentId: string, dto: UpdateShipmentHttpDTO): UpdateShipmentRequestDTO {
    return { shipmentId, notes: dto.notes };
  }

  static toCancelDto(shipmentId: string, dto: CancelShipmentHttpDTO): CancelShipmentRequestDTO {
    return { shipmentId, reason: dto.reason };
  }

  static toPickupDto(shipmentId: string, dto: PickupShipmentHttpDTO): PickupShipmentRequestDTO {
    return { shipmentId, courierTrackingNumber: dto.courierTrackingNumber };
  }

  static toDeliverDto(shipmentId: string, dto: DeliverShipmentHttpDTO): DeliverShipmentRequestDTO {
    return { shipmentId, receivedBy: dto.receivedBy };
  }

  static toFailDto(shipmentId: string, dto: FailShipmentHttpDTO): FailShipmentRequestDTO {
    return { shipmentId, reason: dto.reason };
  }

  static toMarkReturnedDto(shipmentId: string, dto: MarkReturnedHttpDTO): MarkReturnedRequestDTO {
    return { shipmentId, reason: dto.reason };
  }

  static toAssignCourierDto(shipmentId: string, dto: AssignCourierHttpDTO): AssignCourierRequestDTO {
    return { shipmentId, courierId: dto.courierId };
  }

  static toAssignWarehouseDto(shipmentId: string, dto: AssignWarehouseHttpDTO): AssignWarehouseRequestDTO {
    return { shipmentId, warehouseId: dto.warehouseId };
  }

  static toPutOnHoldDto(shipmentId: string, dto: PutOnHoldHttpDTO): PutOnHoldRequestDTO {
    return { shipmentId, reason: dto.reason };
  }

  static toReleaseDto(shipmentId: string): ReleaseShipmentRequestDTO {
    return { shipmentId };
  }

  static toMarkDelayedDto(shipmentId: string, dto: MarkDelayedHttpDTO): MarkDelayedRequestDTO {
    return { shipmentId, reason: dto.reason, newEstimatedDeliveryAt: dto.newEstimatedDeliveryAt };
  }

  static toChangePriorityDto(shipmentId: string, dto: ChangePriorityHttpDTO): ChangePriorityRequestDTO {
    return { shipmentId, priority: dto.priority as ShipmentPriorityValue };
  }

  static toGenerateLabelDto(shipmentId: string, dto: GenerateLabelHttpDTO): GenerateLabelRequestDTO {
    return { shipmentId, labelUrl: dto.labelUrl };
  }

  static toListOptions(q: ListShipmentsHttpQueryDTO): ShipmentListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as ShipmentListOptionsDTO['sortBy'],
      sortDir: q.sortDir,
      filter: {
        orderId: q.orderId,
        userId: q.userId,
        vendorId: q.vendorId,
        courierId: q.courierId,
        warehouseId: q.warehouseId,
        status: q.status,
        type: q.type,
        priority: q.priority,
        isCOD: q.isCOD,
        isInsured: q.isInsured,
        fromDate: q.fromDate,
        toDate: q.toDate,
        search: q.search,
      },
    };
  }
}
