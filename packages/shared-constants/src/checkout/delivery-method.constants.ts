// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum DeliveryMethod {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  SAME_DAY = 'SAME_DAY',
  NEXT_DAY = 'NEXT_DAY',
  PICKUP = 'PICKUP',
}

export const DELIVERY_METHOD_META = {
  [DeliveryMethod.STANDARD]: {
    name: 'স্ট্যান্ডার্ড ডেলিভারি',
    description: 'সাধারণ ডেলিভারি, ২-৪ কর্মদিবস',
    icon: '🚚',
    emoji: '🚚',
    deliveryTimeHours: 72,
    deliveryCharge: 60,
    freeDeliveryMinAmount: 500,
    estimatedDays: '২-৪ দিন',
    available: true,
  },
  [DeliveryMethod.EXPRESS]: {
    name: 'এক্সপ্রেস ডেলিভারি',
    description: 'দ্রুত ডেলিভারি, ১-২ কর্মদিবস',
    icon: '⚡',
    emoji: '⚡',
    deliveryTimeHours: 24,
    deliveryCharge: 120,
    freeDeliveryMinAmount: 1000,
    estimatedDays: '১-২ দিন',
    available: true,
  },
  [DeliveryMethod.SAME_DAY]: {
    name: 'সেইম ডে ডেলিভারি',
    description: 'একই দিনে ডেলিভারি (ঢাকা শহরের মধ্যে)',
    icon: '🏃',
    emoji: '🏃',
    deliveryTimeHours: 8,
    deliveryCharge: 200,
    freeDeliveryMinAmount: 2000,
    estimatedDays: 'আজকেই',
    available: true,
  },
  [DeliveryMethod.NEXT_DAY]: {
    name: 'নেক্সট ডে ডেলিভারি',
    description: 'পরের দিন ডেলিভারি',
    icon: '📅',
    emoji: '📅',
    deliveryTimeHours: 16,
    deliveryCharge: 150,
    freeDeliveryMinAmount: 1500,
    estimatedDays: 'পরের দিন',
    available: true,
  },
  [DeliveryMethod.PICKUP]: {
    name: 'স্টোর থেকে নিয়ে নিন',
    description: 'আমাদের স্টোর থেকে পণ্য সংগ্রহ করুন',
    icon: '🏪',
    emoji: '🏪',
    deliveryTimeHours: 0,
    deliveryCharge: 0,
    freeDeliveryMinAmount: 0,
    estimatedDays: 'যেকোনো সময়',
    available: true,
  },
} as const;

export type DeliveryMethodMeta = typeof DELIVERY_METHOD_META;

export const DELIVERY_METHOD_ORDER = [
  DeliveryMethod.STANDARD,
  DeliveryMethod.EXPRESS,
  DeliveryMethod.SAME_DAY,
  DeliveryMethod.NEXT_DAY,
  DeliveryMethod.PICKUP,
] as const;

export type DeliveryMethodOrder = typeof DELIVERY_METHOD_ORDER;

export const DELIVERY_METHOD_PRICE_MAP: Record<DeliveryMethod, number> = {
  [DeliveryMethod.STANDARD]: DELIVERY_METHOD_META[DeliveryMethod.STANDARD].deliveryCharge,
  [DeliveryMethod.EXPRESS]: DELIVERY_METHOD_META[DeliveryMethod.EXPRESS].deliveryCharge,
  [DeliveryMethod.SAME_DAY]: DELIVERY_METHOD_META[DeliveryMethod.SAME_DAY].deliveryCharge,
  [DeliveryMethod.NEXT_DAY]: DELIVERY_METHOD_META[DeliveryMethod.NEXT_DAY].deliveryCharge,
  [DeliveryMethod.PICKUP]: DELIVERY_METHOD_META[DeliveryMethod.PICKUP].deliveryCharge,
} as const;

export type DeliveryMethodPriceMap = typeof DELIVERY_METHOD_PRICE_MAP;

export const DELIVERY_METHOD_FREE_MIN_AMOUNT: Record<DeliveryMethod, number> = {
  [DeliveryMethod.STANDARD]: DELIVERY_METHOD_META[DeliveryMethod.STANDARD].freeDeliveryMinAmount,
  [DeliveryMethod.EXPRESS]: DELIVERY_METHOD_META[DeliveryMethod.EXPRESS].freeDeliveryMinAmount,
  [DeliveryMethod.SAME_DAY]: DELIVERY_METHOD_META[DeliveryMethod.SAME_DAY].freeDeliveryMinAmount,
  [DeliveryMethod.NEXT_DAY]: DELIVERY_METHOD_META[DeliveryMethod.NEXT_DAY].freeDeliveryMinAmount,
  [DeliveryMethod.PICKUP]: DELIVERY_METHOD_META[DeliveryMethod.PICKUP].freeDeliveryMinAmount,
} as const;

export type DeliveryMethodFreeMinAmount = typeof DELIVERY_METHOD_FREE_MIN_AMOUNT;

export function getDeliveryMethodName(method: DeliveryMethod): string {
  return DELIVERY_METHOD_META[method].name;
}

export function getDeliveryMethodDescription(method: DeliveryMethod): string {
  return DELIVERY_METHOD_META[method].description;
}

export function getDeliveryMethodIcon(method: DeliveryMethod): string {
  return DELIVERY_METHOD_META[method].icon;
}

export function getDeliveryMethodCharge(method: DeliveryMethod): number {
  return DELIVERY_METHOD_META[method].deliveryCharge;
}

export function getDeliveryMethodTime(method: DeliveryMethod): number {
  return DELIVERY_METHOD_META[method].deliveryTimeHours;
}

export function getDeliveryMethodFreeMinAmount(method: DeliveryMethod): number {
  return DELIVERY_METHOD_META[method].freeDeliveryMinAmount;
}

export function isDeliveryMethodAvailable(method: DeliveryMethod): boolean {
  return DELIVERY_METHOD_META[method].available;
}

export function isFreeDeliveryEligible(method: DeliveryMethod, orderAmount: number): boolean {
  const minAmount = getDeliveryMethodFreeMinAmount(method);
  return minAmount > 0 && orderAmount >= minAmount;
}

export function calculateDeliveryCharge(method: DeliveryMethod, orderAmount: number): number {
  if (isFreeDeliveryEligible(method, orderAmount)) {
    return 0;
  }
  return getDeliveryMethodCharge(method);
}
