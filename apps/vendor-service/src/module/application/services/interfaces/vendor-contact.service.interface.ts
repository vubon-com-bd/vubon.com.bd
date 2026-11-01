/**
 * IVendorContactService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { ContactSummaryDTO } from '../../dtos/responses/vendor-detail-response.dto.js';

export const VENDOR_CONTACT_SERVICE = Symbol('VENDOR_CONTACT_SERVICE');

export interface VendorContactListFilterDTO {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly isPrimary?: boolean;
  readonly isVerified?: boolean;
  readonly search?: string;
}

export interface VendorContactListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorContactListFilterDTO;
}

export interface IVendorContactService {
  add(vendorId: string, type: string, value: string, label?: string, actorId?: string): Promise<ContactSummaryDTO>;
  update(contactId: string, patch: Partial<ContactSummaryDTO>, actorId?: string): Promise<ContactSummaryDTO>;
  remove(contactId: string, actorId?: string): Promise<{ readonly success: true }>;
  verify(contactId: string, actorId: string): Promise<ContactSummaryDTO>;
  unverify(contactId: string, actorId: string): Promise<ContactSummaryDTO>;
  markPrimary(contactId: string, actorId: string): Promise<ContactSummaryDTO>;
  listByVendor(vendorId: string): Promise<readonly ContactSummaryDTO[]>;
  getPrimary(vendorId: string): Promise<ContactSummaryDTO | null>;
}
