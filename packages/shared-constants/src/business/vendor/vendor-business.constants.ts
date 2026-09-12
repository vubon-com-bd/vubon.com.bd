import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VENDOR_TYPE } from './vendor-type.constants';

export const VENDOR_BUSINESS = {
  TYPES: {
    ...COMMON_TYPES,
    SOLE_PROPRIETORSHIP: 'sole_proprietorship',
    PARTNERSHIP: 'partnership',
    LLC: 'llc',
    CORPORATION: 'corporation',
    COOPERATIVE: 'cooperative',
  },
  VENDOR_TYPE: { ...VENDOR_TYPE },
  BUSINESS_SECTORS: [
    'retail',
    'wholesale',
    'manufacturing',
    'services',
    'digital_products',
    'handmade',
    'agriculture',
    'food',
    'fashion',
    'electronics',
  ],
  BUSINESS_SIZE: {
    MICRO: '1-10',
    SMALL: '11-50',
    MEDIUM: '51-200',
    LARGE: '201-1000',
    ENTERPRISE: '1000+',
  },
  MAX_CATEGORIES: 20,
  MAX_PRODUCTS: 10000,
} as const;
