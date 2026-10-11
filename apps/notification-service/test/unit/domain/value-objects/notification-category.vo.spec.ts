import { describe, it, expect } from '@jest/globals';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';

describe('NotificationCategoryVO', () => {
  it('create + reconstitute', () => {
    expect(NotificationCategoryVO.create('order').value).toBe('order');
    expect(() => NotificationCategoryVO.create('bad')).toThrow();
    expect(NotificationCategoryVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(NotificationCategoryVO.auth().value).toBe('auth');
    expect(NotificationCategoryVO.user().value).toBe('user');
    expect(NotificationCategoryVO.order().value).toBe('order');
    expect(NotificationCategoryVO.payment().value).toBe('payment');
    expect(NotificationCategoryVO.shipping().value).toBe('shipping');
    expect(NotificationCategoryVO.product().value).toBe('product');
    expect(NotificationCategoryVO.promotion().value).toBe('promotion');
    expect(NotificationCategoryVO.support().value).toBe('support');
    expect(NotificationCategoryVO.system().value).toBe('system');
    expect(NotificationCategoryVO.security().value).toBe('security');
    expect(NotificationCategoryVO.marketing().value).toBe('marketing');
    expect(NotificationCategoryVO.reminder().value).toBe('reminder');
  });
  it('predicates', () => {
    expect(NotificationCategoryVO.auth().isAuth()).toBe(true);
    expect(NotificationCategoryVO.order().isOrder()).toBe(true);
    expect(NotificationCategoryVO.payment().isPayment()).toBe(true);
    expect(NotificationCategoryVO.system().isSystem()).toBe(true);
  });
  it('system categories + canBeDisabledByUser', () => {
    expect(NotificationCategoryVO.system().isSystemCategory()).toBe(true);
    expect(NotificationCategoryVO.security().isSystemCategory()).toBe(true);
    expect(NotificationCategoryVO.auth().isSystemCategory()).toBe(true);
    expect(NotificationCategoryVO.order().isSystemCategory()).toBe(false);
    expect(NotificationCategoryVO.order().canBeDisabledByUser()).toBe(true);
    expect(NotificationCategoryVO.system().canBeDisabledByUser()).toBe(false);
  });
});
