/**
 * ITrackingService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  StartTrackingRequestDTO, RecordTrackingEventRequestDTO, UpdateTrackingEtaRequestDTO,
  TrackingListFilterDTO,
} from '../../dtos/requests/tracking/tracking.dto.js';
import type {
  TrackingResponseDTO, TrackingPublicResponseDTO, TrackingListResponseDTO,
} from '../../dtos/responses/tracking/tracking-response.dto.js';

export const TRACKING_SERVICE = Symbol('TRACKING_SERVICE');

export interface TrackingListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastUpdatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TrackingListFilterDTO;
}

export interface ITrackingService {
  start(dto: StartTrackingRequestDTO, actorId?: string): Promise<TrackingResponseDTO>;
  recordEvent(dto: RecordTrackingEventRequestDTO, actorId?: string): Promise<TrackingResponseDTO>;
  updateEta(dto: UpdateTrackingEtaRequestDTO, actorId?: string): Promise<TrackingResponseDTO>;

  getById(trackingId: string): Promise<TrackingResponseDTO>;
  getByTrackingNumber(trackingNumber: string): Promise<TrackingResponseDTO>;
  getPublicByTrackingNumber(trackingNumber: string): Promise<TrackingPublicResponseDTO>;
  list(options: TrackingListOptionsDTO): Promise<TrackingListResponseDTO>;
}
