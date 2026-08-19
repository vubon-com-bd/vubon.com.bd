/**
 * ভেন্ডারের রিটার্ন পলিসি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিটার্ন পলিসি টাইপ অবজেক্ট
 */
export const ReturnPolicyType = {
  STANDARD: 'STANDARD',
  EXTENDED: 'EXTENDED',
  NO_RETURN: 'NO_RETURN',
  EXCHANGE_ONLY: 'EXCHANGE_ONLY',
  STORE_CREDIT: 'STORE_CREDIT',
} as const;

/**
 * রিটার্ন পলিসি টাইপ - ইউনিয়ন টাইপ
 */
export type ReturnPolicyTypeValue = (typeof ReturnPolicyType)[keyof typeof ReturnPolicyType];

/**
 * রিটার্ন উইন্ডো (দিন)
 */
export const ReturnWindow = {
  DAYS_7: 7,
  DAYS_14: 14,
  DAYS_30: 30,
  DAYS_45: 45,
  DAYS_60: 60,
  DAYS_90: 90,
} as const;

/**
 * রিটার্ন উইন্ডো - ইউনিয়ন টাইপ
 */
export type ReturnWindowValue = (typeof ReturnWindow)[keyof typeof ReturnWindow];

/**
 * রিটার্ন কন্ডিশন অবজেক্ট
 */
export const ReturnCondition = {
  NEW: 'NEW',
  UNUSED: 'UNUSED',
  ORIGINAL_PACKAGING: 'ORIGINAL_PACKAGING',
  UNOPENED: 'UNOPENED',
  QUALITY_ISSUE: 'QUALITY_ISSUE',
  WRONG_ITEM: 'WRONG_ITEM',
} as const;

/**
 * রিটার্ন কন্ডিশন - ইউনিয়ন টাইপ
 */
export type ReturnConditionValue = (typeof ReturnCondition)[keyof typeof ReturnCondition];

/**
 * রিফান্ড মেথড অবজেক্ট
 */
export const RefundMethod = {
  ORIGINAL_PAYMENT: 'ORIGINAL_PAYMENT',
  STORE_CREDIT: 'STORE_CREDIT',
  BANK_TRANSFER: 'BANK_TRANSFER',
  MOBILE_MONEY: 'MOBILE_MONEY',
} as const;

/**
 * রিফান্ড মেথড - ইউনিয়ন টাইপ
 */
export type RefundMethodValue = (typeof RefundMethod)[keyof typeof RefundMethod];

/**
 * রিটার্ন শিপিং কস্ট
 */
export const ReturnShippingCost = {
  PAID_BY_SELLER: 'PAID_BY_SELLER',
  PAID_BY_BUYER: 'PAID_BY_BUYER',
  FREE: 'FREE',
} as const;

/**
 * রিটার্ন শিপিং কস্ট - ইউনিয়ন টাইপ
 */
export type ReturnShippingCostValue = (typeof ReturnShippingCost)[keyof typeof ReturnShippingCost];

/**
 * রিটার্ন স্ট্যাটাস অবজেক্ট
 */
export const ReturnStatus = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  IN_TRANSIT: 'IN_TRANSIT',
  REFUNDED: 'REFUNDED',
  COMPLETED: 'COMPLETED',
} as const;

/**
 * রিটার্ন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ReturnStatusValue = (typeof ReturnStatus)[keyof typeof ReturnStatus];

/**
 * রিটার্ন পলিসি টাইপ লেবেলসমূহ
 */
export const ReturnPolicyTypeLabels: Record<ReturnPolicyTypeValue, { en: string; bn: string }> = {
  [ReturnPolicyType.STANDARD]: {
    en: 'Standard Return',
    bn: 'স্ট্যান্ডার্ড রিটার্ন',
  },
  [ReturnPolicyType.EXTENDED]: {
    en: 'Extended Return',
    bn: 'বর্ধিত রিটার্ন',
  },
  [ReturnPolicyType.NO_RETURN]: {
    en: 'No Return',
    bn: 'কোন রিটার্ন নেই',
  },
  [ReturnPolicyType.EXCHANGE_ONLY]: {
    en: 'Exchange Only',
    bn: 'শুধু বিনিময়',
  },
  [ReturnPolicyType.STORE_CREDIT]: {
    en: 'Store Credit',
    bn: 'স্টোর ক্রেডিট',
  },
};

