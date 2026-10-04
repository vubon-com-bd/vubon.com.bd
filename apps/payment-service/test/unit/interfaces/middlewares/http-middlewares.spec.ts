import { jest } from '@jest/globals';
import type { Request, Response, NextFunction } from 'express';
import { IdempotencyMiddleware } from '../../../../src/module/interfaces/middlewares/idempotency.middleware.js';
import { CorrelationIdMiddleware } from '../../../../src/module/interfaces/middlewares/correlation-id.middleware.js';

function mockReq(headers: Record<string, string> = {}): Request & { idempotencyKey?: string } {
  return { headers } as Request & { idempotencyKey?: string };
}

function mockRes(): Response & { _headers: Record<string, string> } {
  const res = {
    _headers: {} as Record<string, string>,
    setHeader: jest.fn((k: string, v: string) => {
      res._headers[k] = v;
    }),
  };
  return res as unknown as Response & { _headers: Record<string, string> };
}

describe('IdempotencyMiddleware', () => {
  const mw = new IdempotencyMiddleware();

  it('sets idempotencyKey from Idempotency-Key header', () => {
    const req = mockReq({ 'idempotency-key': 'idem_abc12345' });
    const next = jest.fn() as NextFunction;
    mw.use(req, mockRes(), next);
    expect(req.idempotencyKey).toBe('idem_abc12345');
    expect(next).toHaveBeenCalled();
  });

  it('falls back to x-idempotency-key header', () => {
    const req = mockReq({ 'x-idempotency-key': 'idem_xyz98765' });
    mw.use(req, mockRes(), jest.fn() as NextFunction);
    expect(req.idempotencyKey).toBe('idem_xyz98765');
  });

  it('no key → no idempotencyKey field', () => {
    const req = mockReq({});
    mw.use(req, mockRes(), jest.fn() as NextFunction);
    expect(req.idempotencyKey).toBeUndefined();
  });
});

describe('CorrelationIdMiddleware', () => {
  const mw = new CorrelationIdMiddleware();

  it('passes through provided x-correlation-id', () => {
    const req = mockReq({ 'x-correlation-id': 'corr-123' });
    const res = mockRes();
    const next = jest.fn() as NextFunction;
    mw.use(req, res, next);
    expect(res.setHeader).toHaveBeenCalledWith('x-correlation-id', 'corr-123');
    expect(next).toHaveBeenCalled();
  });

  it('generates new id when absent', () => {
    const req = mockReq({});
    const res = mockRes();
    mw.use(req, res, jest.fn() as NextFunction);
    expect(res.setHeader).toHaveBeenCalled();
    const call = (res.setHeader as jest.Mock).mock.calls[0] as [string, string];
    expect(call[0]).toBe('x-correlation-id');
    expect(call[1].length).toBeGreaterThan(10);
  });
});
