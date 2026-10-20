/**
 * IOrderCancelService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  RequestCancelCommandDTO,
  ApproveCancelCommandDTO,
  RejectCancelCommandDTO,
} from '../../dtos/requests/cancel/index.js';
import type {
  CancelResponseDTO,
  CancelListResponseDTO,
} from '../../dtos/responses/cancel-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_CANCEL_SERVICE = Symbol('ORDER_CANCEL_SERVICE');

// ─── Filter / Options ──────────────────────
export interface CancelListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly orderId?: string;
    readonly status?: string;
    readonly reason?: string;
  };
}

// ─── Main Interface ────────────────────────
export interface IOrderCancelService {
  // Commands
  request(dto: RequestCancelCommandDTO, actorId?: string): Promise<CancelResponseDTO>;
  approve(dto: ApproveCancelCommandDTO, actorId?: string): Promise<CancelResponseDTO>;
  reject(dto: RejectCancelCommandDTO, actorId?: string): Promise<CancelResponseDTO>;

  // Queries
  getById(id: string): Promise<CancelResponseDTO>;
  listByOrder(orderId: string): Promise<readonly CancelResponseDTO[]>;
  list(options: CancelListOptionsDTO): Promise<CancelListResponseDTO>;
}
