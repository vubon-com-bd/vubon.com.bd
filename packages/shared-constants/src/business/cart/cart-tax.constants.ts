import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { TAX as COMMON_TAX } from '../../common/tax.constants';
import { PRODUCT_TYPES } from '../product/product-type.constants';
import { CURRENCY } from '../../common/currency.constants';

export const CART_TAX = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMON_TAX,
    VAT: 'vat',
    GST: 'gst',
    SALES_TAX: 'sales_tax',
    CUSTOMS: 'customs',
    SERVICE_TAX: 'service_tax',
  },
  PRODUCT_TYPES: { ...PRODUCT_TYPES },
  CURRENCY: { ...CURRENCY },
  DEFAULT_TAX_RATE: 0.15,
  TAX_EXEMPT_THRESHOLD: 1000,
  TAX_INCLUSIVE: true,
  TAX_EXCLUSIVE: false,
} as const;
