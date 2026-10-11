import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CorrelationIdMiddleware, CORRELATION_ID_HEADER } from '../../../../src/module/interfaces/middlewares/correlation-id.middleware.js';

function makeReq(headers: Record<string, string | string[] | undefined> = {}) {
  return { headers } as never;
}
function makeRes() {
  return { setHeader: jest.fn() } as never;
}

describe('CorrelationIdMiddleware', () => {
  let m: CorrelationIdMiddleware;
  beforeEach(() => { m = new CorrelationIdMiddleware(); });

  it('generates new UUID when header missing', () => {
    const res = makeRes();
    const next = jest.fn();
    m.use(makeReq({}) as never, res as never, next);
    expect((res as { setHeader: jest.Mock }).setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      expect.any(String),
    );
    expect(next).toHaveBeenCalled();
  });

  it('preserves existing header', () => {
    const res = makeRes();
    const next = jest.fn();
    m.use(makeReq({ [CORRELATION_ID_HEADER]: 'abc-123' }) as never, res as never, next);
    expect((res as { setHeader: jest.Mock }).setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      'abc-123',
    );
  });
});
