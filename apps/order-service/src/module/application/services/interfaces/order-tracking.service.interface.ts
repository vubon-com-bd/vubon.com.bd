/**
 * IOrderTrackingService
 */
import type { AddTrackingRequestDTO } from '../../dtos/requests/tracking/add-tracking.dto.js';
import type { UpdateTrackingRequestDTO } from '../../dtos/requests/tracking/update-tracking.dto.js';
import type {
  TrackingResponseDTO,
  TrackingSummaryResponseDTO,
} from '../../dtos/responses/tracking-response.dto.js';

export const ORDER_TRACKING_SERVICE = Symbol('ORDER_TRACKING_SERVICE');

export interface IOrderTrackingService {
  add(dto: AddTrackingRequestDTO, actorId?: string): Promise<TrackingResponseDTO>;
  update(dto: UpdateTrackingRequestDTO, actorId?: string): Promise<TrackingResponseDTO>;
  getById(trackingId: string): Promise<TrackingResponseDTO>;
  listByOrder(orderId: string): Promise<readonly TrackingResponseDTO[]>;
  getSummary(orderId: string): Promise<TrackingSummaryResponseDTO>;
}
