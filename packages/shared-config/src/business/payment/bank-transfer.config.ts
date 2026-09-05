/**
 * Bank Transfer Config
 * ব্যাংক ট্রান্সফার কনফিগারেশন
 */

export interface BankTransferConfig {
  enabled: boolean;
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  branchName: string;
  branchCode: string;
  minAmount: number;
  maxAmount: number;
  processingTime: number;
  requireReference: boolean;
}

export const bankTransferConfig: BankTransferConfig = {
  enabled: true,
  bankName: 'Sonali Bank',
  accountName: 'Vubon Ltd',
  accountNumber: '123456789',
  routingNumber: '123456789',
  swiftCode: 'SONLBDDH',
  branchName: 'Motijheel Branch',
  branchCode: '123',
  minAmount: 1,
  maxAmount: 9999999,
  processingTime: 24,
  requireReference: true,
} as const;

export type BankTransferConfigType = typeof bankTransferConfig;
