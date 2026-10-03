/**
 * IDeliveryMethodService
 */
import type { DeliveryMethodResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

export const DELIVERY_METHOD_SERVICE = Symbol('DELIVERY_METHOD_SERVICE');

export interface IDeliveryMethodService {
  getById(methodId: string): Promise<DeliveryMethodResponseDTO>;
  listAll(): Promise<readonly DeliveryMethodResponseDTO[]>;
  listActive(): Promise<readonly DeliveryMethodResponseDTO[]>;
  listByType(type: string): Promise<readonly DeliveryMethodResponseDTO[]>;
}
