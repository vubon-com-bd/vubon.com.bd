import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { InvalidNotificationCategoryError } from '@domain/errors/notification.errors.js';

describe('NotificationCategoryVO', () => {
  it.each(['auth', 'user', 'order', 'payment', 'shipping', 'product', 'promotion', 'support', 'system', 'security', 'marketing', 'reminder'])(
    'accepts "%s"',
    (s) => {
      expect(NotificationCategoryVO.create(s).value).toBe(s);
    },
  );

  it('rejects invalid', () => {
    expect(() => NotificationCategoryVO.create('random')).toThrow(InvalidNotificationCategoryError);
  });

  it('rejects non-string', () => {
    expect(() => NotificationCategoryVO.create([] as any)).toThrow(InvalidNotificationCategoryError);
  });

  describe('isTransactional', () => {
    it.each(['auth', 'order', 'payment', 'shipping', 'security'])('%s is transactional', (cat) => {
      expect(NotificationCategoryVO.create(cat).isTransactional()).toBe(true);
    });
    it.each(['promotion', 'marketing', 'product'])('%s is not transactional', (cat) => {
      expect(NotificationCategoryVO.create(cat).isTransactional()).toBe(false);
    });
  });

  describe('isMarketing', () => {
    it('promotion and marketing', () => {
      expect(NotificationCategoryVO.create('promotion').isMarketing()).toBe(true);
      expect(NotificationCategoryVO.create('marketing').isMarketing()).toBe(true);
    });
    it('others are not marketing', () => {
      expect(NotificationCategoryVO.create('order').isMarketing()).toBe(false);
    });
  });

  describe('canBeDisabled', () => {
    it('transactional cannot be disabled', () => {
      expect(NotificationCategoryVO.create('order').canBeDisabled()).toBe(false);
      expect(NotificationCategoryVO.create('security').canBeDisabled()).toBe(false);
    });
    it('system cannot be disabled', () => {
      expect(NotificationCategoryVO.create('system').canBeDisabled()).toBe(false);
    });
    it('promotion can be disabled', () => {
      expect(NotificationCategoryVO.create('promotion').canBeDisabled()).toBe(true);
    });
    it('product can be disabled', () => {
      expect(NotificationCategoryVO.create('product').canBeDisabled()).toBe(true);
    });
  });
});
