/**
 * @WebhookProvider() — unit tests (uses exported helper)
 */
import { describe, it, expect } from '@jest/globals';
import {
  WebhookProvider,
  extractProviderFromUrl,
} from '@interfaces/decorators/webhook-provider.decorator';

describe('WebhookProvider decorator', () => {
  it('exports a decorator (function)', () => {
    expect(typeof WebhookProvider).toBe('function');
  });
});

describe('extractProviderFromUrl (helper)', () => {
  it('extracts provider from /api/webhooks/bkash', () => {
    expect(extractProviderFromUrl('/api/webhooks/bkash')).toBe('bkash');
  });

  it('extracts provider from /api/webhooks/stripe', () => {
    expect(extractProviderFromUrl('/api/webhooks/stripe')).toBe('stripe');
  });

  it('normalizes to lowercase', () => {
    expect(extractProviderFromUrl('/api/webhooks/BKASH')).toBe('bkash');
  });

  it('handles hyphenated provider like sslcommerz', () => {
    expect(extractProviderFromUrl('/api/webhooks/sslcommerz')).toBe('sslcommerz');
  });

  it('returns "unknown" when provider not in URL', () => {
    expect(extractProviderFromUrl('/api/other/path')).toBe('unknown');
  });

  it('returns "unknown" for empty URL', () => {
    expect(extractProviderFromUrl('')).toBe('unknown');
  });

  it('returns "unknown" for undefined URL', () => {
    expect(extractProviderFromUrl(undefined)).toBe('unknown');
  });
});
