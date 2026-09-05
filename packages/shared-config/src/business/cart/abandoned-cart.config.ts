/**
 * Abandoned Cart Config
 * পরিত্যক্ত কার্ট কনফিগারেশন
 */

import { ABANDONED_CART } from '@vubon/shared-constants';

export interface AbandonedCartConfig {
  enabled: boolean;
  threshold: number;
  recoveryEnabled: boolean;
  recoveryEmailDelay: number;
  recoverySmsDelay: number;
  recoveryPushDelay: number;
  maxRecoveryAttempts: number;
  recoveryWindow: number;
  status: Record<string, string>;
  recoveryStatus: Record<string, string>;
  reasons: Record<string, string>;
  defaults: {
    abandonedAfter: number;
    recoveryEmailDelay: number;
    recoverySmsDelay: number;
    maxRecoveryAttempts: number;
    recoveryWindow: number;
  };
  emailTemplate: {
    subject: string;
    subjectBangla: string;
    body: string;
    bodyBangla: string;
  };
  smsTemplate: {
    message: string;
    messageBangla: string;
  };
  pushTemplate: {
    title: string;
    titleBangla: string;
    body: string;
    bodyBangla: string;
  };
}

export const abandonedCartConfig: AbandonedCartConfig = {
  enabled: true,
  threshold: 3600, // 1 hour
  recoveryEnabled: true,
  recoveryEmailDelay: 3600, // 1 hour
  recoverySmsDelay: 7200, // 2 hours
  recoveryPushDelay: 1800, // 30 minutes
  maxRecoveryAttempts: 3,
  recoveryWindow: 259200, // 3 days

  status: {
    pending: ABANDONED_CART.STATUS.PENDING,
    recovered: ABANDONED_CART.STATUS.RECOVERED,
    lost: ABANDONED_CART.STATUS.LOST,
    expired: ABANDONED_CART.STATUS.EXPIRED,
    ignored: ABANDONED_CART.STATUS.IGNORED,
    converted: ABANDONED_CART.STATUS.CONVERTED,
  },

  recoveryStatus: {
    not_attempted: ABANDONED_CART.RECOVERY_STATUS.NOT_ATTEMPTED,
    email_sent: ABANDONED_CART.RECOVERY_STATUS.EMAIL_SENT,
    sms_sent: ABANDONED_CART.RECOVERY_STATUS.SMS_SENT,
    push_sent: ABANDONED_CART.RECOVERY_STATUS.PUSH_SENT,
    reminder_sent: ABANDONED_CART.RECOVERY_STATUS.REMINDER_SENT,
    recovered: ABANDONED_CART.RECOVERY_STATUS.RECOVERED,
    failed: ABANDONED_CART.RECOVERY_STATUS.FAILED,
  },

  reasons: {
    checkout: ABANDONED_CART.REASONS.CHECKOUT,
    payment: ABANDONED_CART.REASONS.PAYMENT,
    shipping: ABANDONED_CART.REASONS.SHIPPING,
    price: ABANDONED_CART.REASONS.PRICE,
    login: ABANDONED_CART.REASONS.LOGIN,
    technical: ABANDONED_CART.REASONS.TECHNICAL,
    unknown: ABANDONED_CART.REASONS.UNKNOWN,
  },

  defaults: {
    abandonedAfter: ABANDONED_CART.DEFAULTS.ABANDONED_AFTER,
    recoveryEmailDelay: ABANDONED_CART.DEFAULTS.RECOVERY_EMAIL_DELAY,
    recoverySmsDelay: ABANDONED_CART.DEFAULTS.RECOVERY_SMS_DELAY,
    maxRecoveryAttempts: ABANDONED_CART.DEFAULTS.MAX_RECOVERY_ATTEMPTS,
    recoveryWindow: ABANDONED_CART.DEFAULTS.RECOVERY_WINDOW,
  },

  emailTemplate: {
    subject: 'You left items in your cart!',
    subjectBangla: 'আপনার কার্টে আইটেম রেখে গেছেন!',
    body: 'Complete your purchase now and get exclusive discounts.',
    bodyBangla: 'এখনই আপনার কেনাকাটা সম্পূর্ণ করুন এবং এক্সক্লুসিভ ডিসকাউন্ট পান।',
  },

  smsTemplate: {
    message: 'Complete your purchase! {itemsCount} items in cart. Total: {currency} {total}',
    messageBangla:
      'আপনার কেনাকাটা সম্পূর্ণ করুন! কার্টে {itemsCount} টি আইটেম। মোট: {currency} {total}',
  },

  pushTemplate: {
    title: "Don't forget your items!",
    titleBangla: 'আপনার আইটেমগুলি ভুলবেন না!',
    body: 'You have {itemsCount} items waiting in your cart.',
    bodyBangla: 'আপনার কার্টে {itemsCount} টি আইটেম অপেক্ষা করছে।',
  },
} as const;

export type AbandonedCartConfigType = typeof abandonedCartConfig;
