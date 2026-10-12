/**
 * IVendorShippingService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_SHIPPING_SERVICE = Symbol('VENDOR_SHIPPING_SERVICE');

export interface ShippingRateDto {
  readonly method: string;
  readonly zone: string;
  readonly cost: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly isActive: boolean;
}

export interface VendorShippingResponseDto {
  readonly vendorId: string;
  readonly defaultMethod: string;
  readonly trackingRequired: boolean;
  readonly allowPickup: boolean;
  readonly allowCourier: boolean;
  readonly freeShippingThreshold?: number;
  readonly rates: readonly ShippingRateDto[];
  readonly updatedAt: string;
}

export interface AddShippingRateInput {
  readonly vendorId: string;
  readonly method: string;
  readonly zone: string;
  readonly cost: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
}

export interface IVendorShippingService {
  initialize(vendorId: string, defaultMethod: string, actorId?: string): Promise<VendorShippingResponseDto>;
  addRate(input: AddShippingRateInput, actorId?: string): Promise<VendorShippingResponseDto>;
  removeRate(vendorId: string, method: string, zone: string, actorId?: string): Promise<VendorShippingResponseDto>;
  setFreeShippingThreshold(vendorId: string, amount: number | undefined, actorId?: string): Promise<VendorShippingResponseDto>;
  calculateShipping(vendorId: string, zone: string, orderTotal: number, method?: string): Promise<number>;
  getByVendorId(vendorId: string): Promise<VendorShippingResponseDto>;
}
