/**
 * IVendorShippingService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  UpdateShippingRequestDTO,
  SetShippingMethodsRequestDTO,
} from '../../dtos/requests/shipping/index.js';

export const VENDOR_SHIPPING_SERVICE = Symbol('VENDOR_SHIPPING_SERVICE');

export interface ShippingConfigDTO {
  readonly vendorId: string;
  readonly methods: readonly string[];
  readonly zones: readonly {
    readonly zone: string;
    readonly cost: number;
    readonly minDays: number;
    readonly maxDays: number;
    readonly isActive: boolean;
  }[];
  readonly freeShippingThreshold?: number;
  readonly defaultShippingCost: number;
  readonly maxShippingCost: number;
  readonly allowsPickup: boolean;
  readonly allowsCourier: boolean;
  readonly trackingRequired: boolean;
  readonly processingDays: number;
}

export interface IVendorShippingService {
  update(dto: UpdateShippingRequestDTO, actorId?: string): Promise<ShippingConfigDTO>;
  setMethods(dto: SetShippingMethodsRequestDTO, actorId?: string): Promise<ShippingConfigDTO>;
  addMethod(vendorId: string, method: string, actorId?: string): Promise<ShippingConfigDTO>;
  removeMethod(vendorId: string, method: string, actorId?: string): Promise<ShippingConfigDTO>;
  calculateCost(vendorId: string, zone: string, orderAmount: number): Promise<number>;
  getByVendorId(vendorId: string): Promise<ShippingConfigDTO | null>;
}
