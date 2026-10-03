import { jest } from '@jest/globals';
import { RequestTimeoutException, type CallHandler, type ExecutionContext } from '@nestjs/common';
import { Observable, of, firstValueFrom, throwError } from 'rxjs';
import { CheckoutTimeoutInterceptor } from '../../../../src/module/interfaces/interceptors/checkout-timeout.interceptor.js';

const ctx = {} as ExecutionContext;

describe('CheckoutTimeoutInterceptor', () => {
  let interceptor: CheckoutTimeoutInterceptor;

  beforeEach(() => {
    interceptor = new CheckoutTimeoutInterceptor();
    jest.useRealTimers();
  });

  it('fast response passes through', async () => {
    const result = await interceptor.intercept(ctx, { handle: () => of({ ok: true }) });
    expect(await firstValueFrom(result)).toEqual({ ok: true });
  });

  it('non-timeout error propagates', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => new Error('other-error')),
    };
    const result = await interceptor.intercept(ctx, next);
    await expect(firstValueFrom(result)).rejects.toThrow('other-error');
  });

  it('timeout triggers RequestTimeoutException (fake timers)', () => {
    jest.useFakeTimers();

    const never$ = new Observable<unknown>(() => {
      /* never emits */
    });
    const next: CallHandler = { handle: () => never$ };

    const observable$ = interceptor.intercept(ctx, next);

    let caught: unknown;
    let completed = false;

    observable$.subscribe({
      error: (err: unknown) => {
        caught = err;
        completed = true;
      },
      complete: () => {
        completed = true;
      },
    });

    jest.advanceTimersByTime(10_500);

    expect(completed).toBe(true);
    expect(caught).toBeInstanceOf(RequestTimeoutException);

    jest.useRealTimers();
  });
});
