/**
 * User Address Constants
 * Core user address-related constants
 */

import { USER_ADDRESS_TYPE } from './user-address-type.constants';
import { USER_ADDRESS_STATUS } from './user-address-status.constants';

// Bangladesh Divisions
export const DIVISIONS = {
  BARISHAL: 'Barishal',
  CHATTOGRAM: 'Chattogram',
  DHAKA: 'Dhaka',
  KHULNA: 'Khulna',
  MYMENSINGH: 'Mymensingh',
  RAJSHAHI: 'Rajshahi',
  RANGPUR: 'Rangpur',
  SYLHET: 'Sylhet',
} as const;

export type Division = (typeof DIVISIONS)[keyof typeof DIVISIONS];

// Bangladesh Districts by Division
export const DISTRICTS: Record<Division, readonly string[]> = {
  [DIVISIONS.BARISHAL]: ['Barguna', 'Barishal', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur'],
  [DIVISIONS.CHATTOGRAM]: [
    'Bandarban',
    'Brahmanbaria',
    'Chandpur',
    'Chattogram',
    "Cox's Bazar",
    'Feni',
    'Khagrachhari',
    'Lakshmipur',
    'Noakhali',
    'Rangamati',
  ],
  [DIVISIONS.DHAKA]: [
    'Dhaka',
    'Faridpur',
    'Gazipur',
    'Gopalganj',
    'Kishoreganj',
    'Madaripur',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Narsingdi',
    'Rajbari',
    'Shariatpur',
    'Tangail',
  ],
  [DIVISIONS.KHULNA]: [
    'Bagerhat',
    'Chuadanga',
    'Jashore',
    'Jhenaidah',
    'Khulna',
    'Kushtia',
    'Magura',
    'Meherpur',
    'Narail',
    'Satkhira',
  ],
  [DIVISIONS.MYMENSINGH]: ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur'],
  [DIVISIONS.RAJSHAHI]: [
    'Bogra',
    'Chapainawabganj',
    'Joypurhat',
    'Naogaon',
    'Natore',
    'Pabna',
    'Rajshahi',
    'Sirajganj',
  ],
  [DIVISIONS.RANGPUR]: [
    'Dinajpur',
    'Gaibandha',
    'Kurigram',
    'Lalmonirhat',
    'Nilphamari',
    'Panchagarh',
    'Rangpur',
    'Thakurgaon',
  ],
  [DIVISIONS.SYLHET]: ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
};

export const USER_ADDRESS = {
  // Default values
  DEFAULTS: {
    STATUS: USER_ADDRESS_STATUS.ACTIVE,
    TYPE: USER_ADDRESS_TYPE.SHIPPING,
    IS_DEFAULT: false,
    COUNTRY: 'Bangladesh',
    COUNTRY_CODE: 'BD',
  },

  // Address types
  TYPES: {
    SHIPPING: 'shipping',
    BILLING: 'billing',
    BOTH: 'both',
    WORK: 'work',
    HOME: 'home',
    OTHER: 'other',
  },

  // Address fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    IS_DEFAULT: 'isDefault',
    LABEL: 'label',
    RECIPIENT_NAME: 'recipientName',
    RECIPIENT_PHONE: 'recipientPhone',
    ADDRESS_LINE_1: 'addressLine1',
    ADDRESS_LINE_2: 'addressLine2',
    CITY: 'city',
    DISTRICT: 'district',
    STATE: 'state',
    POSTAL_CODE: 'postalCode',
    COUNTRY: 'country',
    COUNTRY_CODE: 'countryCode',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    LANDMARK: 'landmark',
    INSTRUCTIONS: 'instructions',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Address status messages
  STATUS_MESSAGES: {
    [USER_ADDRESS_STATUS.ACTIVE]: 'Address is active',
    [USER_ADDRESS_STATUS.INACTIVE]: 'Address is inactive',
    [USER_ADDRESS_STATUS.PENDING]: 'Address is pending verification',
    [USER_ADDRESS_STATUS.SUSPENDED]: 'Address is suspended',
    [USER_ADDRESS_STATUS.BLOCKED]: 'Address is blocked',
    [USER_ADDRESS_STATUS.DELETED]: 'Address is deleted',
  },
} as const;

export type UserAddressType = (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
export type UserAddressDivision = Division;
export type UserAddressDistrict = (typeof DISTRICTS)[Division][number];

export function getAddressTypeLabel(type: UserAddressType): string {
  const labels: Record<UserAddressType, string> = {
    [USER_ADDRESS.TYPES.SHIPPING]: 'Shipping Address',
    [USER_ADDRESS.TYPES.BILLING]: 'Billing Address',
    [USER_ADDRESS.TYPES.BOTH]: 'Shipping & Billing',
    [USER_ADDRESS.TYPES.WORK]: 'Work Address',
    [USER_ADDRESS.TYPES.HOME]: 'Home Address',
    [USER_ADDRESS.TYPES.OTHER]: 'Other Address',
  };
  return labels[type] || 'Unknown';
}

export function getDivisionLabel(division: Division): string {
  const labels: Record<Division, string> = {
    [DIVISIONS.BARISHAL]: 'Barishal Division',
    [DIVISIONS.CHATTOGRAM]: 'Chattogram Division',
    [DIVISIONS.DHAKA]: 'Dhaka Division',
    [DIVISIONS.KHULNA]: 'Khulna Division',
    [DIVISIONS.MYMENSINGH]: 'Mymensingh Division',
    [DIVISIONS.RAJSHAHI]: 'Rajshahi Division',
    [DIVISIONS.RANGPUR]: 'Rangpur Division',
    [DIVISIONS.SYLHET]: 'Sylhet Division',
  };
  return labels[division] || 'Unknown';
}

export function getDistrictsByDivision(division: Division): readonly string[] {
  return DISTRICTS[division] || [];
}

export function getAllDivisions(): Division[] {
  return Object.values(DIVISIONS);
}

export function getAllDistricts(): string[] {
  const allDistricts: string[] = [];
  for (const division of getAllDivisions()) {
    allDistricts.push(...getDistrictsByDivision(division));
  }
  return allDistricts;
}

export function getDivisionByDistrict(district: string): Division | null {
  for (const division of getAllDivisions()) {
    const districts = getDistrictsByDivision(division);
    if (districts.includes(district)) {
      return division;
    }
  }
  return null;
}

export function getAddressStatusMessage(status: string): string {
  return (
    USER_ADDRESS.STATUS_MESSAGES[status as keyof typeof USER_ADDRESS.STATUS_MESSAGES] ||
    'Unknown status'
  );
}

export function isDefaultAddress(address: { isDefault: boolean }): boolean {
  return address.isDefault === true;
}

export function getFullAddress(address: {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}): string {
  let fullAddress = address.addressLine1;
  if (address.addressLine2) {
    fullAddress += `, ${address.addressLine2}`;
  }
  fullAddress += `, ${address.city}`;
  fullAddress += `, ${address.district}`;
  fullAddress += `, ${address.postalCode}`;
  fullAddress += `, ${address.country}`;
  return fullAddress;
}

export function validatePostalCode(postalCode: string): boolean {
  // Bangladesh postal code is 4 digits
  return /^[0-9]{4}$/.test(postalCode);
}

export function validatePhoneNumber(phone: string): boolean {
  // Bangladesh phone number
  return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(phone);
}

export function validateAddressLine(addressLine: string): boolean {
  return addressLine.trim().length >= 3;
}

export function isValidAddress(address: {
  recipientName: string;
  recipientPhone: string;
  addressLine1: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}): boolean {
  return (
    address.recipientName.trim().length >= 2 &&
    validatePhoneNumber(address.recipientPhone) &&
    validateAddressLine(address.addressLine1) &&
    address.city.trim().length >= 2 &&
    address.district.trim().length >= 2 &&
    validatePostalCode(address.postalCode) &&
    address.country.trim().length >= 2
  );
}
