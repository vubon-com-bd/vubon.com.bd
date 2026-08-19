// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum PaymentErrorCode {
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  INVALID_CARD = 'INVALID_CARD',
  EXPIRED_CARD = 'EXPIRED_CARD',
  GATEWAY_ERROR = 'GATEWAY_ERROR',
  TRANSACTION_DECLINED = 'TRANSACTION_DECLINED',
  REFUND_FAILED = 'REFUND_FAILED',
  CARD_LIMIT_EXCEEDED = 'CARD_LIMIT_EXCEEDED',
  INCORRECT_CVV = 'INCORRECT_CVV',
  INCORRECT_PIN = 'INCORRECT_PIN',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  DUPLICATE_TRANSACTION = 'DUPLICATE_TRANSACTION',
  PAYMENT_METHOD_NOT_SUPPORTED = 'PAYMENT_METHOD_NOT_SUPPORTED',
}

export const PAYMENT_ERROR_META = {
  [PaymentErrorCode.INSUFFICIENT_BALANCE]: {
    messageTemplate: 'আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই।',
    userFriendlyMessage: 'ব্যালেন্স কম, দয়া করে টাকা যোগ করুন',
    gatewaySpecificCodes: ['101', 'INSUFFICIENT_FUNDS'] as const,
    recoveryAction: 'Add funds to your account or use another payment method.',
    statusCode: 402,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
  [PaymentErrorCode.INVALID_CARD]: {
    messageTemplate: 'কার্ড নম্বর সঠিক নয়। দয়া করে সঠিক কার্ড নম্বর দিন।',
    userFriendlyMessage: 'কার্ড নম্বর সঠিক নয়',
    gatewaySpecificCodes: ['102', 'INVALID_CARD_NUMBER'] as const,
    recoveryAction: 'Verify card number and re-enter.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.EXPIRED_CARD]: {
    messageTemplate: 'কার্ডটির মেয়াদ শেষ হয়ে গেছে। দয়া করে নতুন কার্ড ব্যবহার করুন।',
    userFriendlyMessage: 'কার্ডের মেয়াদ শেষ',
    gatewaySpecificCodes: ['103', 'EXPIRED_CARD'] as const,
    recoveryAction: 'Use a valid card or update card details.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
  [PaymentErrorCode.GATEWAY_ERROR]: {
    messageTemplate: 'পেমেন্ট গেটওয়ে ত্রুটির কারণে লেনদেন ব্যর্থ হয়েছে।',
    userFriendlyMessage: 'পেমেন্ট গেটওয়ে সমস্যা',
    gatewaySpecificCodes: ['501', 'GATEWAY_ERROR'] as const,
    recoveryAction: 'Try again later or use a different payment method.',
    statusCode: 503,
    category: 'SERVER_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.TRANSACTION_DECLINED]: {
    messageTemplate: 'লেনদেনটি ব্যাংক কর্তৃক বাতিল করা হয়েছে।',
    userFriendlyMessage: 'লেনদেন বাতিল করা হয়েছে',
    gatewaySpecificCodes: ['104', 'DECLINED'] as const,
    recoveryAction: 'Contact your bank or use another payment method.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
  [PaymentErrorCode.REFUND_FAILED]: {
    messageTemplate: 'রিফান্ড প্রক্রিয়া ব্যর্থ হয়েছে। দয়া করে সহায়তা কেন্দ্রে যোগাযোগ করুন।',
    userFriendlyMessage: 'রিফান্ড ব্যর্থ হয়েছে',
    gatewaySpecificCodes: ['502', 'REFUND_ERROR'] as const,
    recoveryAction: 'Contact customer support for assistance.',
    statusCode: 500,
    category: 'SERVER_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.CARD_LIMIT_EXCEEDED]: {
    messageTemplate: 'কার্ড লিমিট অতিক্রম করা হয়েছে।',
    userFriendlyMessage: 'কার্ড লিমিট অতিক্রম',
    gatewaySpecificCodes: ['105', 'LIMIT_EXCEEDED'] as const,
    recoveryAction: 'Use another card or reduce transaction amount.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
  [PaymentErrorCode.INCORRECT_CVV]: {
    messageTemplate: 'সিভিভি কোড সঠিক নয়। দয়া করে সঠিক সিভিভি দিন।',
    userFriendlyMessage: 'সিভিভি কোড সঠিক নয়',
    gatewaySpecificCodes: ['106', 'INVALID_CVV'] as const,
    recoveryAction: 'Re-enter CVV correctly.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.INCORRECT_PIN]: {
    messageTemplate: 'পিন কোড সঠিক নয়। দয়া করে সঠিক পিন দিন।',
    userFriendlyMessage: 'পিন কোড সঠিক নয়',
    gatewaySpecificCodes: ['107', 'INVALID_PIN'] as const,
    recoveryAction: 'Re-enter PIN correctly.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.GATEWAY_TIMEOUT]: {
    messageTemplate: 'পেমেন্ট গেটওয়ে সময় অতিক্রম করেছে। দয়া করে পুনরায় চেষ্টা করুন।',
    userFriendlyMessage: 'গেটওয়ে টাইমআউট',
    gatewaySpecificCodes: ['504', 'TIMEOUT'] as const,
    recoveryAction: 'Retry payment after some time.',
    statusCode: 504,
    category: 'NETWORK_ERROR' as const,
    retryable: true,
  },
  [PaymentErrorCode.DUPLICATE_TRANSACTION]: {
    messageTemplate: 'এই লেনদেনটি ইতিমধ্যে প্রক্রিয়াকরণ করা হয়েছে।',
    userFriendlyMessage: 'ডুপ্লিকেট লেনদেন',
    gatewaySpecificCodes: ['409', 'DUPLICATE'] as const,
    recoveryAction: 'Check transaction history before retrying.',
    statusCode: 409,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
  [PaymentErrorCode.PAYMENT_METHOD_NOT_SUPPORTED]: {
    messageTemplate: 'এই পেমেন্ট পদ্ধতি সাপোর্টেড নয়। দয়া করে অন্য পদ্ধতি ব্যবহার করুন।',
    userFriendlyMessage: 'পেমেন্ট পদ্ধতি সাপোর্টেড নয়',
    gatewaySpecificCodes: ['400', 'METHOD_NOT_SUPPORTED'] as const,
    recoveryAction: 'Choose a supported payment method.',
    statusCode: 400,
    category: 'CLIENT_ERROR' as const,
    retryable: false,
  },
} as const;

export type PaymentErrorMeta = typeof PAYMENT_ERROR_META;
export type PaymentErrorCategory = 'CLIENT_ERROR' | 'SERVER_ERROR' | 'NETWORK_ERROR';

export function getPaymentErrorMessage(errorCode: PaymentErrorCode): string {
  return PAYMENT_ERROR_META[errorCode].messageTemplate;
}

export function getPaymentUserFriendlyMessage(errorCode: PaymentErrorCode): string {
  return PAYMENT_ERROR_META[errorCode].userFriendlyMessage;
}

export function getPaymentGatewayCodes(errorCode: PaymentErrorCode): readonly string[] {
  return PAYMENT_ERROR_META[errorCode].gatewaySpecificCodes;
}

export function getPaymentRecoveryAction(errorCode: PaymentErrorCode): string {
  return PAYMENT_ERROR_META[errorCode].recoveryAction;
}

export function getPaymentErrorStatusCode(errorCode: PaymentErrorCode): number {
  return PAYMENT_ERROR_META[errorCode].statusCode;
}

export function getPaymentErrorCategory(errorCode: PaymentErrorCode): PaymentErrorCategory {
  return PAYMENT_ERROR_META[errorCode].category;
}

export function isPaymentErrorRetryable(errorCode: PaymentErrorCode): boolean {
  return PAYMENT_ERROR_META[errorCode].retryable;
}

export function isPaymentClientError(errorCode: PaymentErrorCode): boolean {
  return PAYMENT_ERROR_META[errorCode].category === 'CLIENT_ERROR';
}

export function isPaymentServerError(errorCode: PaymentErrorCode): boolean {
  return PAYMENT_ERROR_META[errorCode].category === 'SERVER_ERROR';
}

export function isPaymentNetworkError(errorCode: PaymentErrorCode): boolean {
  return PAYMENT_ERROR_META[errorCode].category === 'NETWORK_ERROR';
}

export function getGatewayErrorCode(errorCode: PaymentErrorCode, _gateway: string): string | null {
  const codes = PAYMENT_ERROR_META[errorCode].gatewaySpecificCodes;
  return codes.length > 0 ? codes[0] : null;
}
