import { describe, it, expect } from '@jest/globals';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform/notification';

describe('NotificationTypeVO', () => {
  it('create valid', () => {
    expect(NotificationTypeVO.create(NOTIFICATION_TYPE.TRANSACTIONAL).value).toBe('transactional');
  });
  it('create invalid throws', () => {
    expect(() => NotificationTypeVO.create('bad')).toThrow();
  });
  it('reconstitute skips validation', () => {
    expect(NotificationTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(NotificationTypeVO.transactional().value).toBe('transactional');
    expect(NotificationTypeVO.promotional().value).toBe('promotional');
    expect(NotificationTypeVO.system().value).toBe('system');
    expect(NotificationTypeVO.security().value).toBe('security');
    expect(NotificationTypeVO.reminder().value).toBe('reminder');
    expect(NotificationTypeVO.alert().value).toBe('alert');
    expect(NotificationTypeVO.welcome().value).toBe('welcome');
    expect(NotificationTypeVO.orderUpdate().value).toBe('order_update');
    expect(NotificationTypeVO.paymentUpdate().value).toBe('payment_update');
    expect(NotificationTypeVO.shippingUpdate().value).toBe('shipping_update');
    expect(NotificationTypeVO.accountUpdate().value).toBe('account_update');
    expect(NotificationTypeVO.marketing().value).toBe('marketing');
    expect(NotificationTypeVO.announcement().value).toBe('announcement');
    expect(NotificationTypeVO.verification().value).toBe('verification');
  });
  it('predicates', () => {
    expect(NotificationTypeVO.transactional().isTransactional()).toBe(true);
    expect(NotificationTypeVO.promotional().isPromotional()).toBe(true);
    expect(NotificationTypeVO.system().isSystem()).toBe(true);
    expect(NotificationTypeVO.security().isSecurity()).toBe(true);
    expect(NotificationTypeVO.reminder().isReminder()).toBe(true);
    expect(NotificationTypeVO.alert().isAlert()).toBe(true);
    expect(NotificationTypeVO.welcome().isWelcome()).toBe(true);
    expect(NotificationTypeVO.orderUpdate().isOrderUpdate()).toBe(true);
    expect(NotificationTypeVO.paymentUpdate().isPaymentUpdate()).toBe(true);
    expect(NotificationTypeVO.shippingUpdate().isShippingUpdate()).toBe(true);
    expect(NotificationTypeVO.accountUpdate().isAccountUpdate()).toBe(true);
    expect(NotificationTypeVO.marketing().isMarketing()).toBe(true);
    expect(NotificationTypeVO.announcement().isAnnouncement()).toBe(true);
    expect(NotificationTypeVO.verification().isVerification()).toBe(true);
  });
  it('canOptOut for marketing/promotional', () => {
    expect(NotificationTypeVO.marketing().canOptOut()).toBe(true);
    expect(NotificationTypeVO.promotional().canOptOut()).toBe(true);
    expect(NotificationTypeVO.transactional().canOptOut()).toBe(false);
  });
});
