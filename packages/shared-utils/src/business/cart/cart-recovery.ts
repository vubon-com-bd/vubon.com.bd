/**
 * Cart Recovery
 * কার্ট রিকোভারি
 */

import { ABANDONED_CART } from '@vubon/shared-constants';
import type { AbandonedCart } from '@vubon/shared-types';

export interface RecoveryResult {
  recovered: boolean;
  cart: AbandonedCart;
  method: 'email' | 'sms' | 'push' | 'in_app';
  sentAt: Date;
  expiresAt: Date;
}

export interface RecoveryStats {
  totalAbandoned: number;
  recovered: number;
  conversionRate: number;
  averageTimeToRecover: number; // hours
  recoveryRate: number;
}

export const recoverAbandonedCart = (
  cart: AbandonedCart,
  method: 'email' | 'sms' | 'push' | 'in_app' = 'email'
): RecoveryResult => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

  const recoveredCart: AbandonedCart = {
    ...cart,
    status: ABANDONED_CART.STATUS.RECOVERED,
    lastRecoveryAt: now,
    recoveryAttempts: cart.recoveryAttempts + 1,
    updatedAt: now,
  };

  return {
    recovered: true,
    cart: recoveredCart,
    method,
    sentAt: now,
    expiresAt,
  };
};

export const isAbandonedCart = (
  cart: AbandonedCart,
  abandonedAfter: number = ABANDONED_CART.DEFAULTS.ABANDONED_AFTER
): boolean => {
  const now = new Date();
  const abandonedAt = new Date(cart.abandonedAt);
  const diff = (now.getTime() - abandonedAt.getTime()) / 1000;
  return diff >= abandonedAfter;
};

export const shouldRecoverCart = (
  cart: AbandonedCart,
  maxAttempts: number = ABANDONED_CART.DEFAULTS.MAX_RECOVERY_ATTEMPTS,
  recoveryWindow: number = ABANDONED_CART.DEFAULTS.RECOVERY_WINDOW
): boolean => {
  // Check if cart is already recovered or converted
  if (
    cart.status === ABANDONED_CART.STATUS.RECOVERED ||
    cart.status === ABANDONED_CART.STATUS.CONVERTED
  ) {
    return false;
  }

  // Check if max attempts reached
  if (cart.recoveryAttempts >= maxAttempts) {
    return false;
  }

  // Check if recovery window has passed
  const now = new Date();
  const abandonedAt = new Date(cart.abandonedAt);
  const diff = (now.getTime() - abandonedAt.getTime()) / 1000;
  if (diff > recoveryWindow) {
    return false;
  }

  return true;
};

export const getRecoveryMessage = (
  cart: AbandonedCart,
  method: 'email' | 'sms' | 'push' | 'in_app'
): string => {
  const messages = {
    email: `You left items in your cart! Complete your purchase now. Total: ${cart.currency} ${cart.total}`,
    sms: `Complete your purchase! ${cart.itemsCount} items in cart. Total: ${cart.currency} ${cart.total}`,
    push: `Don't forget your items! ${cart.itemsCount} items waiting for you.`,
    in_app: `Your cart is waiting! ${cart.itemsCount} items, total: ${cart.currency} ${cart.total}`,
  };

  return messages[method] || messages.email;
};

export const calculateRecoveryStats = (abandonedCarts: AbandonedCart[]): RecoveryStats => {
  const total = abandonedCarts.length;
  const recovered = abandonedCarts.filter(
    (c) => c.status === ABANDONED_CART.STATUS.RECOVERED
  ).length;
  const converted = abandonedCarts.filter(
    (c) => c.status === ABANDONED_CART.STATUS.CONVERTED
  ).length;
  const recoveryRate = total > 0 ? (recovered / total) * 100 : 0;
  const conversionRate = total > 0 ? (converted / total) * 100 : 0;

  // Calculate average time to recover
  let totalTime = 0;
  let recoveredCount = 0;
  for (const cart of abandonedCarts) {
    if (cart.status === ABANDONED_CART.STATUS.RECOVERED && cart.recoveredAt) {
      const diff =
        (new Date(cart.recoveredAt).getTime() - new Date(cart.abandonedAt).getTime()) / 1000 / 3600;
      totalTime += diff;
      recoveredCount++;
    }
  }
  const averageTimeToRecover = recoveredCount > 0 ? totalTime / recoveredCount : 0;

  return {
    totalAbandoned: total,
    recovered,
    conversionRate: Math.round(conversionRate * 100) / 100,
    averageTimeToRecover: Math.round(averageTimeToRecover * 100) / 100,
    recoveryRate: Math.round(recoveryRate * 100) / 100,
  };
};
