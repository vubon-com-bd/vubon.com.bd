/**
 * AbandonedCartReminderVO tests (0% → 90%+)
 */
import { describe, it, expect } from '@jest/globals';
import { AbandonedCartReminderVO } from '@domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('AbandonedCartReminderVO', () => {
  it('create() email', () => {
    const vo = AbandonedCartReminderVO.create({ channel: 'email', delayHours: 24 });
    expect(vo.channel).toBe('email');
    expect(vo.delayHours).toBe(24);
    expect(vo.isEmail()).toBe(true);
    expect(vo.isSms()).toBe(false);
    expect(vo.isPush()).toBe(false);
  });

  it('create() sms', () => {
    expect(AbandonedCartReminderVO.create({ channel: 'sms', delayHours: 1 }).isSms()).toBe(true);
  });

  it('create() push', () => {
    expect(AbandonedCartReminderVO.create({ channel: 'push', delayHours: 72 }).isPush()).toBe(true);
  });

  it('throws on invalid channel', () => {
    expect(() =>
      AbandonedCartReminderVO.create({ channel: 'invalid' as never, delayHours: 1 }),
    ).toThrow(ValidationError);
  });

  it('throws on negative delayHours', () => {
    expect(() =>
      AbandonedCartReminderVO.create({ channel: 'email', delayHours: -1 }),
    ).toThrow(ValidationError);
  });

  it('reconstitute()', () => {
    const vo = AbandonedCartReminderVO.reconstitute({ channel: 'email', delayHours: 24 });
    expect(vo.channel).toBe('email');
  });
});
