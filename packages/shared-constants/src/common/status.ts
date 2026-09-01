/**
 * Status Codes
 * বাংলাদেশের কনটেক্সট অনুযায়ী সাধারণ স্ট্যাটাস কোড
 */
export const STATUS = {
  // User status
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DELETED: 'deleted',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',

  // Order status
  ORDER_PENDING: 'pending',
  ORDER_PROCESSING: 'processing',
  ORDER_CONFIRMED: 'confirmed',
  ORDER_SHIPPED: 'shipped',
  ORDER_DELIVERED: 'delivered',
  ORDER_CANCELLED: 'cancelled',
  ORDER_RETURNED: 'returned',
  ORDER_REFUNDED: 'refunded',

  // Payment status
  PAYMENT_PENDING: 'pending',
  PAYMENT_PROCESSING: 'processing',
  PAYMENT_COMPLETED: 'completed',
  PAYMENT_FAILED: 'failed',
  PAYMENT_CANCELLED: 'cancelled',
  PAYMENT_REFUNDED: 'refunded',
  PAYMENT_PARTIAL_REFUNDED: 'partial_refunded',

  // Delivery status (Bangladesh specific)
  DELIVERY_PENDING: 'pending',
  DELIVERY_PICKED: 'picked',
  DELIVERY_IN_TRANSIT: 'in_transit',
  DELIVERY_OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERY_ATTEMPTED: 'attempted',
  DELIVERY_DELIVERED: 'delivered',
  DELIVERY_FAILED: 'failed',
  DELIVERY_RETURNED: 'returned',

  // Product status
  PRODUCT_DRAFT: 'draft',
  PRODUCT_PUBLISHED: 'published',
  PRODUCT_OUT_OF_STOCK: 'out_of_stock',
  PRODUCT_DISCONTINUED: 'discontinued',
  PRODUCT_PENDING_APPROVAL: 'pending_approval',
  PRODUCT_REJECTED: 'rejected',

  // Payment gateway status (Bangladesh)
  GATEWAY_SUCCESS: 'success',
  GATEWAY_FAILED: 'failed',
  GATEWAY_PENDING: 'pending',
  GATEWAY_CANCELLED: 'cancelled',
  GATEWAY_INVALID: 'invalid',
  GATEWAY_VALID: 'valid',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
export type UserStatus =
  | typeof STATUS.ACTIVE
  | typeof STATUS.INACTIVE
  | typeof STATUS.PENDING
  | typeof STATUS.DELETED
  | typeof STATUS.SUSPENDED;
export type OrderStatus =
  | typeof STATUS.ORDER_PENDING
  | typeof STATUS.ORDER_PROCESSING
  | typeof STATUS.ORDER_CONFIRMED
  | typeof STATUS.ORDER_SHIPPED
  | typeof STATUS.ORDER_DELIVERED
  | typeof STATUS.ORDER_CANCELLED;
export type PaymentStatus =
  | typeof STATUS.PAYMENT_PENDING
  | typeof STATUS.PAYMENT_PROCESSING
  | typeof STATUS.PAYMENT_COMPLETED
  | typeof STATUS.PAYMENT_FAILED
  | typeof STATUS.PAYMENT_CANCELLED;
