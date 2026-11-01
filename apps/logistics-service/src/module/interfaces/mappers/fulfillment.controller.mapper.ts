/**
 * FulfillmentControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateFulfillmentHttpDTO,
  FulfillmentReasonHttpDTO,
  ListFulfillmentsHttpQueryDTO,
} from '../dtos/requests/fulfillment/fulfillment.request.dto.js';
import type { CreateFulfillmentRequestDTO } from '@application/dtos/requests/fulfillment/create-fulfillment.dto.js';
import type {
  FulfillmentResponseDTO,
  FulfillmentSummaryResponseDTO,
  FulfillmentListResponseDTO,
  FulfillmentStatsResponseDTO,
} from '@application/dtos/responses/fulfillment/index.js';
import type {
  FulfillmentHttpResponseDTO,
  FulfillmentSummaryHttpResponseDTO,
  FulfillmentListHttpResponseDTO,
  FulfillmentStatsHttpResponseDTO,
} from '../dtos/responses/fulfillment/fulfillment.response.dto.js';

export class FulfillmentControllerMapper {
  static toCreateAppDto(http: CreateFulfillmentHttpDTO): CreateFulfillmentRequestDTO {
    return {
      orderId: http.orderId,
      vendorId: http.vendorId,
      warehouseId: http.warehouseId,
      type: http.type as CreateFulfillmentRequestDTO['type'],
      priority: http.priority as CreateFulfillmentRequestDTO['priority'],
      itemIds: http.itemIds,
      assignedTo: http.assignedTo,
      slaDueAt: http.slaDueAt,
      notes: http.notes,
    };
  }

  static toReasonAppDto(fulfillmentId: string, http: FulfillmentReasonHttpDTO): Record<string, unknown> {
    return { fulfillmentId, reason: http.reason };
  }

  static toListOptions(http: ListFulfillmentsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        priority: http.priority,
        orderId: http.orderId,
        vendorId: http.vendorId,
        warehouseId: http.warehouseId,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: FulfillmentResponseDTO): FulfillmentHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      priority: typeof app.priority === 'string' ? app.priority : String(app.priority),
    } as unknown as FulfillmentHttpResponseDTO;
  }

  static toSummaryHttp(app: FulfillmentSummaryResponseDTO): FulfillmentSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      priority: typeof app.priority === 'string' ? app.priority : String(app.priority),
    } as unknown as FulfillmentSummaryHttpResponseDTO;
  }

  static toListHttp(app: FulfillmentListResponseDTO): FulfillmentListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: FulfillmentStatsResponseDTO): FulfillmentStatsHttpResponseDTO {
    return app as unknown as FulfillmentStatsHttpResponseDTO;
  }
}
