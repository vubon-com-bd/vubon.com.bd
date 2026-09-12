import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_RETURN } from '../checkout/order-return.constants';

export const VENDOR_RETURN_POLICY = {
  TYPES: {
    ...COMMON_TYPES,
    ...ORDER_RETURN.TYPES,
    FULL_REFUND: 'full_refund',
    PARTIAL_REFUND: 'partial_refund',
    EXCHANGE: 'exchange',
    STORE_CREDIT: 'store_credit',
  },
  ORDER_RETURN: { ...ORDER_RETURN },
  RETURN_WINDOW_DAYS: {
    DEFAULT: 30,
    ELECTRONICS: 14,
    CLOTHING: 45,
    FOOD: 7,
    DIGITAL: 0,
  },
  RETURN_CONDITIONS: ['unused', 'original_packaging', 'tags_attached', 'proof_of_purchase'],
  RESTOCKING_FEE_PERCENTAGE: 10,
  RETURN_SHIPPING_COST: {
    CUSTOMER_PAYS: 'customer_pays',
    VENDOR_PAYS: 'vendor_pays',
  },
} as const;
