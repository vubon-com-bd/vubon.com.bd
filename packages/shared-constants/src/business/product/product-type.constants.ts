/**
 * Product Type Constants (EXTENDS common/types)
 * @module shared-constants/business/product/product-type.constants
 */

import { TYPES } from '../../common/types.constants';

export const PRODUCT_TYPES = {
  // Base types from common
  ...TYPES,

  // Product specific types
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
  SUBSCRIPTION: 'subscription',
  VIRTUAL: 'virtual',
  DOWNLOADABLE: 'downloadable',
  TANGIBLE: 'tangible',
  INTANGIBLE: 'intangible',
  CONSUMABLE: 'consumable',
  DURABLE: 'durable',
  PERISHABLE: 'perishable',
  NON_PERISHABLE: 'non_perishable',
  SEASONAL: 'seasonal',
  LIMITED_EDITION: 'limited_edition',
  CUSTOM: 'custom',
  BUNDLE: 'bundle',
  KIT: 'kit',
  VARIANT: 'variant',
  PARENT: 'parent',
  CHILD: 'child',
  SIMPLE: 'simple',
  CONFIGURABLE: 'configurable',
  GROUPED: 'grouped',
  EXTERNAL: 'external',
} as const;

// টাইপের নাম পরিবর্তন করে আলাদা করা হয়েছে
export type ProductTypeValue = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  [PRODUCT_TYPES.STRING]: 'String',
  [PRODUCT_TYPES.NUMBER]: 'Number',
  [PRODUCT_TYPES.BOOLEAN]: 'Boolean',
  [PRODUCT_TYPES.NULL]: 'Null',
  [PRODUCT_TYPES.UNDEFINED]: 'Undefined',
  [PRODUCT_TYPES.SYMBOL]: 'Symbol',
  [PRODUCT_TYPES.BIGINT]: 'BigInt',
  [PRODUCT_TYPES.OBJECT]: 'Object',
  [PRODUCT_TYPES.ARRAY]: 'Array',
  [PRODUCT_TYPES.DATE]: 'Date',
  [PRODUCT_TYPES.REGEXP]: 'RegExp',
  [PRODUCT_TYPES.FUNCTION]: 'Function',
  [PRODUCT_TYPES.CLASS]: 'Class',
  [PRODUCT_TYPES.EMAIL]: 'Email',
  [PRODUCT_TYPES.PHONE]: 'Phone',
  [PRODUCT_TYPES.URL]: 'URL',
  [PRODUCT_TYPES.UUID]: 'UUID',
  [PRODUCT_TYPES.SLUG]: 'Slug',
  [PRODUCT_TYPES.PASSWORD]: 'Password',
  [PRODUCT_TYPES.TOKEN]: 'Token',
  [PRODUCT_TYPES.ID]: 'ID',
  [PRODUCT_TYPES.MONGODB_ID]: 'MongoDB ID',
  [PRODUCT_TYPES.POSTGRES_ID]: 'PostgreSQL ID',
  [PRODUCT_TYPES.MYSQL_ID]: 'MySQL ID',
  [PRODUCT_TYPES.FILE]: 'File',
  [PRODUCT_TYPES.IMAGE]: 'Image',
  [PRODUCT_TYPES.VIDEO]: 'Video',
  [PRODUCT_TYPES.AUDIO]: 'Audio',
  [PRODUCT_TYPES.DOCUMENT]: 'Document',
  [PRODUCT_TYPES.MONEY]: 'Money',
  [PRODUCT_TYPES.CURRENCY]: 'Currency',
  [PRODUCT_TYPES.PRICE]: 'Price',
  [PRODUCT_TYPES.TIMESTAMP]: 'Timestamp',
  [PRODUCT_TYPES.DATETIME]: 'DateTime',
  [PRODUCT_TYPES.TIME]: 'Time',
  [PRODUCT_TYPES.STATUS]: 'Status',
  [PRODUCT_TYPES.ENUM]: 'Enum',
  [PRODUCT_TYPES.UNION]: 'Union',
  [PRODUCT_TYPES.ADDRESS]: 'Address',
  [PRODUCT_TYPES.LOCATION]: 'Location',
  [PRODUCT_TYPES.GEO_POINT]: 'GeoPoint',
  [PRODUCT_TYPES.JSON]: 'JSON',
  [PRODUCT_TYPES.ANY]: 'Any',
  [PRODUCT_TYPES.UNKNOWN]: 'Unknown',
  [PRODUCT_TYPES.NEVER]: 'Never',
  [PRODUCT_TYPES.VOID]: 'Void',
  [PRODUCT_TYPES.PHYSICAL]: 'Physical',
  [PRODUCT_TYPES.DIGITAL]: 'Digital',
  [PRODUCT_TYPES.SERVICE]: 'Service',
  [PRODUCT_TYPES.SUBSCRIPTION]: 'Subscription',
  [PRODUCT_TYPES.VIRTUAL]: 'Virtual',
  [PRODUCT_TYPES.DOWNLOADABLE]: 'Downloadable',
  [PRODUCT_TYPES.TANGIBLE]: 'Tangible',
  [PRODUCT_TYPES.INTANGIBLE]: 'Intangible',
  [PRODUCT_TYPES.CONSUMABLE]: 'Consumable',
  [PRODUCT_TYPES.DURABLE]: 'Durable',
  [PRODUCT_TYPES.PERISHABLE]: 'Perishable',
  [PRODUCT_TYPES.NON_PERISHABLE]: 'Non-Perishable',
  [PRODUCT_TYPES.SEASONAL]: 'Seasonal',
  [PRODUCT_TYPES.LIMITED_EDITION]: 'Limited Edition',
  [PRODUCT_TYPES.CUSTOM]: 'Custom',
  [PRODUCT_TYPES.BUNDLE]: 'Bundle',
  [PRODUCT_TYPES.KIT]: 'Kit',
  [PRODUCT_TYPES.VARIANT]: 'Variant',
  [PRODUCT_TYPES.PARENT]: 'Parent Product',
  [PRODUCT_TYPES.CHILD]: 'Child Product',
  [PRODUCT_TYPES.SIMPLE]: 'Simple Product',
  [PRODUCT_TYPES.CONFIGURABLE]: 'Configurable Product',
  [PRODUCT_TYPES.GROUPED]: 'Grouped Product',
  [PRODUCT_TYPES.EXTERNAL]: 'External Product',
};

