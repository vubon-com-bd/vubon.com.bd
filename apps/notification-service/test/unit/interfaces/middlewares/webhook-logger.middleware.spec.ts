/**
 * WebhookLoggerMiddleware Tests
 * @module notification-service/test/unit/interfaces/middlewares
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response } from 'express';
import { WebhookLoggerMiddleware } from '@interfaces/middlewares/webhook-logger.middleware.js';

interface MockResponse extends Partial<Response> {
  statusCode: number;
  on: jest.Mock;
  emitFinish: () => void;
}

function buildRes(): MockResponse {
  let finishHandler: (() => void) | undefined;
  return {
    statusCode: 200,
    on: jest.fn((event: string, handler: () => void) => {
      if (event === 'finish') finishHandler = handler;
    }) as never,
    emitFinish: () => finishHandler?.(),
  };
}

function buildReq(provider = 'sendgrid'): Request {
  return {
    params: { provider },
    path: '/webhooks/providers/sendgrid',
    headers: {
      'content-type': 'application/json',
      'content-length': '128',
    },
  } as unknown as Request;
}

describe('WebhookLoggerMiddleware', () => {
  let middleware: WebhookLoggerMiddleware;
  let logSpy: jest.Mock;
  let warnSpy: jest.Mock;

  beforeEach(() => {
    middleware = new WebhookLoggerMiddleware();
    logSpy = jest.fn();
    warnSpy = jest.fn();
    (middleware as unknown as { logger: { log: jest.Mock; warn: jest.Mock } }).logger = {
      log: logSpy,
      warn: warnSpy,
    };
  });

  it('logs inbound + outbound on success', () => {
    const req = buildReq('sendgrid');
    const res = buildRes();
    const next = jest.fn() as unknown as NextFunction;

    middleware.use(req, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('Webhook inbound');
    expect(logSpy.mock.calls[0]?.[0]).toContain('provider=sendgrid');

    res.emitFinish();
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy.mock.calls[1]?.[0]).toContain('Webhook outbound');
    expect(logSpy.mock.calls[1]?.[0]).toContain('status=200');
  });

  it('uses warn on error status', () => {
    const req = buildReq('twilio');
    const res = buildRes();
    res.statusCode = 401;
    const next = jest.fn() as unknown as NextFunction;

    middleware.use(req, res as unknown as Response, next);
    res.emitFinish();

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('status=401');
  });

  it('uses "unknown" when provider param missing', () => {
    const req = { params: {}, path: '/x', headers: {} } as unknown as Request;
    const res = buildRes();
    middleware.use(req, res as unknown as Response, jest.fn() as never);

    expect(logSpy.mock.calls[0]?.[0]).toContain('provider=unknown');
  });

  it('defaults content-type + size when headers missing', () => {
    const req = { params: { provider: 'fcm' }, path: '/x', headers: {} } as unknown as Request;
    const res = buildRes();
    middleware.use(req, res as unknown as Response, jest.fn() as never);
    expect(logSpy.mock.calls[0]?.[0]).toContain('size=0B');
    expect(logSpy.mock.calls[0]?.[0]).toContain('type=unknown');
  });
});
