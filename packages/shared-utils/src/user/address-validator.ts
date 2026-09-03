/**
 * Address Validator
 * ইউজার ঠিকানা ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import { UserAddress, UserAddressCreateInput, UserAddressUpdateInput } from '@vubon/shared-types';
import { USER_ADDRESS } from '@vubon/shared-constants';

type AddressType = (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
type AddressCountry = (typeof USER_ADDRESS.COUNTRIES)[keyof typeof USER_ADDRESS.COUNTRIES];
type AddressDivision = (typeof USER_ADDRESS.DIVISIONS)[keyof typeof USER_ADDRESS.DIVISIONS];

export const AddressValidator = {
  /**
   * Validate address data
   * ঠিকানা ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserAddress>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.street && (data.street.length < 2 || data.street.length > 200)) {
      errors.push('Street must be between 2 and 200 characters');
    }

    if (data.city && (data.city.length < 2 || data.city.length > 50)) {
      errors.push('City must be between 2 and 50 characters');
    }

    if (data.state && (data.state.length < 2 || data.state.length > 50)) {
      errors.push('State must be between 2 and 50 characters');
    }

    if (data.postalCode && !REGEX.POSTAL_CODE.test(data.postalCode)) {
      errors.push('Invalid postal code');
    }

    if (
      data.country &&
      !Object.values(USER_ADDRESS.COUNTRIES).includes(data.country as AddressCountry)
    ) {
      errors.push('Invalid country');
    }

    if (
      data.division &&
      !Object.values(USER_ADDRESS.DIVISIONS).includes(data.division as AddressDivision)
    ) {
      errors.push('Invalid division');
    }

    if (data.district && data.district.length < 1) {
      errors.push('District is required');
    }

    // AddressType ব্যবহার করা
    if (data.type && !Object.values(USER_ADDRESS.TYPES).includes(data.type as AddressType)) {
      errors.push('Invalid address type');
    }

    if (data.latitude !== undefined && (data.latitude < -90 || data.latitude > 90)) {
      errors.push('Latitude must be between -90 and 90');
    }

    if (data.longitude !== undefined && (data.longitude < -180 || data.longitude > 180)) {
      errors.push('Longitude must be between -180 and 180');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate address creation
   * ঠিকানা তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserAddressCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (!data.street || data.street.length < 2) {
      errors.push('Street is required and must be at least 2 characters');
    }

    if (!data.city || data.city.length < 2) {
      errors.push('City is required and must be at least 2 characters');
    }

    if (!data.state || data.state.length < 2) {
      errors.push('State is required and must be at least 2 characters');
    }

    if (!data.postalCode || !REGEX.POSTAL_CODE.test(data.postalCode)) {
      errors.push('Valid postal code is required');
    }

    if (!data.district) {
      errors.push('District is required');
    }

    // AddressType ব্যবহার করা
    if (data.type && !Object.values(USER_ADDRESS.TYPES).includes(data.type as AddressType)) {
      errors.push('Invalid address type');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate address update
   * ঠিকানা আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserAddressUpdateInput): { valid: boolean; errors: string[] } => {
    return AddressValidator.validate(data);
  },

  /**
   * Get full address string
   * সম্পূর্ণ ঠিকানা স্ট্রিং পাওয়া
   */
  getFullAddress: (address: UserAddress): string => {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ];
    return parts.filter(Boolean).join(', ');
  },

  /**
   * Get full address with division
   * ডিভিশন সহ সম্পূর্ণ ঠিকানা পাওয়া
   */
  getFullAddressWithDivision: (address: UserAddress): string => {
    const parts = [
      address.street,
      address.city,
      address.district,
      address.division,
      address.postalCode,
      address.country,
    ];
    return parts.filter(Boolean).join(', ');
  },

  /**
   * Get address type label
   * ঠিকানা টাইপ লেবেল পাওয়া
   */
  getTypeLabel: (type: string): string => {
    const labels: Record<string, string> = {
      shipping: 'Shipping',
      billing: 'Billing',
      both: 'Both',
      office: 'Office',
      home: 'Home',
      other: 'Other',
    };
    return labels[type] || type;
  },

  /**
   * Get country name
   * দেশের নাম পাওয়া
   */
  getCountryName: (countryCode: string): string => {
    const names: Record<string, string> = {
      BD: 'Bangladesh',
      US: 'United States',
      UK: 'United Kingdom',
      AE: 'United Arab Emirates',
      IN: 'India',
      SG: 'Singapore',
      MY: 'Malaysia',
    };
    return names[countryCode] || countryCode;
  },
};
