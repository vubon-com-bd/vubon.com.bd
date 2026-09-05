/**
 * Bank Transfer Endpoints
 * ব্যাংক ট্রান্সফার সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { BANK_TRANSFER } from '@vubon/shared-constants';
import type { BankTransfer } from '@vubon/shared-types';

export const bankTransferEndpoints = {
  create: `${baseEndpoints.api}/payment/bank-transfer`,
  verify: (id: string) => `${baseEndpoints.api}/payment/bank-transfer/${id}/verify`,
  get: (id: string) => `${baseEndpoints.api}/payment/bank-transfer/${id}`,
  list: `${baseEndpoints.api}/payment/bank-transfers`,
} as const;

// BANK_TRANSFER ব্যবহার
export const getBankTransferStatuses = () => {
  return Object.values(BANK_TRANSFER);
};

// BankTransfer টাইপ ব্যবহার
export type BankTransferType = BankTransfer;

export type BankTransferEndpointKey = keyof typeof bankTransferEndpoints;
