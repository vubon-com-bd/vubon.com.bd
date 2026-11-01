/**
 * IVendorWarrantyService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { UpdateWarrantyRequestDTO } from '../../dtos/requests/warranty/index.js';

export const VENDOR_WARRANTY_SERVICE = Symbol('VENDOR_WARRANTY_SERVICE');

export interface WarrantyDTO {
  readonly vendorId: string;
  readonly type: string;
  readonly periodDays: number;
  readonly periodLabel: string;
  readonly requireProof: boolean;
  readonly coverShipping: boolean;
  readonly autoRegister: boolean;
  readonly excludedCategories: readonly string[];
  readonly terms?: string;
}

export interface IVendorWarrantyService {
  update(dto: UpdateWarrantyRequestDTO, actorId?: string): Promise<WarrantyDTO>;
  addExcludedCategory(vendorId: string, categoryId: string, actorId?: string): Promise<WarrantyDTO>;
  removeExcludedCategory(vendorId: string, categoryId: string, actorId?: string): Promise<WarrantyDTO>;
  getByVendorId(vendorId: string): Promise<WarrantyDTO | null>;
  isWithinWarranty(vendorId: string, daysSincePurchase: number): Promise<boolean>;
}
