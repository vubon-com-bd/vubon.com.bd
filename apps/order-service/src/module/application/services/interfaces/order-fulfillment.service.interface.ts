/**
 * IOrderFulfillmentService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  StartFulfillmentCommandDTO,
  PackOrderCommandDTO,
  ShipOrderCommandDTO,
  CompleteFulfillmentCommandDTO,
} from '../../dtos/requests/fulfillment/index.js';
import type {
  FulfillmentResponseDTO,
  FulfillmentListResponseDTO,
} from '../../dtos/responses/fulfillment-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_FULFILLMENT_SERVICE = Symbol('ORDER_FULFILLMENT_SERVICE');

// ─── Filter / Options ──────────────────────
export interface FulfillmentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly orderId?: string;
    readonly vendorId?: string;
    readonly status?: string;
    readonly warehouseId?: string;
  };
}

// ─── Main Interface ────────────────────────
export interface IOrderFulfillmentService {
  // Commands
  start(dto: StartFulfillmentCommandDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  pack(dto: PackOrderCommandDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  ship(dto: ShipOrderCommandDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  complete(
    dto: CompleteFulfillmentCommandDTO,
    actorId?: string,
  ): Promise<FulfillmentResponseDTO>;

  // Queries
  getById(id: string): Promise<FulfillmentResponseDTO>;
  listByOrder(orderId: string): Promise<readonly FulfillmentResponseDTO[]>;
  list(options: FulfillmentListOptionsDTO): Promise<FulfillmentListResponseDTO>;
}
