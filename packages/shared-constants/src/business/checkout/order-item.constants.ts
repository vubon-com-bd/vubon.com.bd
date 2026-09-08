import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { CART_ITEM } from '../cart/cart-item.constants';
import { VARIANT } from '../product/variant.constants';

export const ORDER_ITEM = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PACKED: 'packed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  CART_ITEM: { ...CART_ITEM },
  VARIANT: { ...VARIANT },
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
} as const;
