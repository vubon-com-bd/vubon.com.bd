import { describe, it, expect } from '@jest/globals';
import { NotificationChannelPlannerService } from '../../../../src/module/domain/services/notification-channel-planner.service.js';
import { NotificationDispatcherService } from '../../../../src/module/domain/services/notification-dispatcher.service.js';
import { NotificationRateLimitService } from '../../../../src/module/domain/services/notification-rate-limit.service.js';
import { NotificationRetryPolicyService } from '../../../../src/module/domain/services/notification-retry-policy.service.js';
import { NotificationPreferenceCheckerService } from '../../../../src/module/domain/services/notification-preference-checker.service.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';

const ch = (v: string) => NotificationChannelVO.reconstitute(v);

describe('ChannelPlanner — uncovered branches 39,55,84-93', () => {
  it('explicit channels no matching → reason no_matching_channels', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: { value: 'transactional', isTransactional: () => true } as never,
      availableChannels: [ch('email')],
      requestedChannels: [ch('sms')],
    });
    expect(plan.reason).toBe('no_matching_channels');
    expect(plan.primary).toBeNull();
    expect(plan.fallbacks).toEqual([]);
  });

  it('preferred empty after filter → no_matching_channels', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'marketing',
        isMarketing: () => true,
        isSecurity: () => false, isVerification: () => false, isAlert: () => false,
        isPromotional: () => false, isAnnouncement: () => false,
        isReminder: () => false,
        isTransactional: () => false, isOrderUpdate: () => false,
        isPaymentUpdate: () => false, isShippingUpdate: () => false,
        isWelcome: () => false,
      } as never,
      availableChannels: [ch('sms')],
    });
    expect(plan.reason).toBe('no_matching_channels');
  });

  it('preferredForType default → returns []', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'unknown', isMarketing: () => false, isSecurity: () => false,
        isVerification: () => false, isAlert: () => false,
        isPromotional: () => false, isAnnouncement: () => false,
        isReminder: () => false, isTransactional: () => false,
        isOrderUpdate: () => false, isPaymentUpdate: () => false,
        isShippingUpdate: () => false, isWelcome: () => false,
      } as never,
      availableChannels: [ch('email'), ch('push')],
    });
    expect(plan.ordered.length).toBe(2);
  });

  it('welcome type → email + in_app', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'welcome', isWelcome: () => true,
        isMarketing: () => false, isSecurity: () => false,
        isVerification: () => false, isAlert: () => false,
        isPromotional: () => false, isAnnouncement: () => false,
        isReminder: () => false, isTransactional: () => false,
        isOrderUpdate: () => false, isPaymentUpdate: () => false,
        isShippingUpdate: () => false,
      } as never,
      availableChannels: [ch('email'), ch('in_app'), ch('sms')],
    });
    const vals = plan.ordered.map((c) => c.value);
    expect(vals).toContain('email');
    expect(vals).toContain('in_app');
    expect(vals).not.toContain('sms');
  });

  it('reminder type', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'reminder', isReminder: () => true,
        isMarketing: () => false, isSecurity: () => false,
        isVerification: () => false, isAlert: () => false,
        isPromotional: () => false, isAnnouncement: () => false,
        isTransactional: () => false, isOrderUpdate: () => false,
        isPaymentUpdate: () => false, isShippingUpdate: () => false,
        isWelcome: () => false,
      } as never,
      availableChannels: [ch('email'), ch('push'), ch('in_app')],
    });
    expect(plan.ordered.length).toBe(2);
  });

  it('transactional type preferred', () => {
    const plan = NotificationChannelPlannerService.plan({
      type: {
        value: 'transactional', isTransactional: () => true,
        isMarketing: () => false, isSecurity: () => false,
        isVerification: () => false, isAlert: () => false,
        isPromotional: () => false, isAnnouncement: () => false,
        isReminder: () => false, isOrderUpdate: () => false,
        isPaymentUpdate: () => false, isShippingUpdate: () => false,
        isWelcome: () => false,
      } as never,
      availableChannels: [ch('email'), ch('sms'), ch('push'), ch('in_app')],
    });
    expect(plan.ordered.length).toBeGreaterThan(0);
  });

  it('orderChannels unknown weight fallback 99', () => {
    const ordered = NotificationChannelPlannerService.orderChannels([
      ch('unknown_ch'),
      ch('email'),
    ]);
    expect(ordered[0]?.value).toBe('email');
  });
});

