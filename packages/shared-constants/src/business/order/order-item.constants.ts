export const ORDER_ITEM_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
} as const;

export const ORDER_ITEM_TYPE = {
  PRODUCT: 'product',
  SERVICE: 'service',
  DIGITAL: 'digital',
  BUNDLE: 'bundle',
  GIFT_CARD: 'gift_card',
} as const;

export const ORDER_ITEM_LIMIT = {
  MAX_QUANTITY: 999,
  MIN_QUANTITY: 1,
  MAX_ITEMS_PER_ORDER: 100,
  MAX_NOTES_LENGTH: 500,
  SKU_MAX_LENGTH: 64,
} as const;

export type OrderItemStatusType = (typeof ORDER_ITEM_STATUS)[keyof typeof ORDER_ITEM_STATUS];
export type OrderItemTypeType = (typeof ORDER_ITEM_TYPE)[keyof typeof ORDER_ITEM_TYPE];
