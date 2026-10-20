/**
 * IDeliveryMethodService — contract
 * @module order-service/application/services/interfaces
 */
import type { DeliveryMethodResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

// ─── DI Token ──────────────────────────────
export const DELIVERY_METHOD_SERVICE = Symbol('DELIVERY_METHOD_SERVICE');

// ─── Main Interface ────────────────────────
export interface IDeliveryMethodService {
  getById(id: string): Promise<DeliveryMethodResponseDTO>;
  listActive(): Promise<readonly DeliveryMethodResponseDTO[]>;
  listAll(): Promise<readonly DeliveryMethodResponseDTO[]>;
}
