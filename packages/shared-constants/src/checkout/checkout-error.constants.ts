// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum CheckoutErrorCode {
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INVENTORY_UNAVAILABLE = 'INVENTORY_UNAVAILABLE',
  COUPON_EXPIRED = 'COUPON_EXPIRED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  MIN_ORDER_NOT_MET = 'MIN_ORDER_NOT_MET',
  MAX_ORDER_EXCEEDED = 'MAX_ORDER_EXCEEDED',
  SHIPPING_UNAVAILABLE = 'SHIPPING_UNAVAILABLE',
  DELIVERY_TIME_INVALID = 'DELIVERY_TIME_INVALID',
  CART_EMPTY = 'CART_EMPTY',
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  INVALID_PAYMENT_METHOD = 'INVALID_PAYMENT_METHOD',
}

export const CHECKOUT_ERROR_META = {
  [CheckoutErrorCode.INVALID_ADDRESS]: {
    messageTemplate: 'ঠিকানা সঠিক নয়। দয়া করে আপনার ঠিকানা যাচাই করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Please verify and update your shipping address.',
    userFriendlyMessage: 'ঠিকানাটি সঠিক নয়, দয়া করে পুনরায় চেষ্টা করুন',
    statusCode: 400,
  },
  [CheckoutErrorCode.PAYMENT_FAILED]: {
    messageTemplate: 'পেমেন্ট প্রক্রিয়া ব্যর্থ হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Try different payment method or retry payment.',
    userFriendlyMessage: 'পেমেন্ট ব্যর্থ হয়েছে, দয়া করে অন্য পদ্ধতিতে চেষ্টা করুন',
    statusCode: 402,
  },
  [CheckoutErrorCode.INVENTORY_UNAVAILABLE]: {
    messageTemplate: 'পণ্যের ইনভেন্টরি পর্যাপ্ত নয়। দয়া করে কম পরিমাণে অর্ডার করুন।',
    category: 'SERVER_ERROR',
    recoveryAction: 'Reduce quantity or remove unavailable items.',
    userFriendlyMessage: 'কিছু পণ্য এখন স্টকে নেই',
    statusCode: 409,
  },
  [CheckoutErrorCode.COUPON_EXPIRED]: {
    messageTemplate: 'কুপনটির মেয়াদ শেষ হয়ে গেছে।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Remove expired coupon or apply a valid one.',
    userFriendlyMessage: 'কুপনের মেয়াদ শেষ হয়ে গেছে',
    statusCode: 400,
  },
  [CheckoutErrorCode.SESSION_EXPIRED]: {
    messageTemplate: 'আপনার সেশনের মেয়াদ শেষ হয়েছে। দয়া করে পুনরায় লগইন করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Refresh the page and try again.',
    userFriendlyMessage: 'সেশন শেষ হয়ে গেছে, পুনরায় লগইন করুন',
    statusCode: 401,
  },
  [CheckoutErrorCode.MIN_ORDER_NOT_MET]: {
    messageTemplate: 'ন্যূনতম অর্ডার পরিমাণ পূরণ হয়নি। দয়া করে আরও পণ্য যোগ করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Add more items to meet minimum order amount.',
    userFriendlyMessage: 'অর্ডারের পরিমাণ কম, দয়া করে আরও পণ্য যোগ করুন',
    statusCode: 400,
  },
  [CheckoutErrorCode.MAX_ORDER_EXCEEDED]: {
    messageTemplate: 'সর্বোচ্চ অর্ডার পরিমাণ অতিক্রম করা হয়েছে।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Reduce order quantity to meet maximum limit.',
    userFriendlyMessage: 'অর্ডারের পরিমাণ অনেক বেশি',
    statusCode: 400,
  },
  [CheckoutErrorCode.SHIPPING_UNAVAILABLE]: {
    messageTemplate: 'আপনার এলাকায় ডেলিভারি সেবা উপলব্ধ নয়।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Choose a different delivery address or pickup option.',
    userFriendlyMessage: 'আপনার এলাকায় ডেলিভারি নেই',
    statusCode: 400,
  },
  [CheckoutErrorCode.DELIVERY_TIME_INVALID]: {
    messageTemplate: 'ডেলিভারি সময় সঠিক নয়। দয়া করে অন্য সময় নির্বাচন করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Select a valid delivery time slot.',
    userFriendlyMessage: 'ডেলিভারি সময় সঠিক নয়',
    statusCode: 400,
  },
  [CheckoutErrorCode.CART_EMPTY]: {
    messageTemplate: 'আপনার কার্ট খালি। দয়া করে পণ্য যোগ করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Add items to cart before proceeding.',
    userFriendlyMessage: 'কার্ট খালি, পণ্য যোগ করুন',
    statusCode: 400,
  },
  [CheckoutErrorCode.AUTHENTICATION_REQUIRED]: {
    messageTemplate: 'অর্ডার সম্পন্ন করতে লগইন প্রয়োজন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Login or create an account to continue.',
    userFriendlyMessage: 'অর্ডার করতে লগইন করুন',
    statusCode: 401,
  },
  [CheckoutErrorCode.INVALID_PAYMENT_METHOD]: {
    messageTemplate: 'পেমেন্ট পদ্ধতি সঠিক নয়। দয়া করে অন্য পদ্ধতি নির্বাচন করুন।',
    category: 'CLIENT_ERROR',
    recoveryAction: 'Choose a valid payment method.',
    userFriendlyMessage: 'পেমেন্ট পদ্ধতি সঠিক নয়',
    statusCode: 400,
  },
} as const;

export type CheckoutErrorMeta = typeof CHECKOUT_ERROR_META;
export type CheckoutErrorCategory = 'CLIENT_ERROR' | 'SERVER_ERROR' | 'NETWORK_ERROR';

export function getCheckoutErrorMessage(errorCode: CheckoutErrorCode): string {
  return CHECKOUT_ERROR_META[errorCode].messageTemplate;
}

export function getUserFriendlyMessage(errorCode: CheckoutErrorCode): string {
  return CHECKOUT_ERROR_META[errorCode].userFriendlyMessage;
}

export function getCheckoutErrorCategory(errorCode: CheckoutErrorCode): CheckoutErrorCategory {
  return CHECKOUT_ERROR_META[errorCode].category;
}

export function getCheckoutRecoveryAction(errorCode: CheckoutErrorCode): string {
  return CHECKOUT_ERROR_META[errorCode].recoveryAction;
}

export function getCheckoutErrorStatusCode(errorCode: CheckoutErrorCode): number {
  return CHECKOUT_ERROR_META[errorCode].statusCode;
}

export function isClientError(errorCode: CheckoutErrorCode): boolean {
  return CHECKOUT_ERROR_META[errorCode].category === 'CLIENT_ERROR';
}

export function isServerError(errorCode: CheckoutErrorCode): boolean {
  return CHECKOUT_ERROR_META[errorCode].category === 'SERVER_ERROR';
}
