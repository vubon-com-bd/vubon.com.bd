import type {
  CreateDispatchRequestDTO, AddDispatchShipmentRequestDTO, RemoveDispatchShipmentRequestDTO,
  AssignDispatchRequestDTO, GenerateDispatchManifestRequestDTO, UpdateDispatchEtaRequestDTO,
  StartDispatchRequestDTO, MarkDispatchInTransitRequestDTO, CompleteDispatchRequestDTO,
  FailDispatchRequestDTO, ReturnDispatchRequestDTO, CancelDispatchRequestDTO,
} from '../../application/dtos/requests/dispatch/dispatch.dto.js';
import type { DispatchListOptionsDTO } from '../../application/services/interfaces/dispatch.service.interface.js';
import type {
  CreateDispatchHttpDTO, AddDispatchShipmentHttpDTO, AssignDispatchHttpDTO,
  ManifestHttpDTO, UpdateEtaHttpDTO, DispatchReasonHttpDTO, ListDispatchesHttpQueryDTO,
} from '../dtos/requests/dispatch.request.dto.js';
import type { DispatchTypeValue, DispatchStatusValue } from '@vubon/shared-types/logistics';

export class DispatchControllerMapper {
  static toCreateDto(dto: CreateDispatchHttpDTO): CreateDispatchRequestDTO {
    return {
      type: dto.type as DispatchTypeValue, shipmentIds: dto.shipmentIds,
      courierId: dto.courierId, vehicleId: dto.vehicleId, driverId: dto.driverId,
      warehouseId: dto.warehouseId, estimatedArrivalAt: dto.estimatedArrivalAt, notes: dto.notes,
    };
  }
  static toAddShipmentDto(id: string, dto: AddDispatchShipmentHttpDTO): AddDispatchShipmentRequestDTO {
    return { dispatchId: id, shipmentId: dto.shipmentId, items: dto.items, weightKg: dto.weightKg };
  }
  static toRemoveShipmentDto(id: string, shipmentId: string, items?: number): RemoveDispatchShipmentRequestDTO {
    return { dispatchId: id, shipmentId, items };
  }
  static toAssignDto(id: string, dto: AssignDispatchHttpDTO): AssignDispatchRequestDTO {
    return { dispatchId: id, ...dto };
  }
  static toManifestDto(id: string, dto: ManifestHttpDTO): GenerateDispatchManifestRequestDTO {
    return { dispatchId: id, manifestUrl: dto.manifestUrl };
  }
  static toUpdateEtaDto(id: string, dto: UpdateEtaHttpDTO): UpdateDispatchEtaRequestDTO {
    return { dispatchId: id, newEta: dto.newEta };
  }
  static toStartDto(id: string): StartDispatchRequestDTO { return { dispatchId: id }; }
  static toInTransitDto(id: string): MarkDispatchInTransitRequestDTO { return { dispatchId: id }; }
  static toCompleteDto(id: string): CompleteDispatchRequestDTO { return { dispatchId: id }; }
  static toFailDto(id: string, dto: DispatchReasonHttpDTO): FailDispatchRequestDTO {
    return { dispatchId: id, reason: dto.reason };
  }
  static toReturnDto(id: string, dto: DispatchReasonHttpDTO): ReturnDispatchRequestDTO {
    return { dispatchId: id, reason: dto.reason };
  }
  static toCancelDto(id: string, dto: DispatchReasonHttpDTO): CancelDispatchRequestDTO {
    return { dispatchId: id, reason: dto.reason };
  }
  static toListOptions(q: ListDispatchesHttpQueryDTO): DispatchListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        courierId: q.courierId, warehouseId: q.warehouseId, driverId: q.driverId,
        status: q.status ? (q.status as DispatchStatusValue) : undefined,
        type: q.type ? (q.type as DispatchTypeValue) : undefined,
      },
    };
  }
}
