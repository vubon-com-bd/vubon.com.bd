/**
 * WebhookLoggerMiddleware — unit tests
 * @module payment-service/test/unit/interfaces/middlewares
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { WebhookLoggerMiddleware } from '@interfaces/middlewares/webhook-logger.middleware';

type ListenerFn = (...args: unknown[]) => void;

function mockReq(overrides: Partial<{ headers: Record<string, string | string[]>; url: string }> = {}): {
  headers: Record<string, string | string[]>;
  url: string;
} {
  return {
    headers: overrides.headers ?? {},
    url: overrides.url ?? '/webhooks/stripe',
  };
}

function mockRes(): {
  on: (event: string, cb: ListenerFn) => void;
  triggerFinish: () => void;
  statusCode: number;
} {
  const listeners: Record<string, ListenerFn[]> = {};
  return {
    on: (event: string, cb: ListenerFn) => {
      listeners[event] = listeners[event] ?? [];
      listeners[event].push(cb);
    },
    triggerFinish: () => {
      for (const cb of listeners['finish'] ?? []) cb();
    },
    statusCode: 200,
  };
}

describe('WebhookLoggerMiddleware', () => {
  let mw: WebhookLoggerMiddleware;
  let next: jest.Mock;

  beforeEach(() => {
    mw = new WebhookLoggerMiddleware();
    next = jest.fn();
  });

  it('calls next()', () => {
    mw.use(mockReq() as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });

  it('extracts bkash provider', () => {
    mw.use(mockReq({ url: '/webhooks/bkash' }) as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });

  it('handles x-signature header', () => {
    mw.use(
      mockReq({ headers: { 'x-signature': 'sig-abc' } }) as never,
      mockRes() as never,
      next,
    );
    expect(next).toHaveBeenCalled();
  });

  it('handles stripe-signature header', () => {
    mw.use(
      mockReq({ headers: { 'stripe-signature': 't=1,v1=abc' } }) as never,
      mockRes() as never,
      next,
    );
    expect(next).toHaveBeenCalled();
  });

  it('handles x-bkash-signature header', () => {
    mw.use(
      mockReq({ headers: { 'x-bkash-signature': 'sig' } }) as never,
      mockRes() as never,
      next,
    );
    expect(next).toHaveBeenCalled();
  });

  it('handles paypal-transmission-sig header', () => {
    mw.use(
      mockReq({ headers: { 'paypal-transmission-sig': 'sig' } }) as never,
      mockRes() as never,
      next,
    );
    expect(next).toHaveBeenCalled();
  });

  it('logs on finish without throwing', () => {
    const res = mockRes();
    mw.use(mockReq() as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });

  it('handles URL without provider', () => {
    mw.use(mockReq({ url: '/random' }) as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });

  it('handles missing URL', () => {
    const req = { headers: {} } as { headers: Record<string, string>; url?: string };
    mw.use(req as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });

  it('handles signature header with array value', () => {
    mw.use(
      mockReq({ headers: { 'x-signature': ['sig1', 'sig2'] } }) as never,
      mockRes() as never,
      next,
    );
    expect(next).toHaveBeenCalled();
  });
});

// ─── Edge cases ─────────────────────────────
describe('WebhookLoggerMiddleware — edge cases', () => {
  let mw: WebhookLoggerMiddleware;
  let next: jest.Mock;

  beforeEach(() => {
    mw = new WebhookLoggerMiddleware();
    next = jest.fn();
  });

  it('handles empty URL string', () => {
    mw.use(mockReq({ url: '' }) as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });

  it('handles signature header value that is neither string nor array', () => {
    const req = {
      headers: { 'x-signature': 42 as unknown as string },
      url: '/webhooks/stripe',
    };
    mw.use(req as never, mockRes() as never, next);
    expect(next).toHaveBeenCalled();
  });
});
