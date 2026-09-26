/**
 * Vendor Role Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-role.constants থেকে।
 */

import type { VENDOR_ROLE } from '@vubon/shared-constants/business';

export type VendorRoleValue = (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];

export interface VendorRoleMetadata {
  readonly value: VendorRoleValue;
  readonly label: string;
  readonly level: number;
  readonly isOwner: boolean;
}

export interface VendorRoleAssignment {
  readonly vendorId: string;
  readonly userId: string;
  readonly role: VendorRoleValue;
  readonly assignedBy: string;
  readonly assignedAt: string;
  readonly expiresAt?: string;
}
