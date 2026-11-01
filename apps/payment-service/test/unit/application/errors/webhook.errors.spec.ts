/**
 * Webhook Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  WebhookValidationError,
  WebhookSignatureInvalidError,
  WebhookProcessingError,
  WebhookPayloadInvalidError,
  WebhookProviderUnsupportedError,
} from '@application/errors/webhook.errors';

describe('Webhook Application Errors', () => {
  it('WebhookValidationError — 400', () => {
    const err = new WebhookValidationError('bkash', 'trxID missing');
    expect(err.name).toBe('WebhookValidationError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('bkash');
    expect(err.message).toContain('trxID missing');
  });

  it('WebhookSignatureInvalidError — 401', () => {
    const err = new WebhookSignatureInvalidError('stripe');
    expect(err.httpStatus).toBe(401);
    expect(err.message).toContain('stripe');
  });

  it('WebhookProcessingError — 400', () => {
    const err = new WebhookProcessingError('nagad', 'payment not found');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('nagad');
  });

  it('WebhookPayloadInvalidError — 422', () => {
    const err = new WebhookPayloadInvalidError('sslcommerz', 'amount');
    expect(err.httpStatus).toBe(422);
    expect(err.message).toContain('sslcommerz');
  });

  it('WebhookProviderUnsupportedError — 400', () => {
    const err = new WebhookProviderUnsupportedError('paypal');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('paypal');
  });
});
