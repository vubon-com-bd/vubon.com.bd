/**
 * IOrderFulfillmentService
 */
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/start-fulfillment.dto.js';
import type { PackOrderRequestDTO } from '../../dtos/requests/fulfillment/pack-order.dto.js';
import type { ShipOrderRequestDTO } from '../../dtos/requests/fulfillment/ship-order.dto.js';
import type { CompleteFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/complete-fulfillment.dto.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

export const ORDER_FULFILLMENT_SERVICE = Symbol('ORDER_FULFILLMENT_SERVICE');

export interface IOrderFulfillmentService {
  start(dto: StartFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  pack(dto: PackOrderRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  ship(dto: ShipOrderRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  complete(dto: CompleteFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO>;
  getById(fulfillmentId: string): Promise<FulfillmentResponseDTO>;
  listByOrder(orderId: string): Promise<readonly FulfillmentResponseDTO[]>;
  listByVendor(vendorId: string): Promise<readonly FulfillmentResponseDTO[]>;
}
