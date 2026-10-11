import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import {
  CorrelationIdMiddleware,
  CORRELATION_ID_HEADER,
} from '../../../../src/module/interfaces/middlewares/correlation-id.middleware.js';

function makeReq(headers: Record<string, string | string[] | undefined> = {}) {
  return { headers } as never;
}
function makeRes() {
  return { setHeader: jest.fn() } as never;
}

describe('CorrelationIdMiddleware — branch coverage', () => {
  let m: CorrelationIdMiddleware;
  beforeEach(() => { m = new CorrelationIdMiddleware(); });

  it('generates UUID when header missing', () => {
    const res = makeRes();
    const next = jest.fn();
    m.use(makeReq({}), res as never, next);
    expect((res as { setHeader: jest.Mock }).setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      expect.any(String),
    );
    expect(next).toHaveBeenCalled();
  });

  it('preserves existing string header', () => {
    const res = makeRes();
    const next = jest.fn();
    m.use(makeReq({ [CORRELATION_ID_HEADER]: 'abc-123' }), res as never, next);
    expect((res as { setHeader: jest.Mock }).setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      'abc-123',
    );
  });

  it('header undefined → generates new', () => {
    const res = makeRes();
    const next = jest.fn();
    m.use(makeReq({ [CORRELATION_ID_HEADER]: undefined }), res as never, next);
    expect((res as { setHeader: jest.Mock }).setHeader).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
