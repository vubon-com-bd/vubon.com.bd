/**
 * Attribute Constants
 * অ্যাট্রিবিউট সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const ATTRIBUTE = {
  // Attribute types (TYPES থেকে ম্যাপিং)
  TYPES: {
    TEXT: TYPES.TEXT || 'text',
    NUMBER: TYPES.NUMBER || 'number',
    BOOLEAN: TYPES.BOOLEAN || 'boolean',
    DATE: TYPES.DATE || 'date',
    DATETIME: TYPES.DATETIME || 'datetime',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
    COLOR: 'color',
    SIZE: 'size',
    WEIGHT: 'weight',
    DIMENSION: 'dimension',
    FILE: 'file',
    IMAGE: 'image',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
  },

  // Attribute groups
  GROUPS: {
    BASIC: 'basic',
    TECHNICAL: 'technical',
    SHIPPING: 'shipping',
    MARKETING: 'marketing',
    SELLER: 'seller',
    CUSTOM: 'custom',
  },

  // Validation rules
  VALIDATION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 255,
    MIN_VALUE: 0,
    MAX_VALUE: 999999,
    MAX_FILE_SIZE: 5242880, // 5MB
  },
} as const;

export type AttributeType = (typeof ATTRIBUTE.TYPES)[keyof typeof ATTRIBUTE.TYPES];
export type AttributeGroup = (typeof ATTRIBUTE.GROUPS)[keyof typeof ATTRIBUTE.GROUPS];

export const ATTRIBUTE_TYPES = ATTRIBUTE.TYPES;
export const ATTRIBUTE_GROUPS = ATTRIBUTE.GROUPS;
