import type {
  RequestReturnRequestDTO, ApproveReturnRequestDTO, RejectReturnRequestDTO,
  ScheduleReturnPickupRequestDTO, PickupReturnRequestDTO, MarkReturnInTransitRequestDTO,
  ReceiveReturnRequestDTO, InspectReturnRequestDTO, CompleteReturnRequestDTO,
  IssueRefundRequestDTO, CancelReturnRequestDTO, MarkReturnLostRequestDTO,
} from '../../application/dtos/requests/return-shipment/return-shipment.dto.js';
import type { ReturnShipmentListOptionsDTO } from '../../application/services/interfaces/return-shipment.service.interface.js';
import type {
  RequestReturnHttpDTO, RejectReturnHttpDTO, ScheduleReturnPickupHttpDTO,
  PickupReturnHttpDTO, InspectReturnHttpDTO, IssueRefundHttpDTO,
  CancelReturnHttpDTO, ReturnReasonHttpDTO, ListReturnsHttpQueryDTO,
} from '../dtos/requests/return-shipment.request.dto.js';
import type {
  ReturnShipmentTypeValue, ReturnShipmentStatusValue, ReturnReasonValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export class ReturnShipmentControllerMapper {
  static toRequestDto(dto: RequestReturnHttpDTO): RequestReturnRequestDTO {
    return {
      orderId: dto.orderId, originalShipmentId: dto.originalShipmentId, userId: dto.userId,
      type: dto.type as ReturnShipmentTypeValue, reason: dto.reason as ReturnReasonValue,
      itemIds: dto.itemIds, description: dto.description, images: dto.images,
      pickupAddress: dto.pickupAddress as unknown as Address,
    };
  }
  static toApproveDto(id: string): ApproveReturnRequestDTO { return { returnId: id }; }
  static toRejectDto(id: string, dto: RejectReturnHttpDTO): RejectReturnRequestDTO {
    return { returnId: id, reason: dto.reason };
  }
  static toSchedulePickupDto(id: string, dto: ScheduleReturnPickupHttpDTO): ScheduleReturnPickupRequestDTO {
    return { returnId: id, pickupAt: dto.pickupAt };
  }
  static toPickupDto(id: string, dto: PickupReturnHttpDTO): PickupReturnRequestDTO {
    return { returnId: id, trackingNumber: dto.trackingNumber };
  }
  static toInTransitDto(id: string): MarkReturnInTransitRequestDTO { return { returnId: id }; }
  static toReceiveDto(id: string): ReceiveReturnRequestDTO { return { returnId: id }; }
  static toInspectDto(id: string, dto: InspectReturnHttpDTO): InspectReturnRequestDTO {
    return { returnId: id, inspectedBy: dto.inspectedBy, restockable: dto.restockable };
  }
  static toCompleteDto(id: string): CompleteReturnRequestDTO { return { returnId: id }; }
  static toIssueRefundDto(id: string, dto: IssueRefundHttpDTO): IssueRefundRequestDTO {
    return { returnId: id, amount: dto.amount, currency: dto.currency, restockFeePercent: dto.restockFeePercent };
  }
  static toCancelDto(id: string, dto: CancelReturnHttpDTO): CancelReturnRequestDTO {
    return { returnId: id, reason: dto.reason };
  }
  static toMarkLostDto(id: string, dto: ReturnReasonHttpDTO): MarkReturnLostRequestDTO {
    return { returnId: id, reason: dto.reason };
  }
  static toListOptions(q: ListReturnsHttpQueryDTO): ReturnShipmentListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        orderId: q.orderId, userId: q.userId, originalShipmentId: q.originalShipmentId,
        status: q.status ? (q.status as ReturnShipmentStatusValue) : undefined,
        type: q.type ? (q.type as ReturnShipmentTypeValue) : undefined,
        reason: q.reason ? (q.reason as ReturnReasonValue) : undefined,
      },
    };
  }
}
