/**
 * Deal Constants (EXTENDS common/status + common/types + common/currency + common/discount + common/verification)
 * @module shared-constants/business/flash-sales/deal.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ROLES } from '../../common/roles.constants';
import { SECURITY } from '../../common/security.constants';

export const DEAL = {
  // Deal status from common
  STATUS: STATUS,

  // Deal types from common
  TYPES: TYPES,

  // Deal currency from common
  CURRENCY: CURRENCY,

  // Deal discount from common
  DISCOUNT: DISCOUNT,

  // Deal verification from common
  VERIFICATION: VERIFICATION,

  // Deal permissions from common
  PERMISSIONS: PERMISSIONS,

  // Deal roles from common
  ROLES: ROLES,

  // Deal security from common
  SECURITY: SECURITY,

  // Deal specific
  DEFAULT_DEAL_STATUS: 'pending',
  DEAL_CACHE_TTL: 3600,
  MAX_DEAL_PRODUCTS: 50,
  MIN_DEAL_PRODUCTS: 1,
  DEAL_DURATION_MINUTES: 60,

  // Deal status values
  DEAL_STATUS_VALUES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
  } as const,

  // Deal type
  DEAL_TYPE: {
    PRODUCT: 'product',
    BUNDLE: 'bundle',
    CATEGORY: 'category',
    BRAND: 'brand',
    STORE: 'store',
    CLEARANCE: 'clearance',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
  } as const,

  // Deal priority
  DEAL_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,
} as const;

export type DealStatusValue =
  (typeof DEAL.DEAL_STATUS_VALUES)[keyof typeof DEAL.DEAL_STATUS_VALUES];
export type DealType = (typeof DEAL.DEAL_TYPE)[keyof typeof DEAL.DEAL_TYPE];
export type DealPriority = (typeof DEAL.DEAL_PRIORITY)[keyof typeof DEAL.DEAL_PRIORITY];
