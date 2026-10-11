/**
 * Unit tests for BaseHttpProvider
 * @module notification-service/test/unit/infrastructure/providers/base
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { BaseHttpProvider } from '../../../../../src/module/infrastructure/providers/base/http-provider.base.js';
import {
  ProviderError,
  ProviderNetworkError,
  ProviderRateLimitError,
  type ProviderHealthStatus,
} from '../../../../../src/module/infrastructure/providers/base/provider.types.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

class TestProvider extends BaseHttpProvider {
  constructor() {
    super({ name: 'test-provider', channel: 'email', timeoutMs: 5000 });
  }
  isEnabled(): boolean { return true; }
  async health(): Promise<ProviderHealthStatus> {
    return { healthy: true, enabled: true };
  }
  // Expose protected method for testing
  async doRequest<T>(input: Parameters<BaseHttpProvider['httpRequest']>[0]) {
    return this.httpRequest<T>(input);
  }
  exposeExtractError(body: unknown): string | undefined {
    return this.extractErrorMessage(body);
  }
}

describe('BaseHttpProvider', () => {
  let provider: TestProvider;

  beforeEach(() => {
    setupFetchMock();
    provider = new TestProvider();
  });

  afterEach(() => {
    teardownFetchMock();
  });

  describe('info()', () => {
    it('returns provider metadata', () => {
      const info = provider.info();
      expect(info.name).toBe('test-provider');
      expect(info.channel).toBe('email');
      expect(info.enabled).toBe(true);
    });
  });

  describe('rateLimits()', () => {
    it('returns default rate limits', () => {
      const limits = provider.rateLimits();
      expect(limits.perSecond).toBe(100);
      expect(limits.perDay).toBe(50_000);
    });
  });

  describe('httpRequest()', () => {
    it('makes a successful GET request', async () => {
      mockFetchOnce({ status: 200, body: { ok: true } });
      const res = await provider.doRequest<{ ok: boolean }>({
        method: 'GET',
        url: 'https://api.example.com/test',
      });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ok: true });
    });

    it('sends JSON body on POST', async () => {
      mockFetchOnce({ status: 201, body: { id: 'x' } });
      await provider.doRequest({
        method: 'POST',
        url: 'https://api.example.com/create',
        body: { name: 'Test' },
      });
      const calls = getFetchCalls();
      expect(calls[0]?.method).toBe('POST');
      expect(calls[0]?.body).toBe(JSON.stringify({ name: 'Test' }));
    });

    it('sends raw body when bodyRaw provided', async () => {
      mockFetchOnce({ status: 200, body: {} });
      await provider.doRequest({
        method: 'POST',
        url: 'https://api.example.com/raw',
        bodyRaw: 'a=1&b=2',
      });
      const calls = getFetchCalls();
      expect(calls[0]?.body).toBe('a=1&b=2');
    });

    it('throws ProviderRateLimitError on 429', async () => {
      mockFetchOnce({ status: 429, headers: { 'retry-after': '30' } });
      await expect(
        provider.doRequest({ method: 'GET', url: 'https://api.example.com/x' }),
      ).rejects.toBeInstanceOf(ProviderRateLimitError);
    });

    it('throws ProviderError on 4xx', async () => {
      mockFetchOnce({ status: 400, body: { message: 'Bad request' } });
      await expect(
        provider.doRequest({ method: 'GET', url: 'https://api.example.com/x' }),
      ).rejects.toBeInstanceOf(ProviderError);
    });

    it('marks 5xx as retryable', async () => {
      mockFetchOnce({ status: 503, body: { message: 'Unavailable' } });
      try {
        await provider.doRequest({ method: 'GET', url: 'https://api.example.com/x' });
        throw new Error('should have thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(ProviderError);
        expect((err as ProviderError).retryable).toBe(true);
      }
    });

    it('wraps network errors as ProviderNetworkError', async () => {
      mockFetchOnce({ throwError: new Error('ECONNREFUSED') });
      await expect(
        provider.doRequest({ method: 'GET', url: 'https://api.example.com/x' }),
      ).rejects.toBeInstanceOf(ProviderNetworkError);
    });

    it('parses text response', async () => {
      mockFetchOnce({ status: 200, body: 'plain text' });
      const res = await provider.doRequest({ method: 'GET', url: 'https://api.example.com/x' });
      expect(res.body).toBe('plain text');
    });

    it('returns empty body for empty response', async () => {
      mockFetchOnce({ status: 200, body: '' });
      const res = await provider.doRequest({ method: 'DELETE', url: 'https://api.example.com/x' });
      expect(res.body).toBeNull();
    });
  });

  describe('extractErrorMessage()', () => {
    it('extracts message field', () => {
      expect(provider.exposeExtractError({ message: 'oops' })).toBe('oops');
    });
    it('extracts error field', () => {
      expect(provider.exposeExtractError({ error: 'failed' })).toBe('failed');
    });
    it('extracts first error from errors array', () => {
      expect(provider.exposeExtractError({ errors: [{ message: 'first' }] })).toBe('first');
    });
    it('returns undefined for unknown shape', () => {
      expect(provider.exposeExtractError({ unknown: true })).toBeUndefined();
    });
    it('returns the string itself if body is a string', () => {
      expect(provider.exposeExtractError('raw error')).toBe('raw error');
    });
    it('returns undefined for null', () => {
      expect(provider.exposeExtractError(null)).toBeUndefined();
    });
  });
});
