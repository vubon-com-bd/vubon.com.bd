import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { InvalidNotificationTypeError } from '@domain/errors/notification.errors.js';

describe('NotificationTypeVO', () => {
  it.each([
    'transactional', 'promotional', 'system', 'security', 'reminder', 'alert',
    'welcome', 'order_update', 'payment_update', 'shipping_update',
    'account_update', 'marketing', 'announcement', 'verification',
  ])('accepts "%s"', (s) => {
    expect(NotificationTypeVO.create(s).value).toBe(s);
  });

  it('normalizes to lowercase + trims', () => {
    expect(NotificationTypeVO.create('  TRANSACTIONAL ').value).toBe('transactional');
  });

  it('rejects invalid type', () => {
    expect(() => NotificationTypeVO.create('bogus')).toThrow(InvalidNotificationTypeError);
  });

  it('rejects non-string', () => {
    expect(() => NotificationTypeVO.create(undefined as any)).toThrow(InvalidNotificationTypeError);
  });

  describe('factory', () => {
    it.each([
      ['transactional', 'isTransactional'],
      ['promotional', 'isPromotional'],
      ['security', 'isSecurity'],
    ] as const)('%s factory sets %s', (val, fn) => {
      const vo = (NotificationTypeVO as any)[val]();
      expect((vo[fn] as () => boolean)()).toBe(true);
    });
  });

  describe('canOptOut()', () => {
    it('transactional cannot opt out', () => {
      expect(NotificationTypeVO.transactional().canOptOut()).toBe(false);
    });

    it('security cannot opt out', () => {
      expect(NotificationTypeVO.security().canOptOut()).toBe(false);
    });

    it('promotional can opt out', () => {
      expect(NotificationTypeVO.promotional().canOptOut()).toBe(true);
    });

    it('marketing can opt out', () => {
      expect(NotificationTypeVO.create('marketing').canOptOut()).toBe(true);
    });

    it('system can opt out', () => {
      expect(NotificationTypeVO.system().canOptOut()).toBe(true);
    });
  });
});