/**
 * রিটার্ন কন্ডিশন লেবেলসমূহ
 */
export const ReturnConditionLabels: Record<ReturnConditionValue, { en: string; bn: string }> = {
  [ReturnCondition.NEW]: {
    en: 'New Condition',
    bn: 'নতুন অবস্থা',
  },
  [ReturnCondition.UNUSED]: {
    en: 'Unused',
    bn: 'অব্যবহৃত',
  },
  [ReturnCondition.ORIGINAL_PACKAGING]: {
    en: 'Original Packaging',
    bn: 'মূল প্যাকেজিং',
  },
  [ReturnCondition.UNOPENED]: {
    en: 'Unopened',
    bn: 'অখোলা',
  },
  [ReturnCondition.QUALITY_ISSUE]: {
    en: 'Quality Issue',
    bn: 'গুণগত সমস্যা',
  },
  [ReturnCondition.WRONG_ITEM]: {
    en: 'Wrong Item',
    bn: 'ভুল পণ্য',
  },
};

/**
 * রিফান্ড মেথড লেবেলসমূহ
 */
export const RefundMethodLabels: Record<RefundMethodValue, { en: string; bn: string }> = {
  [RefundMethod.ORIGINAL_PAYMENT]: {
    en: 'Original Payment',
    bn: 'মূল পেমেন্ট',
  },
  [RefundMethod.STORE_CREDIT]: {
    en: 'Store Credit',
    bn: 'স্টোর ক্রেডিট',
  },
  [RefundMethod.BANK_TRANSFER]: {
    en: 'Bank Transfer',
    bn: 'ব্যাংক ট্রান্সফার',
  },
  [RefundMethod.MOBILE_MONEY]: {
    en: 'Mobile Money',
    bn: 'মোবাইল মানি',
  },
};

/**
 * রিটার্ন শিপিং কস্ট লেবেলসমূহ
 */
export const ReturnShippingCostLabels: Record<ReturnShippingCostValue, { en: string; bn: string }> =
  {
    [ReturnShippingCost.PAID_BY_SELLER]: {
      en: 'Paid by Seller',
      bn: 'বিক্রেতা প্রদত্ত',
    },
    [ReturnShippingCost.PAID_BY_BUYER]: {
      en: 'Paid by Buyer',
      bn: 'ক্রেতা প্রদত্ত',
    },
    [ReturnShippingCost.FREE]: {
      en: 'Free',
      bn: 'বিনামূল্যে',
    },
  };

/**
 * রিটার্ন স্ট্যাটাস লেবেলসমূহ
 */
export const ReturnStatusLabels: Record<ReturnStatusValue, { en: string; bn: string }> = {
  [ReturnStatus.REQUESTED]: {
    en: 'Requested',
    bn: 'অনুরোধ করা হয়েছে',
  },
  [ReturnStatus.APPROVED]: {
    en: 'Approved',
    bn: 'অনুমোদিত',
  },
  [ReturnStatus.REJECTED]: {
    en: 'Rejected',
    bn: 'বাতিল',
  },
  [ReturnStatus.IN_TRANSIT]: {
    en: 'In Transit',
    bn: 'পরিবহনে',
  },
  [ReturnStatus.REFUNDED]: {
    en: 'Refunded',
    bn: 'ফেরত দেওয়া হয়েছে',
  },
  [ReturnStatus.COMPLETED]: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
};

/**
 * রিটার্ন স্ট্যাটাস রঙ কোডসমূহ
 */
export const ReturnStatusColors: Record<ReturnStatusValue, string> = {
  [ReturnStatus.REQUESTED]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ReturnStatus.APPROVED]: 'bg-green-100 text-green-800 border-green-300',
  [ReturnStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
  [ReturnStatus.IN_TRANSIT]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ReturnStatus.REFUNDED]: 'bg-purple-100 text-purple-800 border-purple-300',
  [ReturnStatus.COMPLETED]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * রিটার্ন প্রসেসিং সময় (দিন)
 */
export const ReturnProcessingDays = 3;

/**
 * রিফান্ড প্রসেসিং সময় (দিন)
 */
export const RefundProcessingDays = 5;

/**
 * রিটার্ন সর্বোচ্চ ওজন (কেজি)
 */
export const ReturnMaxWeightKg = 30;

/**
 * রিটার্ন বাতিলের সময় (ঘণ্টা)
 */
export const ReturnCancellationHours = 24;
