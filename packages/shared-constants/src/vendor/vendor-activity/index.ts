/**
 * Vendor Activity Constants Index
 * Export all vendor activity constants and types for easy importing
 */

// Vendor Activity Constants
export {
  VENDOR_ACTIVITY,
  vendorActivityGetTypeLabel,
  vendorActivityGetStatusLabel,
  vendorActivityGetCategory,
  vendorActivityGetColor,
  vendorActivityIsSuccess,
  vendorActivityIsFailed,
  vendorActivityGetSeverity,
} from './vendor-activity.constants';

export type {
  VendorActivityType,
  VendorActivityStatus,
  VendorActivityCategory,
  VendorActivitySeverity,
  VendorActivityColor,
  VendorActivityIcon,
} from './vendor-activity.constants';

// Vendor Activity Type Constants
export {
  VENDOR_ACTIVITY_TYPE,
  vendorActivityTypeGetCategoryLabel,
  vendorActivityTypeGetScopeLabel,
  vendorActivityTypeGetPriorityLabel,
  vendorActivityTypeGetRetention,
  vendorActivityTypeGetLogging,
} from './vendor-activity-type.constants';

export type {
  VendorActivityTypeCategory,
  VendorActivityTypeScope,
  VendorActivityTypePriority,
  VendorActivityTypeRetention,
  VendorActivityTypeLogging,
} from './vendor-activity-type.constants';
