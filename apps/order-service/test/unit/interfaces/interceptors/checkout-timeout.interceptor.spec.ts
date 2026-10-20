/**
 * CheckoutTimeoutInterceptor Tests
 * @module order-service/test/unit/interfaces/interceptors
 */
import { RequestTimeoutException } from '@nestjs/common';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError, delay, firstValueFrom } from 'rxjs';
import { CheckoutTimeoutInterceptor } from '@interfaces/interceptors/checkout-timeout.interceptor.js';

const mockContext = {} as ExecutionContext;

describe('CheckoutTimeoutInterceptor', () => {
  it('should pass through response within timeout', async () => {
    const interceptor = new CheckoutTimeoutInterceptor(1000);
    const next: CallHandler<unknown> = { handle: () => of({ data: 'ok' }) };
    const result$ = interceptor.intercept(mockContext, next);
    expect(await firstValueFrom(result$)).toEqual({ data: 'ok' });
  });

  it('should throw RequestTimeoutException on timeout', async () => {
    const interceptor = new CheckoutTimeoutInterceptor(50);
    const next: CallHandler<unknown> = {
      handle: () => of({ data: 'slow' }).pipe(delay(200)),
    };
    const result$ = interceptor.intercept(mockContext, next);
    await expect(firstValueFrom(result$)).rejects.toThrow(RequestTimeoutException);
  });

  it('should preserve non-timeout errors', async () => {
    const interceptor = new CheckoutTimeoutInterceptor(1000);
    const next: CallHandler<unknown> = {
      handle: () => throwError(() => new Error('custom error')),
    };
    const result$ = interceptor.intercept(mockContext, next);
    await expect(firstValueFrom(result$)).rejects.toThrow('custom error');
  });

  it('should construct with default timeout', () => {
    expect(new CheckoutTimeoutInterceptor()).toBeInstanceOf(CheckoutTimeoutInterceptor);
  });
});
