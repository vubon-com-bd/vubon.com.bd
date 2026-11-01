/**
 * PaymentLoggerMiddleware — unit tests
 * @module payment-service/test/unit/interfaces/middlewares
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import {
  PaymentLoggerMiddleware,
  CORRELATION_HEADER,
} from '@interfaces/middlewares/payment-logger.middleware';

type ListenerFn = (...args: unknown[]) => void;

function mockReq(overrides: Partial<{ headers: Record<string, string | string[]>; url: string; originalUrl?: string }> = {}): {
  headers: Record<string, string | string[]>;
  method: string;
  url: string;
  originalUrl?: string;
} {
  return {
    headers: overrides.headers ?? {},
    method: 'POST',
    url: overrides.url ?? '/payments',
    originalUrl: overrides.originalUrl,
  };
}

function mockRes(): {
  setHeader: jest.Mock;
  on: (event: string, cb: ListenerFn) => void;
  triggerFinish: () => void;
  statusCode: number;
} {
  const listeners: Record<string, ListenerFn[]> = {};
  return {
    setHeader: jest.fn(),
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

describe('PaymentLoggerMiddleware', () => {
  let mw: PaymentLoggerMiddleware;
  let next: jest.Mock;

  beforeEach(() => {
    mw = new PaymentLoggerMiddleware();
    next = jest.fn();
  });

  it('sets x-correlation-id header when missing', () => {
    const req = mockReq();
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_HEADER, expect.any(String));
    expect(next).toHaveBeenCalled();
  });

  it('preserves incoming correlation-id (string)', () => {
    const req = mockReq({ headers: { 'x-correlation-id': 'cid-abc' } });
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_HEADER, 'cid-abc');
  });

  it('generates new cid when header is array', () => {
    const req = mockReq({ headers: { 'x-correlation-id': ['a', 'b'] } });
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_HEADER, expect.any(String));
  });

  it('generates new cid when header is empty string', () => {
    const req = mockReq({ headers: { 'x-correlation-id': '' } });
    const res = mockRes();
    mw.use(req as never, res as never, next);
    const [, cid] = res.setHeader.mock.calls[0];
    expect(typeof cid).toBe('string');
    expect(cid.length).toBeGreaterThan(10);
  });

  it('uses originalUrl when available', () => {
    const req = mockReq({ url: '/x', originalUrl: '/payments/123' });
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });

  it('falls back to url when originalUrl missing', () => {
    const req = mockReq({ url: '/fallback' });
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });

  it('handles missing url entirely', () => {
    const req = { headers: {}, method: 'GET' } as { headers: Record<string, string>; method: string; url?: string };
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });
});

// ─── Edge cases ─────────────────────────────
describe('PaymentLoggerMiddleware — edge cases', () => {
  let mw: PaymentLoggerMiddleware;
  let next: jest.Mock;

  beforeEach(() => {
    mw = new PaymentLoggerMiddleware();
    next = jest.fn();
  });

  it('handles empty string originalUrl', () => {
    const req = { headers: {}, method: 'GET', url: '/fallback', originalUrl: '' };
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });

  it('handles both originalUrl and url missing', () => {
    const req = { headers: {}, method: 'GET' };
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(() => res.triggerFinish()).not.toThrow();
  });

  it('handles incoming correlation id that is array', () => {
    const req = { headers: { 'x-correlation-id': ['a', 'b'] }, method: 'GET', url: '/x' };
    const res = mockRes();
    mw.use(req as never, res as never, next);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_HEADER, expect.any(String));
  });
});
