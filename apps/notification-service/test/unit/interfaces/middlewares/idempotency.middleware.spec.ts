/**
 * IdempotencyMiddleware Tests
 * @module notification-service/test/unit/interfaces/middlewares
 */
import { describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response } from 'express';
import {
  IdempotencyMiddleware,
  IDEMPOTENCY_KEY_HEADER,
} from '@interfaces/middlewares/idempotency.middleware.js';

function buildReq(
  headers: Record<string, string | string[] | undefined> = {},
): Request & { idempotencyKey?: string } {
  return { headers } as Request & { idempotencyKey?: string };
}

describe('IdempotencyMiddleware', () => {
  const middleware = new IdempotencyMiddleware();
  const res = {} as Response;
  const next: NextFunction = jest.fn() as unknown as NextFunction;

  it('extracts idempotency-key header', () => {
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: 'key-abc' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBe('key-abc');
    expect(next).toHaveBeenCalled();
  });

  it('falls back to x-idempotency-key', () => {
    const req = buildReq({ 'x-idempotency-key': 'key-xyz' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBe('key-xyz');
  });

  it('falls back to Idempotency-Key (case-sensitive)', () => {
    const req = buildReq({ 'Idempotency-Key': 'key-CAP' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBe('key-CAP');
  });

  it('uses first value when header is an array', () => {
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: ['key-1', 'key-2'] });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBe('key-1');
  });

  it('skips when no header', () => {
    const req = buildReq({});
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('trims whitespace', () => {
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: '  key-trim  ' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBe('key-trim');
  });

  it('truncates to 128 chars max', () => {
    const long = 'a'.repeat(200);
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: long });
    middleware.use(req, res, next);
    expect(req.idempotencyKey?.length).toBe(128);
  });

  it('skips empty string', () => {
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: '' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBeUndefined();
  });

  it('skips whitespace-only string', () => {
    const req = buildReq({ [IDEMPOTENCY_KEY_HEADER]: '   ' });
    middleware.use(req, res, next);
    expect(req.idempotencyKey).toBeUndefined();
  });
});
