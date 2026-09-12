import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { BANK_TRANSFER } from '@vubon/shared-constants/src/business/payment/bank-transfer.constants';

const bankTransferTypeKeys = Object.keys(BANK_TRANSFER.TYPES) as [string, ...string[]];

export const BankTransferSchema = BaseSchema.extend({
  transferId: z.string().uuid(),
  paymentId: z.string().uuid(),
  type: z.enum(bankTransferTypeKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  status: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  routingNumber: z.string().optional(),
  swiftCode: z.string().optional(),
  referenceNumber: z.string().optional(),
  transactionId: z.string().optional(),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
