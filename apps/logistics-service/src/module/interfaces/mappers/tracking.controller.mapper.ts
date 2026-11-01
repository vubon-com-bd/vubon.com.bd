/**
 * TrackingControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateTrackingHttpDTO,
  AddTrackingEventHttpDTO,
  TrackingReasonHttpDTO,
  ListTrackingsHttpQueryDTO,
} from '../dtos/requests/tracking/tracking.request.dto.js';
import type { CreateTrackingRequestDTO } from '@application/dtos/requests/tracking/create-tracking.dto.js';
import type { AddTrackingEventRequestDTO } from '@application/dtos/requests/tracking/add-tracking-event.dto.js';
import type {
  TrackingResponseDTO,
  TrackingPublicResponseDTO,
  TrackingSummaryResponseDTO,
  TrackingListResponseDTO,
  TrackingStatsResponseDTO,
} from '@application/dtos/responses/tracking/index.js';
import type {
  TrackingHttpResponseDTO,
  TrackingPublicHttpResponseDTO,
  TrackingSummaryHttpResponseDTO,
  TrackingListHttpResponseDTO,
  TrackingStatsHttpResponseDTO,
} from '../dtos/responses/tracking/tracking.response.dto.js';

export class TrackingControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(http: CreateTrackingHttpDTO): CreateTrackingRequestDTO {
    return {
      trackingNumber: http.trackingNumber,
      shipmentId: http.shipmentId,
      orderId: http.orderId,
      courierCode: http.courierCode,
      source: http.source as CreateTrackingRequestDTO['source'],
      estimatedDeliveryAt: http.estimatedDeliveryAt,
      expiresAt: http.expiresAt,
    };
  }

  static toAddEventAppDto(trackingId: string, http: AddTrackingEventHttpDTO): AddTrackingEventRequestDTO {
    return {
      trackingId,
      eventId: http.eventId,
      eventType: http.eventType,
      eventStatus: http.eventStatus,
      currentLocation: http.currentLocation,
    };
  }

  static toReasonAppDto(trackingId: string, http: TrackingReasonHttpDTO): Record<string, unknown> {
    return { trackingId, reason: http.reason };
  }

  static toListOptions(http: ListTrackingsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        shipmentId: http.shipmentId,
        orderId: http.orderId,
        courierCode: http.courierCode,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: TrackingResponseDTO): TrackingHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      source: typeof app.source === 'string' ? app.source : String(app.source),
    } as unknown as TrackingHttpResponseDTO;
  }

  static toPublicHttpResponse(app: TrackingPublicResponseDTO): TrackingPublicHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as TrackingPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: TrackingSummaryResponseDTO): TrackingSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as TrackingSummaryHttpResponseDTO;
  }

  static toListHttp(app: TrackingListResponseDTO): TrackingListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: TrackingStatsResponseDTO): TrackingStatsHttpResponseDTO {
    return app as unknown as TrackingStatsHttpResponseDTO;
  }
}
