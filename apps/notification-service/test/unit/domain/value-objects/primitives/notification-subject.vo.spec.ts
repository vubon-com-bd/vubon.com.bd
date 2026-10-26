import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { InvalidNotificationSubjectError } from '@domain/errors/notification.errors.js';

describe('NotificationSubjectVO', () => {
  it('accepts valid subject', () => {
    expect(NotificationSubjectVO.create('Hello there').value).toBe('Hello there');
  });

  it('trims whitespace', () => {
    expect(NotificationSubjectVO.create('  Hi  ').value).toBe('Hi');
  });

  it('rejects empty', () => {
    expect(() => NotificationSubjectVO.create('')).toThrow(InvalidNotificationSubjectError);
  });

  it('rejects whitespace-only', () => {
    expect(() => NotificationSubjectVO.create('    ')).toThrow(InvalidNotificationSubjectError);
  });

  it('rejects too long (>200)', () => {
    expect(() => NotificationSubjectVO.create('a'.repeat(201))).toThrow(InvalidNotificationSubjectError);
  });

  it('accepts exactly 200 chars', () => {
    expect(NotificationSubjectVO.create('a'.repeat(200)).value.length).toBe(200);
  });

  it('rejects newlines', () => {
    expect(() => NotificationSubjectVO.create('line1\nline2')).toThrow(InvalidNotificationSubjectError);
  });

  it('rejects carriage return', () => {
    expect(() => NotificationSubjectVO.create('line1\rline2')).toThrow(InvalidNotificationSubjectError);
  });

  it('rejects non-string', () => {
    expect(() => NotificationSubjectVO.create(42 as any)).toThrow(InvalidNotificationSubjectError);
  });

  it('reconstitute skips validation', () => {
    expect(NotificationSubjectVO.reconstitute('x').value).toBe('x');
  });
});
