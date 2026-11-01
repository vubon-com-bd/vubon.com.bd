import type {
  ShippingMethodResponseDTO,
  ShippingMethodListResponseDTO,
  ShippingMethodStatsResponseDTO,
} from '@application/dtos/responses/shipping-method/index.js';
import type {
  CreateShippingMethodRequestDTO,
  UpdateShippingMethodRequestDTO,
  ShippingMethodActionRequestDTO,
  DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO,
} from '@application/dtos/requests/shipping-method/index.js';
import type { ShippingMethodStatusValue } from '@domain/primitives/shipping-method-status.vo';

export const SHIPPING_METHOD_SERVICE = Symbol('SHIPPING_METHOD_SERVICE');

export interface ShippingMethodListFilterDTO {
  readonly status?: ShippingMethodStatusValue;
  readonly type?: string;
  readonly rateType?: string;
  readonly codEnabled?: boolean;
  readonly trackingEnabled?: boolean;
  readonly zone?: string;
  readonly minWeightKg?: number;
  readonly maxWeightKg?: number;
  readonly search?: string;
}
export interface ShippingMethodListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'baseCost' | 'minDeliveryDays';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShippingMethodListFilterDTO;
}

export interface IShippingMethodService {
  create(dto: CreateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO>;
  update(dto: UpdateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO>;
  activate(dto: ShippingMethodActionRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO>;
  deactivate(dto: DeactivateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO>;
  suspend(dto: SuspendShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO>;
  updateRate(
    dto: { methodId: string; baseCost?: number; freeAbove?: number; maxWeightKg?: number; maxDimensionsCm?: number },
    actorId: string,
  ): Promise<ShippingMethodResponseDTO>;

  getById(id: string): Promise<ShippingMethodResponseDTO>;
  getByCode(code: string): Promise<ShippingMethodResponseDTO>;
  list(options: ShippingMethodListOptionsDTO): Promise<ShippingMethodListResponseDTO>;
  listUsable(): Promise<ShippingMethodListResponseDTO>;
  listByZone(zone: string): Promise<ShippingMethodListResponseDTO>;
  getDefault(): Promise<ShippingMethodResponseDTO | null>;
  getStats(): Promise<ShippingMethodStatsResponseDTO>;
}
