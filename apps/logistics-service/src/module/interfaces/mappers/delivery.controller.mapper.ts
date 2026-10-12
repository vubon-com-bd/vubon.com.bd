import type {
  ScheduleDeliveryRequestDTO, AssignDeliveryDriverRequestDTO, AddDeliveryAttemptRequestDTO,
  CompleteDeliveryRequestDTO, FailDeliveryRequestDTO, RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO,
} from '../../application/dtos/requests/delivery/delivery.dto.js';
import type { DeliveryListOptionsDTO } from '../../application/services/interfaces/delivery.service.interface.js';
import type {
  ScheduleDeliveryHttpDTO, AssignDeliveryDriverHttpDTO, AddDeliveryAttemptHttpDTO,
  CompleteDeliveryHttpDTO, FailDeliveryHttpDTO, RescheduleDeliveryHttpDTO,
  CancelDeliveryHttpDTO, ListDeliveriesHttpQueryDTO,
} from '../dtos/requests/delivery.request.dto.js';
import type { DeliveryTypeValue, DeliveryStatusValue } from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export class DeliveryControllerMapper {
  static toScheduleDto(dto: ScheduleDeliveryHttpDTO): ScheduleDeliveryRequestDTO {
    return {
      shipmentId: dto.shipmentId, orderId: dto.orderId, userId: dto.userId,
      type: dto.type as DeliveryTypeValue,
      deliveryAddress: dto.deliveryAddress as unknown as Address,
      recipientName: dto.recipientName, recipientPhone: dto.recipientPhone, scheduledAt: dto.scheduledAt,
    };
  }
  static toAssignDto(id: string, dto: AssignDeliveryDriverHttpDTO): AssignDeliveryDriverRequestDTO {
    return { deliveryId: id, driverId: dto.driverId, vehicleId: dto.vehicleId, routeId: dto.routeId };
  }
  static toAttemptDto(id: string, dto: AddDeliveryAttemptHttpDTO): AddDeliveryAttemptRequestDTO {
    return { deliveryId: id, ...dto };
  }
  static toCompleteDto(id: string, dto: CompleteDeliveryHttpDTO): CompleteDeliveryRequestDTO {
    return { deliveryId: id, ...dto };
  }
  static toFailDto(id: string, dto: FailDeliveryHttpDTO): FailDeliveryRequestDTO {
    return { deliveryId: id, reason: dto.reason };
  }
  static toRescheduleDto(id: string, dto: RescheduleDeliveryHttpDTO): RescheduleDeliveryRequestDTO {
    return { deliveryId: id, reason: dto.reason };
  }
  static toCancelDto(id: string, dto: CancelDeliveryHttpDTO): CancelDeliveryRequestDTO {
    return { deliveryId: id, reason: dto.reason };
  }
  static toListOptions(q: ListDeliveriesHttpQueryDTO): DeliveryListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        shipmentId: q.shipmentId, orderId: q.orderId, driverId: q.driverId,
        status: q.status ? (q.status as DeliveryStatusValue) : undefined,
      },
    };
  }
}
