/**
 * IVendorSlugService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_SLUG_SERVICE = Symbol('VENDOR_SLUG_SERVICE');

export interface SlugAvailabilityDto {
  readonly slug: string;
  readonly available: boolean;
  readonly suggestion?: string;
}

export interface IVendorSlugService {
  checkAvailability(slug: string): Promise<SlugAvailabilityDto>;
  suggestFor(name: string): Promise<SlugAvailabilityDto>;
  isSuspicious(slug: string): boolean;
}