describe('Dispatcher — uncovered branches 63-65,92,98-99,124,130-131,156,185-191', () => {
  it('unknown channel type throws', () => {
    const fakeChannel = {
      value: 'unknown',
      isEmail: () => false, isSms: () => false, isPush: () => false,
      isInApp: () => false, isWebhook: () => false, isWhatsapp: () => false,
    } as never;
    expect(() =>
      NotificationDispatcherService.select({ channel: fakeChannel }),
    ).toThrow();
  });

  it('email preferred SES', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('email'), preferredProvider: 'ses', enabled: { email: true },
    });
    expect(r.providerName).toBe('ses');
    expect(r.reason).toBe('preferred_provider');
  });

  it('push preferred provider', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('push'), preferredProvider: 'onesignal', enabled: { push: true },
    });
    expect(r.providerName).toBe('onesignal');
  });

  it('push APNs when usesApns', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('push'),
      pushPlatform: { usesApns: () => true } as never,
      enabled: { push: true },
    });
    expect(r.providerName).toBe('apns');
    expect(r.reason).toBe('ios_or_macos_platform');
  });

  it('in-app disabled throws', () => {
    expect(() =>
      NotificationDispatcherService.select({
        channel: ch('in_app'), enabled: { inApp: false },
      }),
    ).toThrow();
  });

  it('in-app enabled success', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('in_app'), enabled: { inApp: true },
    });
    expect(r.providerName).toBeNull();
    expect(r.requiresExternalCall).toBe(false);
  });

  it('webhook enabled requires external', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('webhook'), enabled: { webhook: true },
    });
    expect(r.requiresExternalCall).toBe(true);
  });

  it('webhook disabled throws', () => {
    expect(() =>
      NotificationDispatcherService.select({
        channel: ch('webhook'), enabled: { webhook: false },
      }),
    ).toThrow();
  });

  it('whatsapp enabled → twilio', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('whatsapp'), enabled: { sms: true },
    });
    expect(r.providerName).toBe('twilio');
    expect(r.reason).toBe('whatsapp_via_twilio');
  });

  it('whatsapp disabled throws', () => {
    expect(() =>
      NotificationDispatcherService.select({
        channel: ch('whatsapp'), enabled: { sms: false },
      }),
    ).toThrow();
  });

  it('sms preferred provider', () => {
    const r = NotificationDispatcherService.select({
      channel: ch('sms'), preferredProvider: 'vonage', enabled: { sms: true },
    });
    expect(r.providerName).toBe('vonage');
  });
});

describe('RateLimit — uncovered 39-43 branch matrix', () => {
  it('sms daily limit', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('sms'))).toBeGreaterThan(0);
  });
  it('push daily limit', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('push'))).toBeGreaterThan(0);
  });
  it('in-app daily limit', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('in_app'))).toBeGreaterThan(0);
  });
  it('webhook daily limit', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('webhook'))).toBeGreaterThan(0);
  });
  it('whatsapp daily limit', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('whatsapp'))).toBeGreaterThan(0);
  });
  it('unknown channel → Infinity', () => {
    expect(NotificationRateLimitService.dailyLimitFor(ch('unknown'))).toBe(Number.POSITIVE_INFINITY);
  });
  it('globalPerSecondLimit returns config', () => {
    expect(NotificationRateLimitService.globalPerSecondLimit()).toBeGreaterThan(0);
  });
  it('check user daily exceeded', () => {
    const r = NotificationRateLimitService.check({
      channel: ch('email'), userDailyCount: 1000, globalPerSecondCount: 0,
    });
    expect(r.allowed).toBe(false);
  });
  it('check global exceeded', () => {
    const r = NotificationRateLimitService.check({
      channel: ch('email'), userDailyCount: 0, globalPerSecondCount: 100000,
    });
    expect(r.allowed).toBe(false);
  });
  it('check allows under limit', () => {
    const r = NotificationRateLimitService.check({
      channel: ch('email'), userDailyCount: 1, globalPerSecondCount: 1,
    });
    expect(r.allowed).toBe(true);
  });
  it('assertAllowed throws', () => {
    expect(() =>
      NotificationRateLimitService.assertAllowed({
        channel: ch('email'), userDailyCount: 1000, globalPerSecondCount: 0,
      }),
    ).toThrow();
  });
  it('assertAllowed passes', () => {
    expect(() =>
      NotificationRateLimitService.assertAllowed({
        channel: ch('email'), userDailyCount: 1, globalPerSecondCount: 1,
      }),
    ).not.toThrow();
  });
  it('shouldBypassUserLimit critical', () => {
    expect(NotificationRateLimitService.shouldBypassUserLimit('critical')).toBe(true);
    expect(NotificationRateLimitService.shouldBypassUserLimit('normal')).toBe(false);
  });
});

