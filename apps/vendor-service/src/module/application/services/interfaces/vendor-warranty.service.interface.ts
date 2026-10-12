/**
 * IVendorWarrantyService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_WARRANTY_SERVICE = Symbol('VENDOR_WARRANTY_SERVICE');

export interface VendorWarrantyResponseDto {
  readonly vendorId: string;
  readonly defaultType: string;
  readonly defaultPeriodDays: number;
  readonly coversShipping: boolean;
  readonly requireProof: boolean;
  readonly autoRegister: boolean;
  readonly terms?: string;
  readonly exclusions: readonly string[];
  readonly updatedAt: string;
}

export interface IVendorWarrantyService {
  initialize(vendorId: string, actorId?: string): Promise<VendorWarrantyResponseDto>;
  updateType(vendorId: string, type: string, actorId?: string): Promise<VendorWarrantyResponseDto>;
  updatePeriod(vendorId: string, days: number, actorId?: string): Promise<VendorWarrantyResponseDto>;
  updateTerms(vendorId: string, terms: string | undefined, actorId?: string): Promise<VendorWarrantyResponseDto>;
  addExclusion(vendorId: string, term: string, actorId?: string): Promise<VendorWarrantyResponseDto>;
  removeExclusion(vendorId: string, term: string, actorId?: string): Promise<VendorWarrantyResponseDto>;
  calculateExpiry(vendorId: string, purchasedAt: string): Promise<string>;
  getByVendorId(vendorId: string): Promise<VendorWarrantyResponseDto>;
}
