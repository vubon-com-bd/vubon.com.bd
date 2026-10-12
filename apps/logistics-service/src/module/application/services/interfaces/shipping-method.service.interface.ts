/**
 * IShippingMethodService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateShippingMethodRequestDTO, UpdateShippingMethodRequestDTO,
  ActivateShippingMethodRequestDTO, DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO, CalculateShippingRequestDTO,
  ShippingMethodListFilterDTO,
} from '../../dtos/requests/shipping-method/shipping-method.dto.js';
import type {
  ShippingMethodResponseDTO, CalculateShippingResponseDTO, ShippingMethodListResponseDTO,
} from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

export const SHIPPING_METHOD_SERVICE = Symbol('SHIPPING_METHOD_SERVICE');

export interface ShippingMethodListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'baseCost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShippingMethodListFilterDTO;
}

export interface IShippingMethodService {
  create(dto: CreateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO>;
  update(dto: UpdateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO>;
  activate(dto: ActivateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO>;
  deactivate(dto: DeactivateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO>;
  suspend(dto: SuspendShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO>;
  calculateShipping(dto: CalculateShippingRequestDTO): Promise<CalculateShippingResponseDTO>;

  getById(methodId: string): Promise<ShippingMethodResponseDTO>;
  list(options: ShippingMethodListOptionsDTO): Promise<ShippingMethodListResponseDTO>;
  getDefault(): Promise<ShippingMethodResponseDTO | null>;
}
