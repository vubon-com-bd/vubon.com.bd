import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { CRYPTO_PAYMENT } from '@vubon/shared-constants/src/business/payment/crypto-payment.constants';

const cryptoPaymentTypeKeys = Object.keys(CRYPTO_PAYMENT.TYPES) as [string, ...string[]];

export const CryptoPaymentSchema = BaseSchema.extend({
  cryptoId: z.string().uuid(),
  paymentId: z.string().uuid(),
  type: z.enum(cryptoPaymentTypeKeys),
  amount: MoneySchema,
  cryptoAmount: z.number().positive(),
  cryptoCurrency: z.string(),
  walletAddress: z.string(),
  transactionHash: z.string(),
  status: z.string(),
  confirmations: z.number().int().min(0),
  requiredConfirmations: z.number().int().min(1),
  gatewayResponse: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
});
