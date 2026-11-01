/**
 * DeliveryControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateDeliveryHttpDTO,
  ScheduleDeliveryHttpDTO,
  AssignDeliveryHttpDTO,
  ArriveDeliveryHttpDTO,
  CompleteDeliveryHttpDTO,
  FailDeliveryHttpDTO,
  RefuseDeliveryHttpDTO,
  RescheduleDeliveryHttpDTO,
  CancelDeliveryHttpDTO,
  ListDeliveriesHttpQueryDTO,
} from '../dtos/requests/delivery/delivery.request.dto.js';
import type { CreateDeliveryRequestDTO } from '@application/dtos/requests/delivery/create-delivery.dto.js';
import type {
  DeliveryResponseDTO,
  DeliveryPublicResponseDTO,
  DeliverySummaryResponseDTO,
  DeliveryListResponseDTO,
  DeliveryStatsResponseDTO,
} from '@application/dtos/responses/delivery/index.js';
import type {
  DeliveryHttpResponseDTO,
  DeliveryPublicHttpResponseDTO,
  DeliverySummaryHttpResponseDTO,
  DeliveryListHttpResponseDTO,
  DeliveryStatsHttpResponseDTO,
} from '../dtos/responses/delivery/delivery.response.dto.js';

export class DeliveryControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(http: CreateDeliveryHttpDTO): CreateDeliveryRequestDTO {
    return {
      shipmentId: http.shipmentId,
      orderId: http.orderId,
      userId: http.userId,
      type: http.type as CreateDeliveryRequestDTO['type'],
      deliveryAddress: http.deliveryAddress,
      recipientName: http.recipientName,
      recipientPhone: http.recipientPhone,
      window: http.window ? { startAt: http.window.startAt, endAt: http.window.endAt } : undefined,
      scheduledAt: http.scheduledAt,
      driverId: http.driverId,
      vehicleId: http.vehicleId,
      routeId: http.routeId,
      notes: http.notes,
    };
  }

  static toScheduleAppDto(deliveryId: string, http: ScheduleDeliveryHttpDTO): Record<string, unknown> {
    return {
      deliveryId,
      scheduledAt: http.scheduledAt,
      window: http.window ? { startAt: http.window.startAt, endAt: http.window.endAt } : undefined,
    };
  }

  static toAssignAppDto(deliveryId: string, http: AssignDeliveryHttpDTO): Record<string, unknown> {
    return {
      deliveryId,
      driverId: http.driverId,
      vehicleId: http.vehicleId,
      routeId: http.routeId,
    };
  }

  static toArriveAppDto(deliveryId: string, http: ArriveDeliveryHttpDTO): Record<string, unknown> {
    return { deliveryId, location: http.location, notes: http.notes };
  }

  static toCompleteAppDto(deliveryId: string, http: CompleteDeliveryHttpDTO): Record<string, unknown> {
    return {
      deliveryId,
      recipientName: http.recipientName,
      signedBy: http.signedBy,
      proofSignatureUrl: http.proofSignatureUrl,
      proofPhotoUrl: http.proofPhotoUrl,
      proofOtp: http.proofOtp,
    };
  }

  static toFailAppDto(deliveryId: string, http: FailDeliveryHttpDTO): Record<string, unknown> {
    return {
      deliveryId,
      reason: http.reason,
      attemptedCount: http.attemptedCount,
    };
  }

  static toRefuseAppDto(deliveryId: string, http: RefuseDeliveryHttpDTO): Record<string, unknown> {
    return { deliveryId, reason: http.reason };
  }

  static toRescheduleAppDto(deliveryId: string, http: RescheduleDeliveryHttpDTO): Record<string, unknown> {
    return {
      deliveryId,
      scheduledAt: http.scheduledAt,
      reason: http.reason,
    };
  }

  static toCancelAppDto(deliveryId: string, http: CancelDeliveryHttpDTO): Record<string, unknown> {
    return { deliveryId, reason: http.reason };
  }

  static toListOptions(http: ListDeliveriesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        shipmentId: http.shipmentId,
        orderId: http.orderId,
        driverId: http.driverId,
        search: http.search,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: DeliveryResponseDTO): DeliveryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as DeliveryHttpResponseDTO;
  }

  static toPublicHttpResponse(app: DeliveryPublicResponseDTO): DeliveryPublicHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as DeliveryPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: DeliverySummaryResponseDTO): DeliverySummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as DeliverySummaryHttpResponseDTO;
  }

  static toListHttp(app: DeliveryListResponseDTO): DeliveryListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: DeliveryStatsResponseDTO): DeliveryStatsHttpResponseDTO {
    return app as unknown as DeliveryStatsHttpResponseDTO;
  }
}
