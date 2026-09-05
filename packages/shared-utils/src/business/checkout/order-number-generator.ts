/**
 * Order Number Generator
 * অর্ডার নম্বর জেনারেটর
 */

import { idGenerator } from '../../common/generator/id-generator';

export interface OrderNumberOptions {
  prefix?: string;
  suffix?: string;
  length?: number;
  includeDate?: boolean;
  includeRandom?: boolean;
}

export const generateOrderNumber = (options: OrderNumberOptions = {}): string => {
  const {
    prefix = 'ORD',
    suffix = '',
    length = 6,
    includeDate = true,
    includeRandom = true,
  } = options;

  let orderNumber = prefix;

  // Add date
  if (includeDate) {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    orderNumber += `-${year}${month}${day}`;
  }

  // Add random number
  if (includeRandom) {
    const random = idGenerator.numericId(length);
    orderNumber += `-${random}`;
  }

  // Add suffix
  if (suffix) {
    orderNumber += `-${suffix}`;
  }

  return orderNumber;
};

export const generateOrderNumberWithPrefix = (
  prefix: string = 'ORD',
  length: number = 6
): string => {
  return generateOrderNumber({ prefix, length });
};

export const generateInvoiceNumber = (): string => {
  return generateOrderNumber({ prefix: 'INV', length: 8 });
};

export const generateQuoteNumber = (): string => {
  return generateOrderNumber({ prefix: 'QTE', length: 6 });
};

export const generateEstimateNumber = (): string => {
  return generateOrderNumber({ prefix: 'EST', length: 6 });
};

export const validateOrderNumber = (orderNumber: string): boolean => {
  const pattern = /^[A-Z]{2,4}-\d{2}\d{2}\d{2}-[A-Z0-9]{4,8}(-[A-Z0-9]+)?$/;
  return pattern.test(orderNumber);
};

export const parseOrderNumber = (
  orderNumber: string
): {
  prefix: string;
  date: string;
  random: string;
  suffix?: string;
} | null => {
  const parts = orderNumber.split('-');
  if (parts.length < 3) return null;

  return {
    prefix: parts[0],
    date: parts[1],
    random: parts[2],
    suffix: parts[3] || undefined,
  };
};
