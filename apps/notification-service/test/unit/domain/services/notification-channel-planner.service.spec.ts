/**
 * NotificationChannelPlannerService — fan-out planning
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationChannelPlannerService } from '../../../../src/module/domain/services/notification-channel-planner.service.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';

const allChannels = [
  NotificationChannelVO.email(),
  NotificationChannelVO.sms(),
  NotificationChannelVO.push(),
  NotificationChannelVO.inApp(),
];

describe('NotificationChannelPlannerService', () => {
  it('should use all channels for security type', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'security',
        isSecurity: () => true,
        isTransactional: () => false,
        isMarketing: () => false,
        isPromotional: () => false,
        isAnnouncement: () => false,
        isReminder: () => false,
        isAlert: () => true,
        isVerification: () => false,
        isWelcome: () => false,
        isOrderUpdate: () => false,
        isPaymentUpdate: () => false,
        isShippingUpdate: () => false,
      } as never,
      availableChannels: allChannels,
    });
    expect(plan.ordered.length).toBeGreaterThan(0);
    expect(plan.reason).toMatch(/type_preference/);
  });

  it('should limit marketing to email + push + in_app', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'marketing',
        isMarketing: () => true,
        isSecurity: () => false,
        isTransactional: () => false,
        isPromotional: () => false,
        isAnnouncement: () => false,
        isReminder: () => false,
        isAlert: () => false,
        isVerification: () => false,
        isWelcome: () => false,
        isOrderUpdate: () => false,
        isPaymentUpdate: () => false,
        isShippingUpdate: () => false,
      } as never,
      availableChannels: allChannels,
    });
    const values = plan.ordered.map((c) => c.value);
    expect(values).toContain('email');
    expect(values).toContain('push');
    expect(values).toContain('in_app');
    expect(values).not.toContain('sms');
  });

  it('should honor explicit channels', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: { value: 'transactional', isTransactional: () => true } as never,
      availableChannels: allChannels,
      requestedChannels: [NotificationChannelVO.email()],
    });
    expect(plan.ordered.length).toBe(1);
    expect(plan.ordered[0]?.value).toBe('email');
    expect(plan.reason).toBe('explicit_channels');
  });
});
