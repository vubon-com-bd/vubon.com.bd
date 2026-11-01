/**
 * DispatchControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateDispatchHttpDTO,
  AssignDispatchHttpDTO,
  DispatchReasonHttpDTO,
  ListDispatchesHttpQueryDTO,
} from '../dtos/requests/dispatch/dispatch.request.dto.js';
import type { CreateDispatchRequestDTO } from '@application/dtos/requests/dispatch/create-dispatch.dto.js';
import type {
  DispatchResponseDTO,
  DispatchSummaryResponseDTO,
  DispatchListResponseDTO,
  DispatchStatsResponseDTO,
} from '@application/dtos/responses/dispatch/index.js';
import type {
  DispatchHttpResponseDTO,
  DispatchSummaryHttpResponseDTO,
  DispatchListHttpResponseDTO,
  DispatchStatsHttpResponseDTO,
} from '../dtos/responses/dispatch/dispatch.response.dto.js';

export class DispatchControllerMapper {
  static toCreateAppDto(http: CreateDispatchHttpDTO): CreateDispatchRequestDTO {
    return {
      type: http.type as CreateDispatchRequestDTO['type'],
      shipmentIds: http.shipmentIds,
      courierId: http.courierId,
      vehicleId: http.vehicleId,
      driverId: http.driverId,
      warehouseId: http.warehouseId,
      totalWeight: http.totalWeight,
      estimatedArrivalAt: http.estimatedArrivalAt,
      notes: http.notes,
    };
  }

  static toAssignAppDto(dispatchId: string, http: AssignDispatchHttpDTO): Record<string, unknown> {
    return {
      dispatchId,
      vehicleId: http.vehicleId,
      driverId: http.driverId,
      courierId: http.courierId,
    };
  }

  static toReasonAppDto(dispatchId: string, http: DispatchReasonHttpDTO): Record<string, unknown> {
    return { dispatchId, reason: http.reason };
  }

  static toListOptions(http: ListDispatchesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        courierId: http.courierId,
        driverId: http.driverId,
        warehouseId: http.warehouseId,
      },
    };
  }

  static toHttpResponse(app: DispatchResponseDTO): DispatchHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as DispatchHttpResponseDTO;
  }

  static toSummaryHttp(app: DispatchSummaryResponseDTO): DispatchSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as DispatchSummaryHttpResponseDTO;
  }

  static toListHttp(app: DispatchListResponseDTO): DispatchListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: DispatchStatsResponseDTO): DispatchStatsHttpResponseDTO {
    return app as unknown as DispatchStatsHttpResponseDTO;
  }
}
