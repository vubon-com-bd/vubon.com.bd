/**
 * Errors — Barrel + Cross-checks
 * @module payment-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import * as errors from '@application/errors';

describe('Application Errors — Barrel', () => {
  it('should export all error classes', () => {
    expect(errors.PaymentNotFoundApplicationError).toBeDefined();
    expect(errors.PaymentInitiationError).toBeDefined();
    expect(errors.PaymentMethodNotFoundApplicationError).toBeDefined();
    expect(errors.TransactionNotFoundApplicationError).toBeDefined();
    expect(errors.RefundNotFoundApplicationError).toBeDefined();
    expect(errors.SubscriptionNotFoundApplicationError).toBeDefined();
    expect(errors.InvoiceNotFoundApplicationError).toBeDefined();
    expect(errors.WebhookValidationError).toBeDefined();
  });

  it('all exported errors should extend Error', () => {
    const errClasses = [
      errors.PaymentNotFoundApplicationError,
      errors.PaymentInitiationError,
      errors.PaymentMethodAddError,
      errors.TransactionCreationError,
      errors.RefundRequestError,
      errors.SubscriptionCreationError,
      errors.InvoiceGenerationError,
      errors.WebhookValidationError,
    ];
    errClasses.forEach((Cls) => {
      expect(Cls.prototype instanceof Error).toBe(true);
    });
  });
});
