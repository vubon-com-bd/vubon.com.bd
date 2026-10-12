import { IdempotencyKey } from '../../../../src/module/interfaces/decorators/idempotency-key.decorator.js';

describe('IdempotencyKey decorator', () => {
  it('is exported as a function', () => {
    expect(typeof IdempotencyKey).toBe('function');
  });

  it('is created via createParamDecorator', () => {
    // createParamDecorator returns a factory function
    expect(IdempotencyKey).toBeDefined();
    // Decorator has internal .KEY property or similar
    expect(IdempotencyKey).toBeInstanceOf(Function);
  });

  it('is usable as parameter decorator', () => {
    // Just check the decorator doesn't crash when used
    expect(() => {
      const decorator = IdempotencyKey as unknown as (target: unknown, key: string, index: number) => void;
      const dummy = function () { /* noop */ };
      decorator(dummy, 'method', 0);
    }).not.toThrow();
  });
});
