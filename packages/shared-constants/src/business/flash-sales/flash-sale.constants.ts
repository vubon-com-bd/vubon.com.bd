/**
 * Flash Sale Main Constants
 * @module shared-constants/business/flash-sales/flash-sale.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ROLES } from '../../common/roles.constants';
import { SESSION } from '../../common/session.constants';
import { SECURITY } from '../../common/security.constants';

export const FLASH_SALE = {
  // Flash sale status from common
  STATUS: STATUS,

  // Flash sale types from common
  TYPES: TYPES,

  // Flash sale currency from common
  CURRENCY: CURRENCY,

  // Flash sale tax from common
  TAX: TAX,

  // Flash sale discount from common
  DISCOUNT: DISCOUNT,

  // Flash sale verification from common
  VERIFICATION: VERIFICATION,

  // Flash sale permissions from common
  PERMISSIONS: PERMISSIONS,

  // Flash sale roles from common
  ROLES: ROLES,

  // Flash sale session from common
  SESSION: SESSION,

  // Flash sale security from common
  SECURITY: SECURITY,

  // Flash sale specific
  DEFAULT_FLASH_SALE_STATUS: 'pending',
  FLASH_SALE_CACHE_TTL: 3600,
  MAX_FLASH_SALE_PRODUCTS: 100,
  MIN_FLASH_SALE_PRODUCTS: 1,
  MAX_FLASH_SALE_DISCOUNT: 90,
  MIN_FLASH_SALE_DISCOUNT: 0,
  FLASH_SALE_DURATION_MINUTES: 60,
  MAX_FLASH_SALE_EXTENSIONS: 3,
  FLASH_SALE_PREPARE_TIME_MINUTES: 30,

  // Flash sale status values
  FLASH_SALE_STATUS_VALUES: {
    PENDING: 'pending',
    UPCOMING: 'upcoming',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
  } as const,

  // Flash sale type
  FLASH_SALE_TYPE: {
    REGULAR: 'regular',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    SPECIAL: 'special',
    URGENT: 'urgent',
  } as const,
} as const;

export type FlashSaleStatusValue =
  (typeof FLASH_SALE.FLASH_SALE_STATUS_VALUES)[keyof typeof FLASH_SALE.FLASH_SALE_STATUS_VALUES];
export type FlashSaleType =
  (typeof FLASH_SALE.FLASH_SALE_TYPE)[keyof typeof FLASH_SALE.FLASH_SALE_TYPE];
