/**
 * Transaction ID Generator
 * ট্রানজেকশন আইডি জেনারেটর
 */

import { idGenerator } from '../../common/generator/id-generator';

export interface TransactionIdOptions {
  prefix?: string;
  length?: number;
  includeTimestamp?: boolean;
  includeRandom?: boolean;
}

export const generateTransactionId = (options: TransactionIdOptions = {}): string => {
  const { prefix = 'TXN', length = 8, includeTimestamp = true, includeRandom = true } = options;

  let transactionId = prefix;

  if (includeTimestamp) {
    const now = new Date();
    const timestamp = now.getTime().toString(36).toUpperCase();
    transactionId += `-${timestamp}`;
  }

  if (includeRandom) {
    const random = idGenerator.shortId(length);
    transactionId += `-${random}`;
  }

  return transactionId;
};

export const generatePaymentId = (): string => {
  return generateTransactionId({ prefix: 'PAY', length: 8 });
};

export const generateRefundId = (): string => {
  return generateTransactionId({ prefix: 'REF', length: 8 });
};

export const generateInvoiceId = (): string => {
  return generateTransactionId({ prefix: 'INV', length: 8 });
};

export const generateReceiptId = (): string => {
  return generateTransactionId({ prefix: 'RCP', length: 8 });
};

export const generateOrderTransactionId = (orderId: string): string => {
  const prefix = 'ORD';
  const random = idGenerator.shortId(6);
  return `${prefix}-${orderId.slice(0, 6)}-${random}`;
};

export const validateTransactionId = (transactionId: string): boolean => {
  const pattern = /^[A-Z]{2,4}(-[A-Z0-9]{4,8})?-[A-Z0-9]{4,12}$/;
  return pattern.test(transactionId);
};

export const parseTransactionId = (
  transactionId: string
): {
  prefix: string;
  timestamp?: string;
  random: string;
} | null => {
  const parts = transactionId.split('-');
  if (parts.length < 2) return null;

  return {
    prefix: parts[0],
    timestamp: parts.length > 2 ? parts[1] : undefined,
    random: parts[parts.length - 1],
  };
};
