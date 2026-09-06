/**
 * Product Attribute Constants (EXTENDS common/types + common/status)
 * @module shared-constants/business/product/attribute.constants
 */

import { TYPES } from '../../common/types.constants';
import { STATUS } from '../../common/status.constants';
import { VERIFICATION } from '../../common/verification.constants';

export const PRODUCT_ATTRIBUTE = {
  // Base types from common
  ...TYPES,

  // Status from common
  STATUS: STATUS,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Attribute specific
  MAX_ATTRIBUTE_NAME_LENGTH: 100,
  MIN_ATTRIBUTE_NAME_LENGTH: 2,
  MAX_ATTRIBUTE_VALUE_LENGTH: 255,
  MAX_ATTRIBUTES_PER_PRODUCT: 50,
  MAX_ATTRIBUTE_OPTIONS: 100,
  ATTRIBUTE_CACHE_TTL: 3600,

  // Attribute types
  PRODUCT_ATTRIBUTE_TYPE: {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    DATE: 'date',
    DATETIME: 'datetime',
    COLOR: 'color',
    SIZE: 'size',
    WEIGHT: 'weight',
    DIMENSION: 'dimension',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
    JSON: 'json',
    FILE: 'file',
    IMAGE: 'image',
  } as const,

  // Attribute input types
  PRODUCT_ATTRIBUTE_INPUT: {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    DATE: 'date',
    DATETIME: 'datetime',
    COLOR: 'color',
    FILE: 'file',
    IMAGE: 'image',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
    RANGE: 'range',
    SLIDER: 'slider',
  } as const,

  // Attribute visibility
  PRODUCT_ATTRIBUTE_VISIBILITY: {
    PUBLIC: 'public',
    ADMIN: 'admin',
    SELLER: 'seller',
    HIDDEN: 'hidden',
    SEARCHABLE: 'searchable',
    FILTERABLE: 'filterable',
    SORTABLE: 'sortable',
  } as const,

  // Attribute validation
  PRODUCT_ATTRIBUTE_VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    MIN_LENGTH: 'min_length',
    MAX_LENGTH: 'max_length',
    MIN_VALUE: 'min_value',
    MAX_VALUE: 'max_value',
    PATTERN: 'pattern',
    CUSTOM: 'custom',
  } as const,

  // Attribute group
  PRODUCT_ATTRIBUTE_GROUP: {
    BASIC: 'basic',
    TECHNICAL: 'technical',
    PHYSICAL: 'physical',
    SHIPPING: 'shipping',
    MARKETING: 'marketing',
    SEARCH: 'search',
    CUSTOM: 'custom',
  } as const,
} as const;

export type ProductAttributeType =
  (typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_TYPE)[keyof typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_TYPE];
export type ProductAttributeInput =
  (typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_INPUT)[keyof typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_INPUT];
export type ProductAttributeVisibility =
  (typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_VISIBILITY)[keyof typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_VISIBILITY];
export type ProductAttributeValidation =
  (typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_VALIDATION)[keyof typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_VALIDATION];
export type ProductAttributeGroup =
  (typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_GROUP)[keyof typeof PRODUCT_ATTRIBUTE.PRODUCT_ATTRIBUTE_GROUP];
