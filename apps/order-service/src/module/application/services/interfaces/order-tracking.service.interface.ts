/**
 * IOrderTrackingService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  AddTrackingCommandDTO,
  UpdateTrackingCommandDTO,
} from '../../dtos/requests/tracking/index.js';
import type {
  TrackingEntryResponseDTO,
  TrackingSummaryResponseDTO,
  TrackingListResponseDTO,
} from '../../dtos/responses/tracking-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_TRACKING_SERVICE = Symbol('ORDER_TRACKING_SERVICE');

// ─── Main Interface ────────────────────────
export interface IOrderTrackingService {
  // Commands
  add(dto: AddTrackingCommandDTO, actorId?: string): Promise<TrackingEntryResponseDTO>;
  update(dto: UpdateTrackingCommandDTO, actorId?: string): Promise<TrackingEntryResponseDTO>;

  // Queries
  getById(id: string): Promise<TrackingEntryResponseDTO>;
  getSummaryByOrder(orderId: string): Promise<TrackingSummaryResponseDTO>;
  listByOrder(orderId: string): Promise<TrackingListResponseDTO>;
  listByTrackingNumber(trackingNumber: string): Promise<TrackingListResponseDTO>;
}