export const PRODUCT_TYPE_GROUPS = {
  PHYSICAL_TYPES: [
    PRODUCT_TYPES.PHYSICAL,
    PRODUCT_TYPES.TANGIBLE,
    PRODUCT_TYPES.DURABLE,
    PRODUCT_TYPES.CONSUMABLE,
    PRODUCT_TYPES.PERISHABLE,
    PRODUCT_TYPES.NON_PERISHABLE,
  ] as const,

  DIGITAL_TYPES: [
    PRODUCT_TYPES.DIGITAL,
    PRODUCT_TYPES.VIRTUAL,
    PRODUCT_TYPES.DOWNLOADABLE,
    PRODUCT_TYPES.INTANGIBLE,
  ] as const,

  SERVICE_TYPES: [PRODUCT_TYPES.SERVICE, PRODUCT_TYPES.SUBSCRIPTION] as const,

  COMPLEX_TYPES: [
    PRODUCT_TYPES.BUNDLE,
    PRODUCT_TYPES.KIT,
    PRODUCT_TYPES.CONFIGURABLE,
    PRODUCT_TYPES.GROUPED,
    PRODUCT_TYPES.PARENT,
    PRODUCT_TYPES.CHILD,
    PRODUCT_TYPES.VARIANT,
  ] as const,

  SIMPLE_TYPES: [PRODUCT_TYPES.SIMPLE, PRODUCT_TYPES.EXTERNAL] as const,

  SPECIAL_TYPES: [
    PRODUCT_TYPES.SEASONAL,
    PRODUCT_TYPES.LIMITED_EDITION,
    PRODUCT_TYPES.CUSTOM,
  ] as const,
} as const;
