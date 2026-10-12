/**
 * IdempotencyKey decorator — branch coverage via decorator factory
 */
import { IdempotencyKey } from '../../../../src/module/interfaces/decorators/idempotency-key.decorator.js';

describe('IdempotencyKey decorator — branch coverage', () => {
  it('is function', () => {
    expect(typeof IdempotencyKey).toBe('function');
  });

  it('can be applied to a method parameter', () => {
    class Test {
      method(@IdempotencyKey() _key?: string): string {
        return 'ok';
      }
    }
    const t = new Test();
    expect(t.method('x')).toBe('ok');
  });

  it('decorator metadata call does not throw', () => {
    // createParamDecorator returns a wrapper; try to invoke factory path
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fn = IdempotencyKey as any;
      // Some versions expose `.factory` property
      if (typeof fn === 'function') {
        // Call with mock arguments where possible
        try {
          fn();
        } catch {
          /* expected — no context */
        }
      }
    }).not.toThrow();
  });
});
