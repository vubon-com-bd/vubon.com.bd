/**
 * Shipping Address Constants
 * Shipping address definitions for checkout
 */

export const SHIPPING_ADDRESS = {
  // Address Types
  TYPES: {
    HOME: 'home',
    OFFICE: 'office',
    PICKUP_POINT: 'pickup_point',
    OTHER: 'other',
  } as const,

  // Address Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING_VERIFICATION: 'pending_verification',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
  } as const,

  // Address Fields
  FIELDS: {
    RECIPIENT_NAME: 'recipient_name',
    RECIPIENT_PHONE: 'recipient_phone',
    ADDRESS_LINE_1: 'address_line_1',
    ADDRESS_LINE_2: 'address_line_2',
    CITY: 'city',
    STATE: 'state',
    POSTAL_CODE: 'postal_code',
    COUNTRY: 'country',
    LANDMARK: 'landmark',
    DELIVERY_INSTRUCTIONS: 'delivery_instructions',
    PREFERRED_DELIVERY_TIME: 'preferred_delivery_time',
    CONTACT_PERSON: 'contact_person',
  } as const,

  // Address Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'home',
    DEFAULT_STATUS: 'active',
    DEFAULT_COUNTRY: 'Bangladesh',
    DEFAULT_COUNTRY_CODE: 'BD',
    DEFAULT_POSTAL_CODE: '1000',
    DEFAULT_DELIVERY_TIME: '09:00-18:00',
  } as const,

  // Address Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_ADDRESS_LINE_LENGTH: 200,
    MAX_CITY_LENGTH: 50,
    MAX_STATE_LENGTH: 50,
    MAX_POSTAL_CODE_LENGTH: 20,
    MAX_COUNTRY_LENGTH: 50,
    MAX_PHONE_LENGTH: 20,
    MAX_LANDMARK_LENGTH: 200,
    MAX_DELIVERY_INSTRUCTIONS_LENGTH: 500,
    MAX_CONTACT_PERSON_LENGTH: 100,
  } as const,
} as const;

// Address Types
export type ShippingAddressType =
  (typeof SHIPPING_ADDRESS.TYPES)[keyof typeof SHIPPING_ADDRESS.TYPES];

// Address Statuses
export type ShippingAddressStatus =
  (typeof SHIPPING_ADDRESS.STATUSES)[keyof typeof SHIPPING_ADDRESS.STATUSES];

// Address Fields
export type ShippingAddressField =
  (typeof SHIPPING_ADDRESS.FIELDS)[keyof typeof SHIPPING_ADDRESS.FIELDS];

// Address Defaults
export type ShippingAddressDefault =
  (typeof SHIPPING_ADDRESS.DEFAULTS)[keyof typeof SHIPPING_ADDRESS.DEFAULTS];

// Address Limits
export type ShippingAddressLimit =
  (typeof SHIPPING_ADDRESS.LIMITS)[keyof typeof SHIPPING_ADDRESS.LIMITS];

// Utility Functions
export function shippingaddressGetTypeLabel(type: ShippingAddressType): string {
  const labels: Record<ShippingAddressType, string> = {
    [SHIPPING_ADDRESS.TYPES.HOME]: 'Home',
    [SHIPPING_ADDRESS.TYPES.OFFICE]: 'Office',
    [SHIPPING_ADDRESS.TYPES.PICKUP_POINT]: 'Pickup Point',
    [SHIPPING_ADDRESS.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown Type';
}

export function shippingaddressGetStatusLabel(status: ShippingAddressStatus): string {
  const labels: Record<ShippingAddressStatus, string> = {
    [SHIPPING_ADDRESS.STATUSES.ACTIVE]: 'Active',
    [SHIPPING_ADDRESS.STATUSES.INACTIVE]: 'Inactive',
    [SHIPPING_ADDRESS.STATUSES.PENDING_VERIFICATION]: 'Pending Verification',
    [SHIPPING_ADDRESS.STATUSES.VERIFIED]: 'Verified',
    [SHIPPING_ADDRESS.STATUSES.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function shippingaddressGetFieldLabel(field: ShippingAddressField): string {
  const labels: Record<ShippingAddressField, string> = {
    [SHIPPING_ADDRESS.FIELDS.RECIPIENT_NAME]: 'Recipient Name',
    [SHIPPING_ADDRESS.FIELDS.RECIPIENT_PHONE]: 'Recipient Phone',
    [SHIPPING_ADDRESS.FIELDS.ADDRESS_LINE_1]: 'Address Line 1',
    [SHIPPING_ADDRESS.FIELDS.ADDRESS_LINE_2]: 'Address Line 2',
    [SHIPPING_ADDRESS.FIELDS.CITY]: 'City',
    [SHIPPING_ADDRESS.FIELDS.STATE]: 'State',
    [SHIPPING_ADDRESS.FIELDS.POSTAL_CODE]: 'Postal Code',
    [SHIPPING_ADDRESS.FIELDS.COUNTRY]: 'Country',
    [SHIPPING_ADDRESS.FIELDS.LANDMARK]: 'Landmark',
    [SHIPPING_ADDRESS.FIELDS.DELIVERY_INSTRUCTIONS]: 'Delivery Instructions',
    [SHIPPING_ADDRESS.FIELDS.PREFERRED_DELIVERY_TIME]: 'Preferred Delivery Time',
    [SHIPPING_ADDRESS.FIELDS.CONTACT_PERSON]: 'Contact Person',
  };
  return labels[field] || 'Unknown Field';
}

export function shippingaddressIsHome(type: ShippingAddressType): boolean {
  return type === SHIPPING_ADDRESS.TYPES.HOME;
}

export function shippingaddressIsOffice(type: ShippingAddressType): boolean {
  return type === SHIPPING_ADDRESS.TYPES.OFFICE;
}

export function shippingaddressIsPickupPoint(type: ShippingAddressType): boolean {
  return type === SHIPPING_ADDRESS.TYPES.PICKUP_POINT;
}

export function shippingaddressIsVerified(status: ShippingAddressStatus): boolean {
  return (
    status === SHIPPING_ADDRESS.STATUSES.VERIFIED || status === SHIPPING_ADDRESS.STATUSES.ACTIVE
  );
}

export function shippingaddressGetDefaultCountry(): string {
  return SHIPPING_ADDRESS.DEFAULTS.DEFAULT_COUNTRY;
}

export function shippingaddressGetDefaultDeliveryTime(): string {
  return SHIPPING_ADDRESS.DEFAULTS.DEFAULT_DELIVERY_TIME;
}
