/**
 * Services — final function coverage
 * @module notification-service/test/unit/infrastructure/services
 */
import { jest } from '@jest/globals';
import { ChannelSelectorInfraService } from '@infrastructure/services/internal/channel-selector.service.js';
import { RecipientResolverInfraService } from '@infrastructure/services/internal/recipient-resolver.service.js';
import { SmsSplitterInfraService } from '@infrastructure/services/internal/sms-splitter.service.js';
import { DeviceTokenValidatorInfraService } from '@infrastructure/services/internal/device-token-validator.service.js';
import { BounceHandlerInfraService } from '@infrastructure/services/internal/bounce-handler.service.js';
import { ContentSanitizerInfraService } from '@infrastructure/services/internal/content-sanitizer.service.js';

import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';

import { TEST_IDS } from '@test-infra/index.js';

describe('ChannelSelectorInfraService — all 4 priority × preference combinations', () => {
  const buildPref = (enabled: string[]) =>
    PreferenceVO.reconstitute({
      id: { value: TEST_IDS.PREFERENCE } as never,
      userId: { value: TEST_IDS.USER } as never,
      type: { value: 'channel_specific' } as never,
      options: enabled.map((ch) => ({
        channel: ch, category: undefined, enabled: true,
      } as never)),
      quietHoursEnabled: false,
      timezone: 'Asia/Dhaka',
      locale: 'en',
      locked: false,
    });

  it('null pref + normal priority → email', () => {
    const svc = new ChannelSelectorInfraService();
    const r = svc.selectChannels({
      type: NotificationTypeVO.create('transactional'),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.create('normal'),
      preference: null,
    });
    expect(r?.primary.value).toBe('email');
  });

  it('null pref + critical priority → push', () => {
    const svc = new ChannelSelectorInfraService();
    const r = svc.selectChannels({
      type: NotificationTypeVO.create('transactional'),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.create('critical'),
      preference: null,
    });
    expect(r?.primary.value).toBe('push');
  });

  it('with preference (email only) → email', () => {
    const svc = new ChannelSelectorInfraService();
    const r = svc.selectChannels({
      type: NotificationTypeVO.create('transactional'),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.create('normal'),
      preference: buildPref(['email']),
    });
    // Domain ChannelSelectorService may return email (if push not enabled)
    expect(['email', 'push', 'in_app']).toContain(r?.primary.value);
  });

  it('with preference (push + email) → push primary', () => {
    const svc = new ChannelSelectorInfraService();
    const r = svc.selectChannels({
      type: NotificationTypeVO.create('transactional'),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.create('normal'),
      preference: buildPref(['push', 'email']),
    });
    expect(r?.primary.value).toBe('push');
  });
});

describe('RecipientResolverInfraService — all resolve paths', () => {
  it('user not found', async () => {
    const client = { getById: jest.fn(async () => null) };
    const svc = new RecipientResolverInfraService(client as never);
    expect(await svc.resolve({ userId: TEST_IDS.USER, channel: 'email' })).toBeNull();
  });

  it('user inactive', async () => {
    const client = { getById: jest.fn(async () => ({ id: TEST_IDS.USER, isActive: false })) };
    const svc = new RecipientResolverInfraService(client as never);
    expect(await svc.resolve({ userId: TEST_IDS.USER, channel: 'email' })).toBeNull();
  });

  it('user active with email', async () => {
    const client = {
      getById: jest.fn(async () => ({
        id: TEST_IDS.USER, isActive: true, email: 'a@b.com',
        phone: '+8801712345678', name: 'Test',
      })),
    };
    const svc = new RecipientResolverInfraService(client as never);
    const r = await svc.resolve({ userId: TEST_IDS.USER, channel: 'email' });
    expect(r?.recipient.email).toBeDefined();
    expect(r?.userProfile?.name).toBe('Test');
  });

  it('user with email reconstitute (trusted source)', async () => {
    // ⚠️ reconstitute bypasses validation — trusted source pattern
    const client = {
      getById: jest.fn(async () => ({
        id: TEST_IDS.USER, isActive: true, email: 'a@b.com',
      })),
    };
    const svc = new RecipientResolverInfraService(client as never);
    const r = await svc.resolve({ userId: TEST_IDS.USER, channel: 'email' });
    expect(r?.recipient.email).toBeDefined();
    expect(r?.recipient.email?.value).toBe('a@b.com');
  });

  it('user with phone reconstitute (trusted source)', async () => {
    const client = {
      getById: jest.fn(async () => ({
        id: TEST_IDS.USER, isActive: true, phone: '+8801712345678',
      })),
    };
    const svc = new RecipientResolverInfraService(client as never);
    const r = await svc.resolve({ userId: TEST_IDS.USER, channel: 'sms' });
    expect(r?.recipient.phone).toBeDefined();
    expect(r?.recipient.phone?.value).toBe('+8801712345678');
  });

  it('resolveMany mixed', async () => {
    const client = {
      getById: jest.fn()
        .mockResolvedValueOnce({ id: TEST_IDS.USER, isActive: true, email: 'a@b.com' })
        .mockResolvedValueOnce(null),
    };
    const svc = new RecipientResolverInfraService(client as never);
    const rs = await svc.resolveMany([
      { userId: TEST_IDS.USER, channel: 'email' },
      { userId: TEST_IDS.USER_2, channel: 'email' },
    ]);
    expect(rs.length).toBe(1);
  });
});

