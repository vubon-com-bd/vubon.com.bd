/**
 * Payment Sagas — Barrel
 * @module payment-service/modules/payment/sagas
 */
import { PaymentProcessingSaga } from '@application/sagas/payment-processing.saga';

export const PAYMENT_SAGAS = [PaymentProcessingSaga] as const;
