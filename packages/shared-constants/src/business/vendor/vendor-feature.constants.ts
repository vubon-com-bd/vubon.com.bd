import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const VENDOR_FEATURE = {
  TYPES: {
    ...COMMON_TYPES,
    STORE_FRONT: 'store_front',
    PRODUCT_MANAGEMENT: 'product_management',
    ORDER_MANAGEMENT: 'order_management',
    ANALYTICS: 'analytics',
    MARKETING: 'marketing',
    SUPPORT: 'support',
    API_ACCESS: 'api_access',
    CUSTOM_BRANDING: 'custom_branding',
    WHITE_LABEL: 'white_label',
    BULK_IMPORT: 'bulk_import',
    ADVANCED_REPORTING: 'advanced_reporting',
  },
  FEATURE_STATUS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    COMING_SOON: 'coming_soon',
    BETA: 'beta',
  },
  FEATURE_DEPENDENCIES: {
    white_label: ['custom_branding'],
    bulk_import: ['product_management'],
    advanced_reporting: ['analytics'],
  },
} as const;
