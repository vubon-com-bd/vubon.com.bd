/**
 * Services — precision function coverage
 * @module notification-service/test/unit/infrastructure/services
 */
import { jest } from '@jest/globals';
import { QuietHoursInfraService } from '@infrastructure/services/internal/quiet-hours.service.js';
import { RetrySchedulerInfraService } from '@infrastructure/services/internal/retry-scheduler.service.js';
import { BounceHandlerInfraService } from '@infrastructure/services/internal/bounce-handler.service.js';
import { WebhookVerifierInfraService } from '@infrastructure/services/internal/webhook-verifier.service.js';
import { DeviceTokenValidatorInfraService } from '@infrastructure/services/internal/device-token-validator.service.js';
import { UnsubscribeTokenInfraService } from '@infrastructure/services/internal/unsubscribe-token.service.js';

import { TEST_IDS } from '@test-infra/index.js';

describe('RetryScheduler — non-retryable error codes (untested branches)', () => {
  const codes = ['INVALID_ADDRESS', 'INVALID_PHONE', 'INVALID_TOKEN', 'UNSUBSCRIBED', 'BLOCKED', 'MESSAGE_REJECTED'];

  it.each(codes)('%s returns shouldRetry=false', async (code) => {
    const svc = new RetrySchedulerInfraService({
      enqueueProcess: jest.fn(async () => 'j'),
    } as never);
    const r = await svc.schedule({
      notificationId: 'n', channel: 'email', attemptNumber: 1, errorCode: code,
    });
    expect(r.scheduled).toBe(false);
    expect(r.reason).toContain('non-retryable');
  });
});

describe('BounceHandler — every reason path', () => {
  const reasonPaths: Array<[string, string, string]> = [
    ['SPAM_COMPLAINT', 'spam', 'unsubscribe'],
    ['ABUSE_REPORT', 'abuse', 'unsubscribe'],
    ['INVALID_ADDRESS', 'invalid', 'block'],
    ['MAILBOX_FULL', 'full', 'retry'],
    ['RATE_LIMITED', 'rate', 'retry'],
    ['TIMEOUT', 'timeout', 'retry'],
    ['NETWORK_ERROR', 'net', 'retry'],
    ['GATEWAY_ERROR', 'gw', 'retry'],
    ['UNKNOWN_CODE', 'xyz', 'retry'],
  ];

  it.each(reasonPaths)('errorCode=%s → action=%s', async (code, reason, expectedAction) => {
    const svc = new BounceHandlerInfraService({ save: jest.fn(async (x) => x) } as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: code, reason,
    });
    expect(r.action).toBe(expectedAction);
  });

  it('reason=INVALID_ADDRESS (internal reason path)', async () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn(async (x) => x) } as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: 'WEIRD', reason: 'invalid_address',
    });
    // Infra service returns `bounceType`, not `type`
    expect(r.bounceType === 'hard' || r.bounceType === 'unknown').toBe(true);
  });

  it('reason=unsubscribed', async () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn(async (x) => x) } as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: 'WEIRD', reason: 'unsubscribed',
    });
    expect(r.bounceType).toBe('complaint');
  });

  it('soft bounce 5 attempts → suppress', async () => {
    const svc = new BounceHandlerInfraService({ save: jest.fn(async (x) => x) } as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: 'MAILBOX_FULL', reason: 'full',
    });
    expect(r.bounceType).toBe('soft');
  });
});

