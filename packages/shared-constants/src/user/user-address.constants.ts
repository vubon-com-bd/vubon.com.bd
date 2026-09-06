/**
 * User Address Constants (EXTENDS common/types)
 * @module shared-constants/user/user-address.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_ADDRESS = {
  // Base types from common
  ...TYPES,

  // Address types
  TYPES: {
    BILLING: 'billing',
    SHIPPING: 'shipping',
    OFFICE: 'office',
    HOME: 'home',
    OTHER: 'other',
    PERMANENT: 'permanent',
    PRESENT: 'present',
    BUSINESS: 'business',
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
  } as const,

  // Address status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    DELETED: 'deleted',
    DEFAULT: 'default',
  } as const,

  // Address fields
  FIELDS: {
    STREET: 'street',
    STREET_LINE_1: 'streetLine1',
    STREET_LINE_2: 'streetLine2',
    AREA: 'area',
    BLOCK: 'block',
    SECTOR: 'sector',
    ROAD: 'road',
    HOUSE: 'house',
    FLAT: 'flat',
    APARTMENT: 'apartment',
    FLOOR: 'floor',
    BUILDING: 'building',
    VILLAGE: 'village',
    UNION: 'union',
    UPAZILA: 'upazila',
    DISTRICT: 'district',
    DIVISION: 'division',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    POSTAL_CODE: 'postalCode',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    GOOGLE_PLACE_ID: 'googlePlaceId',
  } as const,

  // Address validation
  VALIDATION: {
    MIN_STREET_LENGTH: 3,
    MAX_STREET_LENGTH: 255,
    MIN_CITY_LENGTH: 2,
    MAX_CITY_LENGTH: 100,
    MIN_POSTAL_CODE_LENGTH: 4,
    MAX_POSTAL_CODE_LENGTH: 10,
    MAX_ADDRESSES_PER_USER: 20,
    MAX_DEFAULT_ADDRESSES: 1,
    LATITUDE_RANGE: { MIN: -90, MAX: 90 },
    LONGITUDE_RANGE: { MIN: -180, MAX: 180 },
  },

  // Bangladesh address specific
  BD: {
    DIVISIONS: ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'],
    DISTRICTS: {
      DHAKA: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল', 'কিশোরগঞ্জ'],
      CHITTAGONG: ['চট্টগ্রাম', 'কক্সবাজার', 'রাঙ্গামাটি', 'খাগড়াছড়ি', 'বান্দরবান'],
      RAJSHAHI: ['রাজশাহী', 'নাটোর', 'চাঁপাইনবাবগঞ্জ', 'নওগাঁ', 'জয়পুরহাট'],
      KHULNA: ['খুলনা', 'যশোর', 'সাতক্ষীরা', 'নড়াইল', 'মাগুরা'],
      BARISHAL: ['বরিশাল', 'পিরোজপুর', 'ঝালকাঠি', 'পটুয়াখালী', 'ভোলা'],
      SYLHET: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
      RANGPUR: ['রংপুর', 'কুড়িগ্রাম', 'গাইবান্ধা', 'লালমনিরহাট', 'নীলফামারী'],
      MYMENSINGH: ['ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোনা'],
    },
    POSTAL_CODE_FORMAT: /^\d{4}$/,
  },

  // Default values
  DEFAULTS: {
    TYPE: 'shipping',
    STATUS: 'active',
    COUNTRY: 'BD',
    CITY: 'Dhaka',
    DIVISION: 'ঢাকা',
  },
} as const;

export type UserAddressType = (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
export type UserAddressStatus = (typeof USER_ADDRESS.STATUS)[keyof typeof USER_ADDRESS.STATUS];
export type UserAddressField = (typeof USER_ADDRESS.FIELDS)[keyof typeof USER_ADDRESS.FIELDS];
