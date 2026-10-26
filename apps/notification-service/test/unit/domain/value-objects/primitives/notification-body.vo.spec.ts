import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { InvalidNotificationBodyError } from '@domain/errors/notification.errors.js';

describe('NotificationBodyVO', () => {
  it('accepts valid body', () => {
    expect(NotificationBodyVO.create('Hello, world!').value).toBe('Hello, world!');
  });

  it('trims whitespace', () => {
    expect(NotificationBodyVO.create('  hi  ').value).toBe('hi');
  });

  it('rejects empty', () => {
    expect(() => NotificationBodyVO.create('')).toThrow(InvalidNotificationBodyError);
  });

  it('rejects whitespace-only', () => {
    expect(() => NotificationBodyVO.create('  ')).toThrow(InvalidNotificationBodyError);
  });

  it('rejects too long (>500000)', () => {
    expect(() => NotificationBodyVO.create('a'.repeat(500_001))).toThrow(InvalidNotificationBodyError);
  });

  it('accepts exactly 500000 chars', () => {
    const vo = NotificationBodyVO.create('a'.repeat(500_000));
    expect(vo.value.length).toBe(500_000);
  });

  it('rejects non-string', () => {
    expect(() => NotificationBodyVO.create(null as any)).toThrow(InvalidNotificationBodyError);
  });

  describe('isEmpty', () => {
    it('false for non-empty', () => {
      expect(NotificationBodyVO.create('x').isEmpty).toBe(false);
    });
  });

  describe('length', () => {
    it('returns value length', () => {
      expect(NotificationBodyVO.create('hello').length).toBe(5);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(NotificationBodyVO.reconstitute('').value).toBe('');
    });
  });
});
