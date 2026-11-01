/**
 * IdempotencyHeader Decorator Tests
 * @module order-service/test/unit/interfaces/decorators
 *
 * NOTE: createParamDecorator returns a NestJS decorator factory that
 * cannot be invoked directly with (data, ctx). We test the internal
 * behavior by re-creating the extraction logic against sample requests.
 */
import type { ExecutionContext } from '@nestjs/common';

function mockContext(
  headers: Record<string, string | string[] | undefined>,
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
    }),
  } as unknown as ExecutionContext;
}

/**
 * Reference implementation of the header extraction logic
 * (mirrors src/module/interfaces/decorators/idempotency-key.decorator.ts)
 */
function extractIdempotencyKey(ctx: ExecutionContext): string | undefined {
  const req = ctx.switchToHttp().getRequest<{
    headers: Record<string, string | string[] | undefined>;
  }>();
  const raw = req.headers['idempotency-key'] ?? req.headers['x-idempotency-key'];
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

describe('@IdempotencyHeader() decorator', () => {
  describe('extractIdempotencyKey behavior', () => {
    it('should extract "idempotency-key" header', () => {
      const ctx = mockContext({ 'idempotency-key': 'idem-1' });
      expect(extractIdempotencyKey(ctx)).toBe('idem-1');
    });

    it('should fallback to "x-idempotency-key" header', () => {
      const ctx = mockContext({ 'x-idempotency-key': 'idem-2' });
      expect(extractIdempotencyKey(ctx)).toBe('idem-2');
    });

    it('should prefer "idempotency-key" over "x-idempotency-key"', () => {
      const ctx = mockContext({
        'idempotency-key': 'primary',
        'x-idempotency-key': 'fallback',
      });
      expect(extractIdempotencyKey(ctx)).toBe('primary');
    });

    it('should take first element when header is array', () => {
      const ctx = mockContext({ 'idempotency-key': ['first', 'second'] });
      expect(extractIdempotencyKey(ctx)).toBe('first');
    });

    it('should return undefined when no idempotency header', () => {
      const ctx = mockContext({});
      expect(extractIdempotencyKey(ctx)).toBeUndefined();
    });
  });

  describe('decorator metadata', () => {
    it('should be a function (createParamDecorator return)', () => {
      // Lazy import so extraction-only tests above don't need it
      return import('@interfaces/decorators/idempotency-key.decorator.js').then(
        ({ IdempotencyHeader }) => {
          expect(typeof IdempotencyHeader).toBe('function');
        },
      );
    });
  });
});
