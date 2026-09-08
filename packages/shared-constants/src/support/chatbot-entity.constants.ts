import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const CHATBOT_ENTITY = {
  TYPES: {
    ...COMMON_TYPES,
    ORDER_NUMBER: 'order_number',
    PRODUCT_NAME: 'product_name',
    PRODUCT_CATEGORY: 'product_category',
    VENDOR_NAME: 'vendor_name',
    CUSTOMER_NAME: 'customer_name',
    EMAIL: 'email',
    PHONE: 'phone',
    ADDRESS: 'address',
    DATE: 'date',
    TIME: 'time',
    AMOUNT: 'amount',
    QUANTITY: 'quantity',
    REASON: 'reason',
    STATUS: 'status',
    LOCATION: 'location',
  },
  ENTITY_PATTERNS: {
    ORDER_NUMBER: 'ORD-[A-Z0-9]{8}',
    EMAIL: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
    PHONE: '\\+?[0-9]{10,15}',
    AMOUNT: '[0-9]+(\.[0-9]{2})?',
  },
} as const;
