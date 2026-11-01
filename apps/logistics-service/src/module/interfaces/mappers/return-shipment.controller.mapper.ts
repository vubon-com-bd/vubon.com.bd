/**
 * ReturnShipmentControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreateReturnShipmentHttpDTO,
  ApproveReturnHttpDTO,
  RejectReturnHttpDTO,
  MarkReceivedHttpDTO,
  InspectReturnHttpDTO,
  CompleteReturnHttpDTO,
  ReturnShipmentReasonHttpDTO,
  ListReturnShipmentsHttpQueryDTO,
} from '../dtos/requests/return-shipment/return-shipment.request.dto.js';
import type { CreateReturnShipmentRequestDTO } from '@application/dtos/requests/return-shipment/create-return-shipment.dto.js';
import type {
  ReturnShipmentResponseDTO,
  ReturnShipmentSummaryResponseDTO,
  ReturnShipmentListResponseDTO,
  ReturnShipmentStatsResponseDTO,
} from '@application/dtos/responses/return-shipment/index.js';
import type {
  ReturnShipmentHttpResponseDTO,
  ReturnShipmentSummaryHttpResponseDTO,
  ReturnShipmentListHttpResponseDTO,
  ReturnShipmentStatsHttpResponseDTO,
} from '../dtos/responses/return-shipment/return-shipment.response.dto.js';

export class ReturnShipmentControllerMapper {
  static toCreateAppDto(http: CreateReturnShipmentHttpDTO): CreateReturnShipmentRequestDTO {
    return {
      orderId: http.orderId,
      originalShipmentId: http.originalShipmentId,
      userId: http.userId,
      type: http.type as CreateReturnShipmentRequestDTO['type'],
      reason: http.reason as CreateReturnShipmentRequestDTO['reason'],
      description: http.description,
      images: http.images,
      itemIds: http.itemIds,
      pickupAddress: http.pickupAddress,
      refundCurrency: http.refundCurrency,
    };
  }

  static toApproveAppDto(returnId: string, http: ApproveReturnHttpDTO): Record<string, unknown> {
    return { returnId, approvedBy: http.approvedBy };
  }

  static toRejectAppDto(returnId: string, http: RejectReturnHttpDTO): Record<string, unknown> {
    return { returnId, reason: http.reason };
  }

  static toReceivedAppDto(returnId: string, http: MarkReceivedHttpDTO): Record<string, unknown> {
    return { returnId, receivedBy: http.receivedBy };
  }

  static toInspectAppDto(returnId: string, http: InspectReturnHttpDTO): Record<string, unknown> {
    return { returnId, restockable: http.restockable, inspectedBy: http.inspectedBy };
  }

  static toCompleteAppDto(returnId: string, http: CompleteReturnHttpDTO): Record<string, unknown> {
    return { returnId, refundAmount: http.refundAmount, restockFeeAmount: http.restockFeeAmount };
  }

  static toReasonAppDto(returnId: string, http: ReturnShipmentReasonHttpDTO): Record<string, unknown> {
    return { returnId, reason: http.reason };
  }

  static toListOptions(http: ListReturnShipmentsHttpQueryDTO): Record<string, unknown> {
    return {
      page: Number(http.page ?? 1),
      limit: Number(http.limit ?? 20),
      filter: {
        status: http.status,
        type: http.type,
        userId: http.userId,
        orderId: http.orderId,
      },
    };
  }

  static toHttpResponse(app: ReturnShipmentResponseDTO): ReturnShipmentHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      reason: typeof app.reason === 'string' ? app.reason : String(app.reason),
    } as unknown as ReturnShipmentHttpResponseDTO;
  }

  static toSummaryHttp(app: ReturnShipmentSummaryResponseDTO): ReturnShipmentSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as ReturnShipmentSummaryHttpResponseDTO;
  }

  static toListHttp(app: ReturnShipmentListResponseDTO): ReturnShipmentListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: ReturnShipmentStatsResponseDTO): ReturnShipmentStatsHttpResponseDTO {
    return app as unknown as ReturnShipmentStatsHttpResponseDTO;
  }
}