describe('RetryPolicy — baseDelayMs all branches + assertRetryable', () => {
  it('baseDelayMs unknown channel → 60000', () => {
    const fake = {
      isEmail: () => false, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never;
    expect(NotificationRetryPolicyService.baseDelayMs(fake)).toBe(60_000);
  });

  it('baseDelayMs in-app → 5000', () => {
    const fake = {
      isEmail: () => false, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => true,
    } as never;
    expect(NotificationRetryPolicyService.baseDelayMs(fake)).toBe(5_000);
  });

  it('computeDelay webhook fallback when idx out of bounds', () => {
    const fake = {
      isEmail: () => false, isSms: () => false, isPush: () => false,
      isWebhook: () => true, isInApp: () => false,
    } as never;
    const d = NotificationRetryPolicyService.computeDelay(fake, 100);
    expect(d).toBeGreaterThan(0);
  });

  it('computeDelay caps at 3.6M ms', () => {
    const fake = {
      isEmail: () => true, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never;
    const d = NotificationRetryPolicyService.computeDelay(fake, 50);
    expect(d).toBeLessThanOrEqual(3_600_000);
  });

  it('assertRetryable throws when over limit', () => {
    const fake = {
      isEmail: () => true, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never;
    expect(() =>
      NotificationRetryPolicyService.assertRetryable({
        channel: fake, attempt: 100,
        failureReason: { value: 'timeout', isRetryable: () => true } as never,
        lastAttemptAt: new Date().toISOString(),
      }),
    ).toThrow();
  });

  it('assertRetryable ok', () => {
    const fake = {
      isEmail: () => true, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never;
    const r = NotificationRetryPolicyService.assertRetryable({
      channel: fake, attempt: 1,
      failureReason: { value: 'timeout', isRetryable: () => true } as never,
      lastAttemptAt: new Date().toISOString(),
    });
    expect(r.shouldRetry).toBe(true);
  });
});

describe('PreferenceChecker — all 3 gates', () => {
  const basePreference = (opts: {
    catEnabled?: boolean;
    chEnabled?: boolean;
    inQuiet?: boolean;
  }) => ({
    isCategoryEnabled: () => opts.catEnabled ?? true,
    isChannelEnabled: () => opts.chEnabled ?? true,
    isInQuietHours: () => opts.inQuiet ?? false,
    quietHoursEnd: 8,
  }) as never;

  const baseInput = (overrides: Record<string, unknown> = {}) => ({
    preference: null,
    type: {
      value: 'transactional',
      isTransactional: () => true, isSecurity: () => false,
    } as never,
    category: { value: 'order' } as never,
    channel: { value: 'email', isInstant: () => false } as never,
    priority: {
      value: 'normal',
      bypassesQuietHours: () => false,
    } as never,
    currentHour: 12,
    ...overrides,
  });

  it('no preference → shouldSend true', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput() as never);
    expect(r.shouldSend).toBe(true);
  });

  it('category disabled normal → false', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ catEnabled: false }),
    }) as never);
    expect(r.shouldSend).toBe(false);
    expect(r.reason).toMatch(/category/);
  });

  it('category disabled critical → bypass', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ catEnabled: false }),
      priority: { value: 'critical', bypassesQuietHours: () => true } as never,
    }) as never);
    expect(r.shouldSend).toBe(true);
  });

  it('channel disabled → false', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ chEnabled: false }),
    }) as never);
    expect(r.shouldSend).toBe(false);
    expect(r.reason).toMatch(/channel/);
  });

  it('quiet hours + normal → false with deferUntilQuietHoursEnd', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ inQuiet: true }),
    type: { value: "marketing", isTransactional: () => false, isSecurity: () => false } as never,
      priority: { value: 'normal', bypassesQuietHours: () => false } as never,
      currentHour: 23,
    }) as never);
    expect(r.shouldSend).toBe(false);
    expect(r.deferUntilQuietHoursEnd).toBe(true);
  });

  it('quiet hours + critical → bypass', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ inQuiet: true }),
      priority: { value: 'critical', bypassesQuietHours: () => true } as never,
      currentHour: 23,
    }) as never);
    expect(r.shouldSend).toBe(true);
  });

  it('quiet hours + instant channel → bypass', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ inQuiet: true }),
      channel: { value: 'push', isInstant: () => true } as never,
      currentHour: 23,
    }) as never);
    expect(r.shouldSend).toBe(true);
  });

  it('quiet hours + security type → bypass', () => {
    const r = NotificationPreferenceCheckerService.check(baseInput({
      preference: basePreference({ inQuiet: true }),
      type: { value: 'security', isTransactional: () => false, isSecurity: () => true } as never,
      currentHour: 23,
    }) as never);
    expect(r.shouldSend).toBe(true);
  });

  it('assertShouldSend throws', () => {
    expect(() =>
      NotificationPreferenceCheckerService.assertShouldSend(baseInput({
        preference: basePreference({ catEnabled: false }),
      }) as never),
    ).toThrow();
  });

  it('nextAllowedAt wraps', () => {
    const pref = {
      quietHoursEnd: 8,
    } as never;
    const r = NotificationPreferenceCheckerService.nextAllowedAt(pref, new Date());
    expect(typeof r).toBe('string');
  });
});

describe('Priority VO — branches', () => {
  it('all named', () => {
    expect(NotificationPriorityVO.critical().isCritical()).toBe(true);
    expect(NotificationPriorityVO.high().isHigh()).toBe(true);
    expect(NotificationPriorityVO.normal().isNormal()).toBe(true);
    expect(NotificationPriorityVO.low().isLow()).toBe(true);
    expect(NotificationPriorityVO.silent().isSilent()).toBe(true);
  });
  it('isUrgent + weights + ttl', () => {
    const critical = NotificationPriorityVO.critical();
    expect(critical.isUrgent()).toBe(true);
    expect(critical.weight()).toBeGreaterThan(0);
    expect(critical.ttlSeconds()).toBeGreaterThan(0);
    expect(critical.bypassesQuietHours()).toBe(true);
  });
  it('isHigherThan', () => {
    expect(
      NotificationPriorityVO.critical().isHigherThan(NotificationPriorityVO.normal()),
    ).toBe(true);
  });
});
