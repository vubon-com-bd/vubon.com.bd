/**
 * Services — every cache miss/hit + error path
 * @module notification-service/test/unit/infrastructure/services
 */
import { jest } from '@jest/globals';
import { QuietHoursInfraService } from '@infrastructure/services/internal/quiet-hours.service.js';
import { RateLimiterInfraService } from '@infrastructure/services/internal/rate-limiter.service.js';
import { BounceHandlerInfraService } from '@infrastructure/services/internal/bounce-handler.service.js';
import { ContentSanitizerInfraService } from '@infrastructure/services/internal/content-sanitizer.service.js';
import { SmsSplitterInfraService } from '@infrastructure/services/internal/sms-splitter.service.js';
import { WebhookSignerInfraService } from '@infrastructure/services/internal/webhook-signer.service.js';
import { WebhookVerifierInfraService } from '@infrastructure/services/internal/webhook-verifier.service.js';
import { UnsubscribeTokenInfraService } from '@infrastructure/services/internal/unsubscribe-token.service.js';
import { RetrySchedulerInfraService } from '@infrastructure/services/internal/retry-scheduler.service.js';

import { TEST_IDS, makeRedisMock } from '@test-infra/index.js';

describe('QuietHours — every cache state', () => {
  it('cache miss → not in quiet hours', async () => {
    const cache = { get: jest.fn(async () => null) };
    const svc = new QuietHoursInfraService(cache as never);
    const r = await svc.check({ userId: TEST_IDS.USER });
    expect(r.inQuietHours).toBe(false);
  });

  it('cache hit disabled → not quiet', async () => {
    const cache = {
      get: jest.fn(async () => ({
        userId: TEST_IDS.USER, quietHoursEnabled: false,
        timezone: 'Asia/Dhaka', locale: 'en', options: [],
      })),
    };
    const svc = new QuietHoursInfraService(cache as never);
    const r = await svc.check({ userId: TEST_IDS.USER });
    expect(r.inQuietHours).toBe(false);
  });

  it('cache hit enabled + critical bypass', async () => {
    const cache = {
      get: jest.fn(async () => ({
        userId: TEST_IDS.USER, quietHoursEnabled: true,
        quietHoursStart: 0, quietHoursEnd: 23,
        timezone: 'UTC', locale: 'en', options: [],
      })),
    };
    const svc = new QuietHoursInfraService(cache as never);
    const r = await svc.check({ userId: TEST_IDS.USER, bypassForCritical: true });
    expect(r.inQuietHours).toBe(false);
  });

  it('shouldDefer normal', async () => {
    const cache = { get: jest.fn(async () => null) };
    const svc = new QuietHoursInfraService(cache as never);
    const r = await svc.shouldDefer(TEST_IDS.USER, 'normal');
    expect(r.defer).toBe(false);
  });

  it('shouldDefer critical', async () => {
    const cache = { get: jest.fn(async () => null) };
    const svc = new QuietHoursInfraService(cache as never);
    expect((await svc.shouldDefer(TEST_IDS.USER, 'critical')).defer).toBe(false);
  });
});

describe('RateLimiter — all state paths', () => {
  it('no state → allow', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    redis.get.mockResolvedValue(null);
    const r = await svc.check({ key: 'k', limit: 10, windowSeconds: 60 });
    expect(r.allowed).toBe(true);
  });

  it('state with tokens → allow', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    redis.get.mockResolvedValue({ tokens: 5, windowStartMs: Date.now() } as never);
    expect((await svc.check({ key: 'k', limit: 10, windowSeconds: 60 })).allowed).toBe(true);
  });

  it('state zero tokens → deny', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    redis.get.mockResolvedValue({ tokens: 0, windowStartMs: Date.now() } as never);
    expect((await svc.check({ key: 'k', limit: 10, windowSeconds: 60 })).allowed).toBe(false);
  });

  it('isExceeded true', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    redis.get.mockResolvedValue({ tokens: 0 } as never);
    expect(await svc.isExceeded('k')).toBe(true);
  });

  it('isExceeded false', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    redis.get.mockResolvedValue(null);
    expect(await svc.isExceeded('k')).toBe(false);
  });

  it('reset', async () => {
    const redis = makeRedisMock();
    const svc = new RateLimiterInfraService(redis as never);
    await svc.reset('k');
    expect(redis.del).toHaveBeenCalled();
  });
});

describe('RetryScheduler — every error code', () => {
  it.each([
    'INVALID_ADDRESS', 'INVALID_PHONE', 'INVALID_TOKEN',
    'UNSUBSCRIBED', 'BLOCKED', 'MESSAGE_REJECTED',
  ])('%s is non-retryable', (code) => {
    const svc = new RetrySchedulerInfraService({ enqueueProcess: jest.fn() } as never);
    expect(svc.isRetryable(code)).toBe(false);
  });

  it('unknown retryable', () => {
    const svc = new RetrySchedulerInfraService({ enqueueProcess: jest.fn() } as never);
    expect(svc.isRetryable('WEIRD')).toBe(true);
  });

  it('schedule attempt 1 retry', async () => {
    const svc = new RetrySchedulerInfraService({ enqueueProcess: jest.fn(async () => 'j') } as never);
    const r = await svc.schedule({ notificationId: 'n', channel: 'e', attemptNumber: 1 });
    expect(r.scheduled).toBe(true);
  });

  it('schedule max attempts', async () => {
    const svc = new RetrySchedulerInfraService({ enqueueProcess: jest.fn() } as never);
    const r = await svc.schedule({ notificationId: 'n', channel: 'e', attemptNumber: 3 });
    expect(r.scheduled).toBe(false);
  });
});

