import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { CRYPTO_PAYMENT } from '@vubon/shared-constants/src/business/payment/crypto-payment.constants';
import { Payment } from './payment.types';

export interface CryptoPayment extends BaseEntity {
  cryptoId: string;
  paymentId: string;
  payment: Payment;
  type: keyof typeof CRYPTO_PAYMENT.TYPES | string;
  amount: Money;
  cryptoAmount: number;
  cryptoCurrency: string;
  walletAddress: string;
  transactionHash: string;
  status: string;
  confirmations: number;
  requiredConfirmations: number;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
