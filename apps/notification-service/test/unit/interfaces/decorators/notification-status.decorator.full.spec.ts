import { describe, it, expect } from '@jest/globals';
import { NotificationStatus } from '../../../../src/module/interfaces/decorators/notification-status.decorator.js';

describe('@NotificationStatus decorator — branch coverage', () => {
  it('returns a decorator function', () => {
    const d = NotificationStatus('pending', 'sent');
    expect(typeof d).toBe('function');
  });

  it('applied to class (no descriptor)', () => {
    @NotificationStatus('pending')
    class C {}
    expect(C).toBeDefined();
  });

  it('applied to method (with descriptor)', () => {
    class C {
      @NotificationStatus('sent')
      m(): string { return 'ok'; }
    }
    expect(new C().m()).toBe('ok');
  });

  it('zero args works', () => {
    const d = NotificationStatus();
    expect(typeof d).toBe('function');
  });
});
