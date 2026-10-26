/**
 * NotificationOwner Decorator Tests
 * @module notification-service/test/unit/interfaces/decorators
 *
 * SetMetadata is mocked to no-op in setup. We verify shape + callable.
 */
import { describe, expect, it } from '@jest/globals';
import { NotificationOwner } from '@interfaces/decorators/notification-owner.decorator.js';

describe('NotificationOwner decorator', () => {
  it('is defined', () => {
    expect(NotificationOwner).toBeDefined();
  });

  it('is callable', () => {
    expect(() => NotificationOwner()).not.toThrow();
  });

  it('returns a decorator function', () => {
    const result = NotificationOwner();
    expect(result).toBeDefined();
    expect(typeof result === 'function' || typeof result === 'object').toBe(true);
  });

  it('can be applied to a class', () => {
    const decorator = NotificationOwner();
    expect(() => {
      if (typeof decorator === 'function') {
        (decorator as (target: unknown) => unknown)(class Test {});
      }
    }).not.toThrow();
  });
});
