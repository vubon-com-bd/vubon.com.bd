/**
 * User Address Constants Index
 * Export all user address-related constants and types
 */

// Export divisions and districts
export { DIVISIONS, DISTRICTS } from './user-address.constants';

export type { Division } from './user-address.constants';

// Core Address Constants
export {
  USER_ADDRESS,
  getAddressTypeLabel as getCoreAddressTypeLabel,
  getDivisionLabel,
  getDistrictsByDivision,
  getAllDivisions,
  getAllDistricts,
  getDivisionByDistrict,
  getAddressStatusMessage,
  isDefaultAddress,
  getFullAddress,
  validatePostalCode,
  validateAddressLine,
  isValidAddress,
  validatePhoneNumber,
} from './user-address.constants';

export type {
  UserAddressType,
  UserAddressDivision,
  UserAddressDistrict,
} from './user-address.constants';

// Address Type Constants
export {
  USER_ADDRESS_TYPE,
  USER_ADDRESS_TYPE_LABELS,
  USER_ADDRESS_TYPE_DESCRIPTIONS,
  SHIPPING_ADDRESS_TYPES,
  BILLING_ADDRESS_TYPES,
  RESIDENTIAL_ADDRESS_TYPES,
  BUSINESS_ADDRESS_TYPES,
  isShippingAddress,
  isBillingAddress,
  isResidentialAddress,
  isBusinessAddress,
  getAddressTypeLabel,
  getAddressTypeDescription,
  getAddressTypeByValue,
} from './user-address-type.constants';

export type { UserAddressType as AddressType } from './user-address-type.constants';

// Address Status Constants
export {
  USER_ADDRESS_STATUS,
  USER_ADDRESS_STATUS_LABELS,
  USER_ADDRESS_STATUS_COLORS,
  ACTIVE_ADDRESS_STATUSES,
  INACTIVE_ADDRESS_STATUSES,
  RESTRICTED_ADDRESS_STATUSES,
  VERIFICATION_REQUIRED_ADDRESS_STATUSES,
  isAddressActive,
  isAddressRestricted,
  canUseAddress,
  getAddressStatusLabel,
  getAddressStatusColor,
} from './user-address-status.constants';

export type { UserAddressStatus } from './user-address-status.constants';
