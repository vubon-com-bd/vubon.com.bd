/**
 * TokenRefreshInterceptor — Unit Tests
 */
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { TokenRefreshInterceptor } from './token-refresh.interceptor';

const buildContext = (user: {
  sessionId?: string;
  sessionExpiresAt?: number;
}): {
  switchToHttp: () => {
    getRequest: () => { user: typeof user };
    getResponse: () => { setHeader: jest.Mock };
  };
} => {
  const setHeader = jest.fn();
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
      getResponse: () => ({ setHeader }),
    }),
  };
};

describe('TokenRefreshInterceptor', () => {
  let interceptor: TokenRefreshInterceptor;

  beforeEach(() => {
    interceptor = new TokenRefreshInterceptor();
  });

  it('should not touch response when no sessionId', async () => {
    const ctx = buildContext({});
    const next = { handle: jest.fn(() => of({ ok: true })) };

    const result$ = interceptor.intercept(ctx as never, next as never);
    await firstValueFrom(result$);

    expect(ctx.switchToHttp().getResponse().setHeader).not.toHaveBeenCalled();
  });

  it('should not set header when TTL is plenty', async () => {
    const ctx = buildContext({
      sessionId: 's-1',
      sessionExpiresAt: Date.now() + 60 * 60 * 1000, // 1h left
    });
    const next = { handle: jest.fn(() => of({ ok: true })) };

    const result$ = interceptor.intercept(ctx as never, next as never);
    await firstValueFrom(result$);

    expect(ctx.switchToHttp().getResponse().setHeader).not.toHaveBeenCalled();
  });

  it('should set X-Session-Slid header when TTL below threshold', async () => {
    const ctx = buildContext({
      sessionId: 's-1',
      sessionExpiresAt: Date.now() + 60 * 1000, // 1 min left
    });
    const next = { handle: jest.fn(() => of({ ok: true })) };

    const result$ = interceptor.intercept(ctx as never, next as never);
    await firstValueFrom(result$);

    expect(ctx.switchToHttp().getResponse().setHeader).toHaveBeenCalledWith(
      'X-Session-Slid',
      'true',
    );
  });

  it('should not set header when sessionExpiresAt missing', async () => {
    const ctx = buildContext({ sessionId: 's-1' });
    const next = { handle: jest.fn(() => of({ ok: true })) };

    const result$ = interceptor.intercept(ctx as never, next as never);
    await firstValueFrom(result$);

    expect(ctx.switchToHttp().getResponse().setHeader).not.toHaveBeenCalled();
  });
});
