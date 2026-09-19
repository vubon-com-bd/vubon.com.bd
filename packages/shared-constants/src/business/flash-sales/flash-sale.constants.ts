import { FLASH_SALE_STATUS } from './flash-sale-status.constants';
import { FLASH_SALE_TYPE } from './flash-sale-type.constants';
import { DEAL, DEAL_TYPE } from './deal.constants';
import { DEAL_STATUS } from './deal-status.constants';
import { DEAL_DISCOUNT_TYPE } from './deal-discount-type.constants';
import { PRODUCT_DEAL_STATUS, PRODUCT_DEAL } from './product-deal.constants';
import { BUNDLE_DEAL_STATUS, BUNDLE_DEAL_TYPE, BUNDLE_DEAL } from './bundle-deal.constants';
import { FLASH_SALE_SCHEDULE, FLASH_SALE_RECURRENCE } from './flash-sale-schedule.constants';
import {
  FLASH_SALE_PARTICIPANT_TYPE,
  FLASH_SALE_PARTICIPANT_STATUS,
  FLASH_SALE_PARTICIPANT,
} from './flash-sale-participant.constants';
import {
  FLASH_SALE_INVENTORY_STATUS,
  FLASH_SALE_INVENTORY,
} from './flash-sale-inventory.constants';
import { FLASH_SALE_PRICE_TYPE, FLASH_SALE_PRICE } from './flash-sale-price.constants';
import { FLASH_SALE_COUPON_TYPE, FLASH_SALE_COUPON } from './flash-sale-coupon.constants';
import {
  FLASH_SALE_VOUCHER_TYPE,
  FLASH_SALE_VOUCHER_STATUS,
  FLASH_SALE_VOUCHER,
} from './flash-sale-voucher.constants';

export const FLASH_SALE_LIMIT = {
  MAX_PRODUCTS: 5000,
  MAX_PARTICIPANTS: 10000,
  MIN_DURATION_MINUTES: 15,
  MAX_DURATION_HOURS: 168,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 90,
  MAX_CONCURRENT_SALES: 50,
} as const;

export const FLASH_SALE = {
  TYPE: FLASH_SALE_TYPE,
  STATUS: FLASH_SALE_STATUS,
  LIMIT: FLASH_SALE_LIMIT,
  DEAL: {
    ...DEAL,
    TYPE: DEAL_TYPE,
  },
  DEAL_STATUS,
  DEAL_DISCOUNT_TYPE,
  PRODUCT_DEAL: {
    STATUS: PRODUCT_DEAL_STATUS,
    LIMIT: PRODUCT_DEAL,
  },
  BUNDLE_DEAL: {
    STATUS: BUNDLE_DEAL_STATUS,
    TYPE: BUNDLE_DEAL_TYPE,
    LIMIT: BUNDLE_DEAL,
  },
  SCHEDULE: FLASH_SALE_SCHEDULE,
  RECURRENCE: FLASH_SALE_RECURRENCE,
  PARTICIPANT: {
    TYPE: FLASH_SALE_PARTICIPANT_TYPE,
    STATUS: FLASH_SALE_PARTICIPANT_STATUS,
    LIMIT: FLASH_SALE_PARTICIPANT,
  },
  INVENTORY: {
    STATUS: FLASH_SALE_INVENTORY_STATUS,
    LIMIT: FLASH_SALE_INVENTORY,
  },
  PRICE: {
    TYPE: FLASH_SALE_PRICE_TYPE,
    LIMIT: FLASH_SALE_PRICE,
  },
  COUPON: {
    TYPE: FLASH_SALE_COUPON_TYPE,
    LIMIT: FLASH_SALE_COUPON,
  },
  VOUCHER: {
    TYPE: FLASH_SALE_VOUCHER_TYPE,
    STATUS: FLASH_SALE_VOUCHER_STATUS,
    LIMIT: FLASH_SALE_VOUCHER,
  },
} as const;

export type FlashSaleType = typeof FLASH_SALE;
