/**
 * Vendor Aggregated Constants
 * @module shared-constants/business/vendor/vendor
 *
 * IMPORTANT: Namespace aggregator, NOT a flat enum.
 * Does NOT import admin layer.
 * Does NOT spread COMMON_ROLES — vendor-scoped roles only; common roles
 * are referenced from common/roles.constants where needed.
 */

import { VENDOR_STATUS } from './vendor-status.constants';
import { VENDOR_PERMISSION } from './vendor-permission.constants';

export const VENDOR = {
  STATUS: VENDOR_STATUS,

  ROLES: {
    // Vendor-scoped roles only (referenced from VENDOR_TEAM where needed)
    VENDOR_OWNER: 'vendor_owner',
    VENDOR_ADMIN: 'vendor_admin',
    VENDOR_MANAGER: 'vendor_manager',
    VENDOR_STAFF: 'vendor_staff',
    VENDOR_VIEWER: 'vendor_viewer',
  } as const,

  PERMISSIONS: VENDOR_PERMISSION,

  MAX_VENDORS_PER_USER: 5,
  MIN_AGE_DAYS: 180,
  REGISTRATION_FEE: 0,
} as const;
