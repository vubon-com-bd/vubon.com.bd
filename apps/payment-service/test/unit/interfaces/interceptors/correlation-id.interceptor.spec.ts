/**
 * CorrelationIdInterceptor — unit tests
 * @module payment-service/test/unit/interfaces/interceptors
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { firstValueFrom, of } from 'rxjs';
import {
  CorrelationIdInterceptor,
  CORRELATION_ID_HEADER,
} from '@interfaces/interceptors/correlation-id.interceptor';
import type { ExecutionContext, CallHandler } from '@nestjs/common';

function mockCtx(
  headers: Record<string, string | string[] | undefined>,
  setHeader: jest.Mock,
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
      getResponse: () => ({ setHeader }),
    }),
  } as unknown as ExecutionContext;
}

function mockNext(): CallHandler {
  return { handle: () => of({ ok: 1 }) };
}

describe('CorrelationIdInterceptor', () => {
  let interceptor: CorrelationIdInterceptor;
  let setHeader: jest.Mock;

  beforeEach(() => {
    interceptor = new CorrelationIdInterceptor();
    setHeader = jest.fn();
  });

  it('uses incoming correlation-id', async () => {
    const obs = interceptor.intercept(
      mockCtx({ 'x-correlation-id': 'cid-abc' }, setHeader),
      mockNext(),
    );
    await firstValueFrom(obs);
    expect(setHeader).toHaveBeenCalledWith(CORRELATION_ID_HEADER, 'cid-abc');
  });

  it('generates new cid when none provided', async () => {
    const obs = interceptor.intercept(mockCtx({}, setHeader), mockNext());
    await firstValueFrom(obs);
    expect(setHeader).toHaveBeenCalledWith(CORRELATION_ID_HEADER, expect.any(String));
    const [, generated] = setHeader.mock.calls[0];
    expect(typeof generated).toBe('string');
    expect(generated.length).toBeGreaterThan(20);
  });

  it('generates new cid when header empty', async () => {
    const obs = interceptor.intercept(
      mockCtx({ 'x-correlation-id': '' }, setHeader),
      mockNext(),
    );
    await firstValueFrom(obs);
    expect(setHeader).toHaveBeenCalled();
  });
});
