/**
 * Split Payment Calculator
 * স্প্লিট পেমেন্ট ক্যালকুলেটর
 */

import type { PaymentSplit } from '@vubon/shared-types';

export interface SplitCalculationResult {
  totalAmount: number;
  splits: {
    recipientId: string;
    amount: number;
    percentage: number;
  }[];
  currency: string;
  remainingAmount: number;
}

export interface SplitValidationResult {
  valid: boolean;
  totalPercentage: number;
  errors: string[];
}

export const calculateSplitPayment = (
  totalAmount: number,
  splits: PaymentSplit[],
  currency: string = 'BDT'
): SplitCalculationResult => {
  const splitAmounts = splits.map((split) => ({
    recipientId: split.recipientId,
    amount: (totalAmount * split.percentage) / 100,
    percentage: split.percentage,
  }));

  const totalSplitAmount = splitAmounts.reduce((sum, s) => sum + s.amount, 0);
  const remainingAmount = totalAmount - totalSplitAmount;

  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    splits: splitAmounts.map((s) => ({
      ...s,
      amount: Math.round(s.amount * 100) / 100,
    })),
    currency,
    remainingAmount: Math.round(remainingAmount * 100) / 100,
  };
};

export const validateSplitPayment = (splits: PaymentSplit[]): SplitValidationResult => {
  const errors: string[] = [];
  let totalPercentage = 0;

  for (const split of splits) {
    if (split.percentage < 0 || split.percentage > 100) {
      errors.push(`Invalid percentage for recipient ${split.recipientId}: ${split.percentage}`);
    }
    totalPercentage += split.percentage;
  }

  totalPercentage = Math.round(totalPercentage * 100) / 100;

  if (totalPercentage > 100) {
    errors.push(`Total percentage (${totalPercentage}%) exceeds 100%`);
  }

  return {
    valid: errors.length === 0,
    totalPercentage,
    errors,
  };
};

export const calculateSplitAmounts = (totalAmount: number, percentages: number[]): number[] => {
  const totalPercentage = percentages.reduce((sum, p) => sum + p, 0);

  if (totalPercentage === 0) {
    return percentages.map(() => 0);
  }

  return percentages.map((p) => (totalAmount * p) / totalPercentage);
};

export const calculateEqualSplit = (totalAmount: number, numberOfSplits: number): number[] => {
  if (numberOfSplits <= 0) return [];
  const splitAmount = totalAmount / numberOfSplits;
  return Array(numberOfSplits).fill(Math.round(splitAmount * 100) / 100);
};
