/**
 * IOrderReturnService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  RequestReturnCommandDTO,
  ApproveReturnCommandDTO,
  RejectReturnCommandDTO,
  CompleteReturnCommandDTO,
} from '../../dtos/requests/return/index.js';
import type {
  ReturnResponseDTO,
  ReturnListResponseDTO,
} from '../../dtos/responses/return-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_RETURN_SERVICE = Symbol('ORDER_RETURN_SERVICE');

// ─── Filter / Options ──────────────────────
export interface ReturnListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly orderId?: string;
    readonly customerId?: string;
    readonly status?: string;
    readonly reason?: string;
  };
}

// ─── Main Interface ────────────────────────
export interface IOrderReturnService {
  // Commands
  request(dto: RequestReturnCommandDTO, actorId?: string): Promise<ReturnResponseDTO>;
  schedulePickup(returnId: string, actorId?: string): Promise<ReturnResponseDTO>;
  markPickedUp(returnId: string, actorId?: string): Promise<ReturnResponseDTO>;
  receive(returnId: string, actorId?: string): Promise<ReturnResponseDTO>;
  inspect(returnId: string, actorId?: string): Promise<ReturnResponseDTO>;
  approve(dto: ApproveReturnCommandDTO, actorId?: string): Promise<ReturnResponseDTO>;
  reject(dto: RejectReturnCommandDTO, actorId?: string): Promise<ReturnResponseDTO>;
  complete(dto: CompleteReturnCommandDTO, actorId?: string): Promise<ReturnResponseDTO>;

  // Queries
  getById(id: string): Promise<ReturnResponseDTO>;
  listByOrder(orderId: string): Promise<readonly ReturnResponseDTO[]>;
  list(options: ReturnListOptionsDTO): Promise<ReturnListResponseDTO>;
}
