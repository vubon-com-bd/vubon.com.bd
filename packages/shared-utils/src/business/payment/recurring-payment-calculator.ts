/**
 * Recurring Payment Calculator
 * রিকারিং পেমেন্ট ক্যালকুলেটর
 */

import type { PaymentRecurring } from '@vubon/shared-types';

export interface RecurringPaymentResult {
  amount: number;
  currency: string;
  frequency: string;
  interval: number;
  nextPaymentDate: Date;
  totalPayments: number;
  totalAmount: number;
}

export interface PaymentSchedule {
  date: Date;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'skipped';
}

export const calculateRecurringPayment = (recurring: PaymentRecurring): RecurringPaymentResult => {
  const { amount, currency, frequency, interval, startDate, endDate, nextPaymentDate } = recurring;

  const totalPayments = calculateTotalPayments(startDate, endDate, frequency, interval);
  const totalAmount = amount * totalPayments;

  // nextPaymentDate ব্যবহার করা হচ্ছে
  const nextDate = nextPaymentDate
    ? new Date(nextPaymentDate)
    : getNextRecurringDate(startDate, frequency, interval);

  return {
    amount: Math.round(amount * 100) / 100,
    currency: currency || 'BDT',
    frequency,
    interval,
    nextPaymentDate: nextDate,
    totalPayments,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

export const calculateTotalPayments = (
  startDate: Date,
  endDate: Date | undefined,
  frequency: string,
  interval: number
): number => {
  if (!endDate) {
    return 999; // Unlimited
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  let current = new Date(start);

  while (current <= end) {
    count++;
    switch (frequency) {
      case 'daily':
        current.setDate(current.getDate() + interval);
        break;
      case 'weekly':
        current.setDate(current.getDate() + 7 * interval);
        break;
      case 'bi_weekly':
        current.setDate(current.getDate() + 14 * interval);
        break;
      case 'monthly':
        current.setMonth(current.getMonth() + interval);
        break;
      case 'quarterly':
        current.setMonth(current.getMonth() + 3 * interval);
        break;
      case 'bi_annual':
        current.setMonth(current.getMonth() + 6 * interval);
        break;
      case 'annual':
        current.setFullYear(current.getFullYear() + interval);
        break;
      default:
        current.setMonth(current.getMonth() + interval);
    }
  }

  return count;
};

export const generatePaymentSchedule = (recurring: PaymentRecurring): PaymentSchedule[] => {
  const schedule: PaymentSchedule[] = [];
  const { amount, frequency, interval, startDate, endDate, nextPaymentDate } = recurring;

  let current = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(startDate);
  end.setFullYear(end.getFullYear() + 1); // Default to 1 year

  // nextPaymentDate ব্যবহার করে schedule তৈরি
  const firstPaymentDate = nextPaymentDate ? new Date(nextPaymentDate) : new Date(startDate);
  current = new Date(firstPaymentDate);

  while (current <= end) {
    schedule.push({
      date: new Date(current),
      amount: Math.round(amount * 100) / 100,
      status: current < new Date() ? 'paid' : 'pending',
    });

    switch (frequency) {
      case 'daily':
        current.setDate(current.getDate() + interval);
        break;
      case 'weekly':
        current.setDate(current.getDate() + 7 * interval);
        break;
      case 'bi_weekly':
        current.setDate(current.getDate() + 14 * interval);
        break;
      case 'monthly':
        current.setMonth(current.getMonth() + interval);
        break;
      case 'quarterly':
        current.setMonth(current.getMonth() + 3 * interval);
        break;
      case 'bi_annual':
        current.setMonth(current.getMonth() + 6 * interval);
        break;
      case 'annual':
        current.setFullYear(current.getFullYear() + interval);
        break;
      default:
        current.setMonth(current.getMonth() + interval);
    }
  }

  return schedule;
};

export const getNextRecurringDate = (
  currentDate: Date,
  frequency: string,
  interval: number
): Date => {
  const next = new Date(currentDate);

  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + interval);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7 * interval);
      break;
    case 'bi_weekly':
      next.setDate(next.getDate() + 14 * interval);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + interval);
      break;
    case 'quarterly':
      next.setMonth(next.getMonth() + 3 * interval);
      break;
    case 'bi_annual':
      next.setMonth(next.getMonth() + 6 * interval);
      break;
    case 'annual':
      next.setFullYear(next.getFullYear() + interval);
      break;
    default:
      next.setMonth(next.getMonth() + interval);
  }

  return next;
};

// Payment status helpers
export const getPaymentStatusForDate = (
  paymentDate: Date,
  currentDate: Date = new Date()
): 'pending' | 'paid' | 'failed' | 'skipped' => {
  if (paymentDate < currentDate) {
    // Check if payment was made (in real scenario, check payment records)
    return 'paid';
  }
  return 'pending';
};

export const isPaymentOverdue = (paymentDate: Date, gracePeriodDays: number = 0): boolean => {
  const now = new Date();
  const dueDate = new Date(paymentDate);
  dueDate.setDate(dueDate.getDate() + gracePeriodDays);
  return now > dueDate;
};

export const calculateNextPaymentDate = (
  lastPaymentDate: Date,
  frequency: string,
  interval: number
): Date => {
  return getNextRecurringDate(lastPaymentDate, frequency, interval);
};
