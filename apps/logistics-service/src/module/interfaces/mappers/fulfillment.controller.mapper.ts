import type {
  CreateFulfillmentRequestDTO, AssignFulfillmentRequestDTO, UpdateFulfillmentRequestDTO,
  StartProcessingRequestDTO, StartPickingRequestDTO, StartPackingRequestDTO,
  ReadyToShipRequestDTO, ShipFulfillmentRequestDTO, FulfillFulfillmentRequestDTO,
  PartialFulfillFulfillmentRequestDTO, HoldFulfillmentRequestDTO, ReleaseFulfillmentRequestDTO,
  FailFulfillmentRequestDTO, CancelFulfillmentRequestDTO,
} from '../../application/dtos/requests/fulfillment/fulfillment.dto.js';
import type { FulfillmentListOptionsDTO } from '../../application/services/interfaces/fulfillment.service.interface.js';
import type {
  CreateFulfillmentHttpDTO, AssignFulfillmentHttpDTO, UpdateFulfillmentHttpDTO,
  FulfillmentReasonHttpDTO, ListFulfillmentsHttpQueryDTO,
} from '../dtos/requests/fulfillment.request.dto.js';
import type {
  FulfillmentTypeValue, FulfillmentPriorityValue, FulfillmentStatusValue,
} from '@vubon/shared-types/logistics';

export class FulfillmentControllerMapper {
  static toCreateDto(dto: CreateFulfillmentHttpDTO): CreateFulfillmentRequestDTO {
    return {
      orderId: dto.orderId, vendorId: dto.vendorId, warehouseId: dto.warehouseId,
      type: dto.type as FulfillmentTypeValue,
      priority: dto.priority ? (dto.priority as FulfillmentPriorityValue) : undefined,
      itemIds: dto.itemIds, slaHours: dto.slaHours, notes: dto.notes,
    };
  }
  static toAssignDto(id: string, dto: AssignFulfillmentHttpDTO): AssignFulfillmentRequestDTO {
    return { fulfillmentId: id, assignedTo: dto.assignedTo };
  }
  static toUpdateDto(id: string, dto: UpdateFulfillmentHttpDTO): UpdateFulfillmentRequestDTO {
    return { fulfillmentId: id, notes: dto.notes };
  }
  static toStartProcessingDto(id: string): StartProcessingRequestDTO { return { fulfillmentId: id }; }
  static toStartPickingDto(id: string): StartPickingRequestDTO { return { fulfillmentId: id }; }
  static toStartPackingDto(id: string): StartPackingRequestDTO { return { fulfillmentId: id }; }
  static toReadyToShipDto(id: string): ReadyToShipRequestDTO { return { fulfillmentId: id }; }
  static toShipDto(id: string): ShipFulfillmentRequestDTO { return { fulfillmentId: id }; }
  static toFulfillDto(id: string): FulfillFulfillmentRequestDTO { return { fulfillmentId: id }; }
  static toPartialDto(id: string): PartialFulfillFulfillmentRequestDTO { return { fulfillmentId: id }; }
  static toHoldDto(id: string, dto: FulfillmentReasonHttpDTO): HoldFulfillmentRequestDTO {
    return { fulfillmentId: id, reason: dto.reason };
  }
  static toReleaseDto(id: string): ReleaseFulfillmentRequestDTO { return { fulfillmentId: id }; }
  static toFailDto(id: string, dto: FulfillmentReasonHttpDTO): FailFulfillmentRequestDTO {
    return { fulfillmentId: id, reason: dto.reason };
  }
  static toCancelDto(id: string, dto: FulfillmentReasonHttpDTO): CancelFulfillmentRequestDTO {
    return { fulfillmentId: id, reason: dto.reason };
  }
  static toListOptions(q: ListFulfillmentsHttpQueryDTO): FulfillmentListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        orderId: q.orderId, vendorId: q.vendorId, warehouseId: q.warehouseId,
        status: q.status ? (q.status as FulfillmentStatusValue) : undefined,
        type: q.type ? (q.type as FulfillmentTypeValue) : undefined,
        priority: q.priority ? (q.priority as FulfillmentPriorityValue) : undefined,
      },
    };
  }
}