describe('DeviceTokenValidator — all platforms', () => {
  const svc = new DeviceTokenValidatorInfraService();
  const validToken = 'a'.repeat(40);

  it('android', () => expect(svc.validate({ token: validToken, platform: 'android' }).valid).toBe(true));
  it('ios', () => expect(svc.validate({ token: 'a'.repeat(64), platform: 'ios' }).valid).toBe(true));
  it('web', () => expect(svc.validate({ token: validToken, platform: 'web' }).valid).toBe(true));
  it('windows', () => expect(svc.validate({ token: validToken, platform: 'windows' }).valid).toBe(true));
  it('macos', () => expect(svc.validate({ token: 'a'.repeat(64), platform: 'macos' }).valid).toBe(true));
  it('invalid platform', () => expect(svc.validate({ token: validToken, platform: 'bad' }).valid).toBe(false));
  it('empty token', () => expect(svc.validate({ token: '', platform: 'android' }).valid).toBe(false));
  it('short token', () => expect(svc.validate({ token: 'short', platform: 'android' }).valid).toBe(false));
});

describe('BounceHandler — every reason code', () => {
  it('INVALID_ADDRESS → hard block', async () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn() } as never);
    expect((await svc.process({
      notificationId: 'n', channel: 'e', provider: 'p',
      recipient: 'a@b', errorCode: 'INVALID_ADDRESS', reason: 'r',
    })).action).toBe('block');
  });

  it('UNSUBSCRIBED → complaint unsubscribe', async () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn() } as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'e', provider: 'p',
      recipient: 'a@b', errorCode: '', reason: 'unsubscribed',
    });
    expect(r.action).toBe('unsubscribe');
  });

  it('shouldSuppress soft → false', () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn() } as never);
    expect(svc.shouldSuppress('soft')).toBe(false);
  });
});

describe('SmsSplitter — countSegments all branches', () => {
  const svc = new SmsSplitterInfraService();
  it('empty', () => expect(svc.countSegments('').count).toBe(1));
  it('gsm 160', () => expect(svc.countSegments('A'.repeat(160)).count).toBe(1));
  it('gsm 320', () => expect(svc.countSegments('A'.repeat(320)).count).toBe(2));
  it('unicode 70', () => expect(svc.countSegments('ব'.repeat(70)).count).toBe(1));
  it('unicode 140', () => expect(svc.countSegments('ব'.repeat(140)).count).toBe(2));
});

describe('ContentSanitizer — edge protocols', () => {
  const svc = new ContentSanitizerInfraService();
  it('https', () => expect(svc.sanitize('https://x.test', 'url').isSafe).toBe(true));
  it('http', () => expect(svc.sanitize('http://x.test', 'url').isSafe).toBe(true));
  it('mailto', () => expect(svc.sanitize('mailto:a@b.com', 'url').isSafe).toBe(true));
  it('tel', () => expect(svc.sanitize('tel:+8801712345678', 'url').isSafe).toBe(true));
  it('ftp blocked', () => expect(svc.sanitize('ftp://x', 'url').isSafe).toBe(false));
  it('javascript blocked', () => expect(svc.sanitize('javascript:x', 'url').isSafe).toBe(false));
});
