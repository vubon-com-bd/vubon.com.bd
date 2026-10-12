import type {
  StartTrackingRequestDTO, RecordTrackingEventRequestDTO, UpdateTrackingEtaRequestDTO,
} from '../../application/dtos/requests/tracking/tracking.dto.js';
import type { TrackingListOptionsDTO } from '../../application/services/interfaces/tracking.service.interface.js';
import type {
  StartTrackingHttpDTO, RecordTrackingEventHttpDTO, UpdateTrackingEtaHttpDTO, ListTrackingHttpQueryDTO,
} from '../dtos/requests/tracking.request.dto.js';
import type { TrackingStatusValue } from '@vubon/shared-types/logistics';

export class TrackingControllerMapper {
  static toStartDto(dto: StartTrackingHttpDTO): StartTrackingRequestDTO {
    return { trackingNumber: dto.trackingNumber, shipmentId: dto.shipmentId, orderId: dto.orderId, courierCode: dto.courierCode };
  }
  static toRecordDto(id: string, dto: RecordTrackingEventHttpDTO): RecordTrackingEventRequestDTO {
    return {
      trackingId: id, event: dto.event,
      status: dto.status ? (dto.status as TrackingStatusValue) : undefined,
      source: dto.source, message: dto.message, location: dto.location,
      latitude: dto.latitude, longitude: dto.longitude, occurredAt: dto.occurredAt, metadata: dto.metadata,
    };
  }
  static toUpdateEtaDto(id: string, dto: UpdateTrackingEtaHttpDTO): UpdateTrackingEtaRequestDTO {
    return { trackingId: id, newEta: dto.newEta };
  }
  static toListOptions(q: ListTrackingHttpQueryDTO): TrackingListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        shipmentId: q.shipmentId, orderId: q.orderId,
        status: q.status ? (q.status as TrackingStatusValue) : undefined,
        courierCode: q.courierCode,
      },
    };
  }
}
