/**
 * Courier Constants Index
 * Export all courier constants and types for easy importing
 */

// Courier Constants
export {
  LOGISTICS_COURIER,
  logisticsCourierGetTypeLabel,
  logisticsCourierGetStatusLabel,
  logisticsCourierGetProviderLabel,
  logisticsCourierGetServiceTypeLabel,
  logisticsCourierGetPaymentMethodLabel,
  logisticsCourierGetContact,
  logisticsCourierGetWebsite,
  logisticsCourierIsActive,
  logisticsCourierIsAvailable,
  logisticsCourierGetDeliveryTime,
} from './courier.constants';

export type {
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
} from './courier.constants';

// Courier Status Constants
export {
  LOGISTICS_COURIER_STATUS,
  logisticsCourierStatusGetLabel,
  logisticsCourierStatusGetCategory,
  logisticsCourierStatusIsOperational,
  logisticsCourierStatusIsAvailable,
  logisticsCourierStatusCanTransition,
} from './courier-status.constants';

export type {
  LogisticsCourierStatusType,
  LogisticsCourierStatusCategory,
  LogisticsCourierStatusColor,
  LogisticsCourierStatusIcon,
  LogisticsCourierStatusTransition,
} from './courier-status.constants';

// Courier Type Constants
export {
  LOGISTICS_COURIER_TYPE,
  logisticsCourierTypeGetLabel,
  logisticsCourierTypeGetCategory,
  logisticsCourierTypeGetIcon,
  logisticsCourierTypeGetColor,
  logisticsCourierTypeGetDeliveryTime,
  logisticsCourierTypeGetPriceMultiplier,
  logisticsCourierTypeGetCoverage,
} from './courier-type.constants';

export type {
  LogisticsCourierTypeType,
  LogisticsCourierTypeCategory,
  LogisticsCourierTypeIcon,
  LogisticsCourierTypeColor,
} from './courier-type.constants';