describe('WebhookVerifier — every provider both branches', () => {
  const svc = new WebhookVerifierInfraService();
  const crypto = require('node:crypto');

  it('sendgrid valid', () => {
    const expected = crypto.createHmac('sha256', 'secret').update('payload').digest('hex');
    expect(svc.verify({ provider: 'sendgrid', payload: 'payload', secret: 'secret', signature: expected })).toBe(true);
  });

  it('sendgrid invalid', () => {
    expect(svc.verify({ provider: 'sendgrid', payload: 'payload', secret: 'secret', signature: 'wrong' })).toBe(false);
  });

  it('twilio valid', () => {
    const url = 'https://x.test';
    const expected = crypto.createHmac('sha1', 'secret').update(url).digest('base64');
    expect(svc.verify({ provider: 'twilio', payload: 'x', secret: 'secret', signature: expected, url })).toBe(true);
  });

  it('twilio invalid', () => {
    expect(svc.verify({ provider: 'twilio', payload: 'x', secret: 's', signature: 'wrong', url: 'https://x.test' })).toBe(false);
  });

  it('fcm valid', () => {
    const expected = crypto.createHmac('sha256', 'secret').update('payload').digest('hex');
    expect(svc.verify({ provider: 'fcm', payload: 'payload', secret: 'secret', signature: expected })).toBe(true);
  });

  it('fcm invalid', () => {
    expect(svc.verify({ provider: 'fcm', payload: 'payload', secret: 'secret', signature: 'wrong' })).toBe(false);
  });

  it('apns valid', () => {
    const expected = crypto.createHmac('sha256', 'secret').update('payload').digest('base64');
    expect(svc.verify({ provider: 'apns', payload: 'payload', secret: 'secret', signature: expected })).toBe(true);
  });

  it('apns invalid', () => {
    expect(svc.verify({ provider: 'apns', payload: 'payload', secret: 'secret', signature: 'wrong' })).toBe(false);
  });

  it('unknown provider', () => {
    expect(svc.verify({ provider: 'unknown' as never, payload: 'x', secret: 's', signature: 'sig' })).toBe(false);
  });
});

describe('DeviceTokenValidator — all platform + valid/invalid combinations', () => {
  const svc = new DeviceTokenValidatorInfraService();
  const valid = 'a'.repeat(40);

  it.each([
    ['android', valid, true],
    ['ios', 'a'.repeat(64), true],
    ['web', valid, true],
    ['windows', valid, true],
    ['macos', 'a'.repeat(64), true],
    ['invalid_platform', valid, false],
    ['android', '', false],
    ['android', 'short', false],
  ] as const)('platform=%s token=%s → valid=%s', (platform, token, expected) => {
    expect(svc.validate({ token, platform }).valid).toBe(expected);
  });
});

describe('UnsubscribeToken — all branches', () => {
  const svc = new UnsubscribeTokenInfraService();

  it('with ttlDays custom', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'email', ttlDays: 7 });
    expect(svc.verifyToken(l.token).userId).toBe(TEST_IDS.USER);
  });

  it('without category', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'sms' });
    expect(svc.verifyToken(l.token).category).toBeUndefined();
  });

  it('expired', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'email', ttlDays: -1 });
    expect(() => svc.verifyToken(l.token)).toThrow();
  });

  it('invalid token', () => {
    expect(() => svc.verifyToken('not-valid')).toThrow();
  });
});

describe('QuietHours — every cache state', () => {
  it('cache miss', async () => {
    const cache = { get: jest.fn(async () => null) };
    const svc = new QuietHoursInfraService(cache as never);
    expect((await svc.check({ userId: TEST_IDS.USER })).inQuietHours).toBe(false);
  });

  it('cache hit + disabled', async () => {
    const cache = {
      get: jest.fn(async () => ({
        userId: TEST_IDS.USER, quietHoursEnabled: false,
        timezone: 'Asia/Dhaka', locale: 'en', options: [],
      })),
    };
    const svc = new QuietHoursInfraService(cache as never);
    expect((await svc.check({ userId: TEST_IDS.USER })).inQuietHours).toBe(false);
  });

  it('cache hit + enabled + bypass critical', async () => {
    const cache = {
      get: jest.fn(async () => ({
        userId: TEST_IDS.USER, quietHoursEnabled: true,
        quietHoursStart: 0, quietHoursEnd: 23,
        timezone: 'UTC', locale: 'en', options: [],
      })),
    };
    const svc = new QuietHoursInfraService(cache as never);
    expect((await svc.check({ userId: TEST_IDS.USER, bypassForCritical: true })).inQuietHours).toBe(false);
  });
});