describe('BounceHandler — all bounce types', () => {
  it.each([
    ['INVALID_ADDRESS', 'hard'],
    ['INVALID_PHONE', 'hard'],
    ['SPAM_COMPLAINT', 'complaint'],
    ['MAILBOX_FULL', 'soft'],
    ['TIMEOUT', 'soft'],
    ['WEIRD_CODE', 'unknown'],
  ])('%s → %s', async (code, type) => {
    const repo = { save: jest.fn(async (x) => x) };
    const svc = new BounceHandlerInfraService(repo as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: code, reason: 'r',
    });
    expect(r.bounceType).toBe(type);
  });

  it('save fails → persisted false', async () => {
    const repo = { save: jest.fn(async () => { throw new Error('db'); }) };
    const svc = new BounceHandlerInfraService(repo as never);
    const r = await svc.process({
      notificationId: 'n', channel: 'email', provider: 'p',
      recipient: 'a@b.com', errorCode: 'INVALID_ADDRESS', reason: 'r',
    });
    expect(r.persisted).toBe(false);
  });
});

describe('ContentSanitizer — every field', () => {
  const svc = new ContentSanitizerInfraService();

  it('plain', () => {
    expect(svc.sanitize('clean', 'plain').isSafe).toBe(true);
  });
  it('html', () => {
    expect(svc.sanitize('<p>safe</p>', 'html').isSafe).toBe(true);
  });
  it('url http', () => {
    expect(svc.sanitize('http://x.test', 'url').isSafe).toBe(true);
  });
  it('url https', () => {
    expect(svc.sanitize('https://x.test', 'url').isSafe).toBe(true);
  });
  it('url mailto', () => {
    expect(svc.sanitize('mailto:a@b.com', 'url').isSafe).toBe(true);
  });
  it('url tel', () => {
    expect(svc.sanitize('tel:+8801712345678', 'url').isSafe).toBe(true);
  });
  it('url ftp blocked', () => {
    expect(svc.sanitize('ftp://x', 'url').isSafe).toBe(false);
  });
  it('header clean', () => {
    expect(svc.sanitize('val', 'header').isSafe).toBe(true);
  });
  it('header CRLF', () => {
    expect(svc.sanitize('a\r\nb', 'header').isSafe).toBe(false);
  });
  it('json valid', () => {
    expect(svc.sanitize('{"a":1}', 'json').isSafe).toBe(true);
  });
  it('json invalid', () => {
    expect(svc.sanitize('not json', 'json').isSafe).toBe(false);
  });
});

describe('SmsSplitter — all encodings', () => {
  const svc = new SmsSplitterInfraService();
  it('gsm short', () => expect(svc.split({ message: 'Hi' }).totalSegments).toBe(1));
  it('gsm exact 160', () => expect(svc.split({ message: 'A'.repeat(160) }).totalSegments).toBe(1));
  it('gsm 161', () => expect(svc.split({ message: 'A'.repeat(161) }).totalSegments).toBe(2));
  it('unicode', () => expect(svc.split({ message: 'বাংলা' }).encoding).toBe('unicode'));
  it('truncated', () => expect(svc.split({ message: 'A'.repeat(1000), maxSegments: 2 }).truncated).toBe(true));
  it('countSegments gsm', () => expect(svc.countSegments('hello').encoding).toBe('gsm'));
  it('countSegments unicode', () => expect(svc.countSegments('বাংলা').encoding).toBe('unicode'));
});

describe('WebhookSigner/Verifier — all branches', () => {
  it('sign + verify roundtrip', () => {
    const s = new WebhookSignerInfraService();
    const sig = s.sign({ payload: 'x', secret: 's' });
    expect(s.verify({ payload: 'x', secret: 's', header: sig.header })).toBe(true);
  });
  it('verify wrong sig', () => {
    const s = new WebhookSignerInfraService();
    expect(s.verify({
      payload: 'x', secret: 's',
      header: `t=${Math.floor(Date.now() / 1000)},v1=${'0'.repeat(64)}`,
    })).toBe(false);
  });
  it('verify old timestamp', () => {
    const s = new WebhookSignerInfraService();
    const sig = s.sign({ payload: 'x', secret: 's', timestamp: 1 });
    expect(s.verify({ payload: 'x', secret: 's', header: sig.header })).toBe(false);
  });

  it.each(['sendgrid', 'twilio', 'fcm', 'apns'] as const)('verify %s wrong', (provider) => {
    const s = new WebhookVerifierInfraService();
    expect(s.verify({ provider, payload: 'x', secret: 's', signature: 'wrong' })).toBe(false);
  });
});

describe('UnsubscribeToken — all branches', () => {
  const svc = new UnsubscribeTokenInfraService();
  it('roundtrip', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'email' });
    expect(svc.verifyToken(l.token).userId).toBe(TEST_IDS.USER);
  });
  it('with category', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'sms', category: 'promo' });
    expect(svc.verifyToken(l.token).category).toBe('promo');
  });
  it('expired', () => {
    const l = svc.generateLink({ userId: TEST_IDS.USER, channel: 'email', ttlDays: -1 });
    expect(() => svc.verifyToken(l.token)).toThrow();
  });
  it('invalid', () => {
    expect(() => svc.verifyToken('bad')).toThrow();
  });
});
