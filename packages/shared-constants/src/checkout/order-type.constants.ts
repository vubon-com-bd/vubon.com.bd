// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum OrderType {
  REGULAR = 'REGULAR',
  PRE_ORDER = 'PRE_ORDER',
  SUBSCRIPTION = 'SUBSCRIPTION',
  BULK = 'BULK',
  WHOLESALE = 'WHOLESALE',
  GIFT = 'GIFT',
}

export const ORDER_TYPE_META = {
  [OrderType.REGULAR]: {
    description: 'সাধারণ অর্ডার, স্টক থেকে সরাসরি সরবরাহ',
    icon: 'shopping-bag',
    features: {
      immediateDelivery: true,
      requiresPrePayment: false,
      deliveryTimeDays: '২-৪ দিন',
      minimumOrderQuantity: 1,
      discountEligible: true,
      returnEligible: true,
      subscriptionEligible: false,
    },
  },
  [OrderType.PRE_ORDER]: {
    description: 'প্রি-অর্ডার, পণ্য উৎপাদন বা সরবরাহের আগে অর্ডার',
    icon: 'calendar',
    features: {
      immediateDelivery: false,
      requiresPrePayment: true,
      deliveryTimeDays: '১৫-৩০ দিন',
      minimumOrderQuantity: 1,
      discountEligible: false,
      returnEligible: false,
      subscriptionEligible: false,
    },
  },
  [OrderType.SUBSCRIPTION]: {
    description: 'সাবস্ক্রিপশন অর্ডার, নিয়মিত ডেলিভারি',
    icon: 'refresh',
    features: {
      immediateDelivery: true,
      requiresPrePayment: false,
      deliveryTimeDays: '২-৪ দিন',
      minimumOrderQuantity: 1,
      discountEligible: true,
      returnEligible: true,
      subscriptionEligible: true,
    },
  },
  [OrderType.BULK]: {
    description: 'বাল্ক অর্ডার, প্রচুর পরিমাণে পণ্য ক্রয়',
    icon: 'boxes',
    features: {
      immediateDelivery: true,
      requiresPrePayment: true,
      deliveryTimeDays: '৩-৫ দিন',
      minimumOrderQuantity: 10,
      discountEligible: true,
      returnEligible: false,
      subscriptionEligible: false,
    },
  },
  [OrderType.WHOLESALE]: {
    description: 'হোলসেল অর্ডার, ব্যবসায়িক ক্রয়',
    icon: 'store',
    features: {
      immediateDelivery: true,
      requiresPrePayment: true,
      deliveryTimeDays: '২-৩ দিন',
      minimumOrderQuantity: 50,
      discountEligible: true,
      returnEligible: false,
      subscriptionEligible: false,
    },
  },
  [OrderType.GIFT]: {
    description: 'গিফট অর্ডার, উপহার হিসাবে পাঠানো',
    icon: 'gift',
    features: {
      immediateDelivery: true,
      requiresPrePayment: true,
      deliveryTimeDays: '২-৪ দিন',
      minimumOrderQuantity: 1,
      discountEligible: false,
      returnEligible: true,
      subscriptionEligible: false,
    },
  },
} as const;

export type OrderTypeMeta = typeof ORDER_TYPE_META;
export type OrderTypeFeatures = (typeof ORDER_TYPE_META)[OrderType]['features'];

export const ORDER_TYPE_ORDER = [
  OrderType.REGULAR,
  OrderType.PRE_ORDER,
  OrderType.SUBSCRIPTION,
  OrderType.BULK,
  OrderType.WHOLESALE,
  OrderType.GIFT,
] as const;

export type OrderTypeOrder = typeof ORDER_TYPE_ORDER;

export function getOrderTypeDescription(type: OrderType): string {
  return ORDER_TYPE_META[type].description;
}

export function getOrderTypeIcon(type: OrderType): string {
  return ORDER_TYPE_META[type].icon;
}

export function getOrderTypeFeatures(type: OrderType): OrderTypeFeatures {
  return ORDER_TYPE_META[type].features;
}

export function getOrderTypeDeliveryTime(type: OrderType): string {
  return ORDER_TYPE_META[type].features.deliveryTimeDays;
}

export function getOrderTypeMinimumQuantity(type: OrderType): number {
  return ORDER_TYPE_META[type].features.minimumOrderQuantity;
}

export function isImmediateDelivery(type: OrderType): boolean {
  return ORDER_TYPE_META[type].features.immediateDelivery;
}

export function requiresPrePayment(type: OrderType): boolean {
  return ORDER_TYPE_META[type].features.requiresPrePayment;
}

export function isDiscountEligible(type: OrderType): boolean {
  return ORDER_TYPE_META[type].features.discountEligible;
}

export function isReturnEligible(type: OrderType): boolean {
  return ORDER_TYPE_META[type].features.returnEligible;
}

export function isSubscriptionEligible(type: OrderType): boolean {
  return ORDER_TYPE_META[type].features.subscriptionEligible;
}

export function getOrderTypeByQuantity(quantity: number): OrderType {
  if (quantity >= 50) return OrderType.WHOLESALE;
  if (quantity >= 10) return OrderType.BULK;
  return OrderType.REGULAR;
}
