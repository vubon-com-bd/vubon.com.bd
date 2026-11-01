/**
 * DI tokens definition — E2E (token symbols exist)
 * @module test/e2e/modules
 */
import { PAYMENT_SERVICE } from '@application/services/interfaces/payment.service.interface';
import { PAYMENT_METHOD_SERVICE } from '@application/services/interfaces/payment-method.service.interface';
import { PAYMENT_GATEWAY_SERVICE } from '@application/services/interfaces/payment-gateway.service.interface';
import { TRANSACTION_SERVICE } from '@application/services/interfaces/transaction.service.interface';
import { REFUND_SERVICE } from '@application/services/interfaces/refund.service.interface';
import { SPLIT_PAYMENT_SERVICE } from '@application/services/interfaces/split-payment.service.interface';
import { RECURRING_PAYMENT_SERVICE } from '@application/services/interfaces/recurring-payment.service.interface';
import { SUBSCRIPTION_SERVICE } from '@application/services/interfaces/subscription.service.interface';
import { INVOICE_SERVICE } from '@application/services/interfaces/invoice.service.interface';
import { VERIFICATION_SERVICE } from '@application/services/interfaces/verification.service.interface';

import { PAYMENT_REPOSITORY } from '@domain/repositories/payment.repository.interface';
import { REFUND_REPOSITORY } from '@domain/repositories/refund.repository.interface';
import { INVOICE_REPOSITORY } from '@domain/repositories/invoice.repository.interface';
import { SUBSCRIPTION_REPOSITORY } from '@domain/repositories/subscription.repository.interface';

describe('DI Tokens (E2E)', () => {
  it.each([
    ['PAYMENT_SERVICE', PAYMENT_SERVICE],
    ['PAYMENT_METHOD_SERVICE', PAYMENT_METHOD_SERVICE],
    ['PAYMENT_GATEWAY_SERVICE', PAYMENT_GATEWAY_SERVICE],
    ['TRANSACTION_SERVICE', TRANSACTION_SERVICE],
    ['REFUND_SERVICE', REFUND_SERVICE],
    ['SPLIT_PAYMENT_SERVICE', SPLIT_PAYMENT_SERVICE],
    ['RECURRING_PAYMENT_SERVICE', RECURRING_PAYMENT_SERVICE],
    ['SUBSCRIPTION_SERVICE', SUBSCRIPTION_SERVICE],
    ['INVOICE_SERVICE', INVOICE_SERVICE],
    ['VERIFICATION_SERVICE', VERIFICATION_SERVICE],
  ])('Service token %s is a Symbol', (_name, token) => {
    expect(typeof token).toBe('symbol');
  });

  it.each([
    ['PAYMENT_REPOSITORY', PAYMENT_REPOSITORY],
    ['REFUND_REPOSITORY', REFUND_REPOSITORY],
    ['INVOICE_REPOSITORY', INVOICE_REPOSITORY],
    ['SUBSCRIPTION_REPOSITORY', SUBSCRIPTION_REPOSITORY],
  ])('Repository token %s is a Symbol', (_name, token) => {
    expect(typeof token).toBe('symbol');
  });
});
