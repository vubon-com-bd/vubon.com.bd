import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const PRODUCT_TYPES = {
  ...COMMON_TYPES,
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
  SUBSCRIPTION: 'subscription',
  BUNDLE: 'bundle',
} as const;
