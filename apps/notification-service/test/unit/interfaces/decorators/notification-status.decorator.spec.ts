import { describe, it, expect } from '@jest/globals';
import { NotificationStatus } from '../../../../src/module/interfaces/decorators/notification-status.decorator.js';

describe('@NotificationStatus decorator', () => {
  it('returns a decorator function', () => {
    const dec = NotificationStatus('pending', 'sent');
    expect(typeof dec).toBe('function');
  });

  it('can be applied to a class', () => {
    @NotificationStatus('pending')
    class TestClass {}
    expect(TestClass).toBeDefined();
  });

  it('can be applied to a method', () => {
    class TestClass {
      @NotificationStatus('sent')
      method() { return true; }
    }
    expect(new TestClass().method()).toBe(true);
  });
});
