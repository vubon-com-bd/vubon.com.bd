/**
 * IDeliveryService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  ScheduleDeliveryCommandDTO,
  RescheduleDeliveryCommandDTO,
  ConfirmDeliveryCommandDTO,
} from '../../dtos/requests/delivery/index.js';
import type {
  DeliveryResponseDTO,
  DeliveryListResponseDTO,
} from '../../dtos/responses/delivery-response.dto.js';

// ─── DI Token ──────────────────────────────
export const DELIVERY_SERVICE = Symbol('DELIVERY_SERVICE');

// ─── Filter / Options ──────────────────────
export interface DeliveryListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'estimatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly orderId?: string;
    readonly status?: string;
    readonly type?: string;
    readonly courierId?: string;
  };
}

// ─── Main Interface ────────────────────────
export interface IDeliveryService {
  // Commands
  schedule(dto: ScheduleDeliveryCommandDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  reschedule(dto: RescheduleDeliveryCommandDTO, actorId?: string): Promise<DeliveryResponseDTO>;
  confirm(dto: ConfirmDeliveryCommandDTO, actorId?: string): Promise<DeliveryResponseDTO>;

  // Queries
  getById(id: string): Promise<DeliveryResponseDTO>;
  list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO>;
}
