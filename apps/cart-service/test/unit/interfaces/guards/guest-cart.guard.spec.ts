import { jest } from '@jest/globals';

import { GuestCartGuard } from '../../../../src/module/interfaces/guards/guest-cart.guard.js';

function makeCtx(headers: Record<string, string | undefined>) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
  } as unknown as Parameters<GuestCartGuard['canActivate']>[0];
}

describe('GuestCartGuard', () => {
  const guard = new GuestCartGuard();

  it('returns true when x-guest-token present', () => {
    expect(guard.canActivate(makeCtx({ 'x-guest-token': 'abc123' }))).toBe(true);
  });

  it('throws when header missing', () => {
    expect(() => guard.canActivate(makeCtx({}))).toThrow();
  });

  it('throws when header empty array', () => {
    expect(() => guard.canActivate(makeCtx({ 'x-guest-token': undefined }))).toThrow();
  });
});
