import { describe, it, expect } from '@jest/globals';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform/notification';

describe('NotificationCategoryVO all predicates', () => {
  const allCategories = Object.values(NOTIFICATION_CATEGORY);

  for (const cat of allCategories) {
    it(`isX for ${cat}`, () => {
      const vo = NotificationCategoryVO.reconstitute(cat);
      expect(vo.value).toBe(cat);
    });
  }

  it('isAuth + isSystemCategory', () => {
    expect(NotificationCategoryVO.auth().isAuth()).toBe(true);
    expect(NotificationCategoryVO.auth().isSystemCategory()).toBe(true);
  });

  it('isUser', () => {
    expect(NotificationCategoryVO.user().isUser()).toBe(true);
  });

  it('isShipping/Product/Promotion/Support/Reminder', () => {
    expect(NotificationCategoryVO.shipping().isShipping()).toBe(true);
    expect(NotificationCategoryVO.product().isProduct()).toBe(true);
    expect(NotificationCategoryVO.promotion().isPromotion()).toBe(true);
    expect(NotificationCategoryVO.support().isSupport()).toBe(true);
    expect(NotificationCategoryVO.reminder().isReminder()).toBe(true);
  });

  it('isMarketing', () => {
    expect(NotificationCategoryVO.marketing().isMarketing()).toBe(true);
  });
});

describe('NotificationPriorityVO all weights', () => {
  it('all named constructors + weights', () => {
    const all = [
      NotificationPriorityVO.critical(),
      NotificationPriorityVO.high(),
      NotificationPriorityVO.normal(),
      NotificationPriorityVO.low(),
      NotificationPriorityVO.silent(),
    ];
    for (const p of all) {
      expect(p.weight()).toBeGreaterThan(0);
      expect(p.ttlSeconds()).toBeGreaterThan(0);
    }
  });

  it('all predicates', () => {
    expect(NotificationPriorityVO.critical().isCritical()).toBe(true);
    expect(NotificationPriorityVO.high().isHigh()).toBe(true);
    expect(NotificationPriorityVO.normal().isNormal()).toBe(true);
    expect(NotificationPriorityVO.low().isLow()).toBe(true);
    expect(NotificationPriorityVO.silent().isSilent()).toBe(true);
  });

  it('isUrgent', () => {
    expect(NotificationPriorityVO.critical().isUrgent()).toBe(true);
    expect(NotificationPriorityVO.high().isUrgent()).toBe(true);
    expect(NotificationPriorityVO.normal().isUrgent()).toBe(false);
  });
});

describe('WebhookEventVO all', () => {
  it('eventDomain/eventAction', () => {
    const e = WebhookEventVO.orderCreated();
    expect(e.eventDomain).toBe('order');
    expect(e.eventAction).toBe('created');
  });

  it('events without dot', () => {
    const e = WebhookEventVO.reconstitute('nodot');
    expect(e.eventDomain).toBe('nodot');
    expect(e.eventAction).toBe('');
  });

  it('all named constructors', () => {
    expect(WebhookEventVO.orderCreated().value).toBe('order.created');
    expect(WebhookEventVO.orderUpdated().value).toBe('order.updated');
    expect(WebhookEventVO.orderCancelled().value).toBe('order.cancelled');
    expect(WebhookEventVO.orderDelivered().value).toBe('order.delivered');
    expect(WebhookEventVO.paymentSucceeded().value).toBe('payment.succeeded');
    expect(WebhookEventVO.paymentFailed().value).toBe('payment.failed');
    expect(WebhookEventVO.paymentRefunded().value).toBe('payment.refunded');
    expect(WebhookEventVO.userCreated().value).toBe('user.created');
    expect(WebhookEventVO.userUpdated().value).toBe('user.updated');
    expect(WebhookEventVO.userDeleted().value).toBe('user.deleted');
    expect(WebhookEventVO.productCreated().value).toBe('product.created');
    expect(WebhookEventVO.productUpdated().value).toBe('product.updated');
    expect(WebhookEventVO.productDeleted().value).toBe('product.deleted');
    expect(WebhookEventVO.vendorApproved().value).toBe('vendor.approved');
    expect(WebhookEventVO.vendorRejected().value).toBe('vendor.rejected');
    expect(WebhookEventVO.shipmentCreated().value).toBe('shipment.created');
    expect(WebhookEventVO.shipmentDelivered().value).toBe('shipment.delivered');
  });
});
