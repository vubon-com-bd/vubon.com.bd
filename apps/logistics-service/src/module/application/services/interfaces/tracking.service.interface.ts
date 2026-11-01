import type {
  TrackingResponseDTO,
  TrackingPublicResponseDTO,
  TrackingListResponseDTO,
  TrackingStatsResponseDTO,
} from '@application/dtos/responses/tracking/index.js';
import type {
  CreateTrackingRequestDTO,
  AddTrackingEventRequestDTO,
  ActivateTrackingRequestDTO,
  CompleteTrackingRequestDTO,
  FailTrackingRequestDTO,
  ExpireTrackingRequestDTO,
} from '@application/dtos/requests/tracking/index.js';
import type { TrackingStatusValue } from '@domain/primitives/tracking-status.vo';

export const TRACKING_SERVICE = Symbol('TRACKING_SERVICE');

export interface TrackingListFilterDTO {
  readonly status?: TrackingStatusValue;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly source?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
export interface TrackingListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastUpdatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TrackingListFilterDTO;
}

export interface ITrackingService {
  create(dto: CreateTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO>;
  addEvent(dto: AddTrackingEventRequestDTO, actorId: string): Promise<TrackingResponseDTO>;
  activate(dto: ActivateTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO>;
  complete(dto: CompleteTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO>;
  fail(dto: FailTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO>;
  expire(dto: ExpireTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO>;

  getById(id: string): Promise<TrackingResponseDTO>;
  getByNumber(num: string): Promise<TrackingPublicResponseDTO>;
  getByShipmentId(shipmentId: string): Promise<TrackingResponseDTO>;
  list(options: TrackingListOptionsDTO): Promise<TrackingListResponseDTO>;
  listByOrder(orderId: string): Promise<TrackingListResponseDTO>;
  getStats(): Promise<TrackingStatsResponseDTO>;
}
