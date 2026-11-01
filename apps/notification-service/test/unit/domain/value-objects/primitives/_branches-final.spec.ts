/**
 * Final branch coverage — fill the remaining ~40 branch gaps
 * @module notification-service/test/unit/domain/value-objects/primitives
 */
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { VendorIdVO } from '@domain/primitives/vendor-id.vo.js';
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { RateLimitKeyVO } from '@domain/primitives/rate-limit-key.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('ScheduleFrequencyVO — reconstitute branch', () => {
  it('reconstitute custom returns undefined interval', () => {
    const vo = ScheduleFrequencyVO.reconstitute('custom');
    expect(vo.approximateIntervalDays).toBeUndefined();
  });

  it('reconstitute none returns undefined interval', () => {
    const vo = ScheduleFrequencyVO.reconstitute('none');
    expect(vo.approximateIntervalDays).toBeUndefined();
  });

  it('reconstitute hourly returns ~0.04', () => {
    const vo = ScheduleFrequencyVO.reconstitute('hourly');
    expect(vo.approximateIntervalDays).toBeCloseTo(1 / 24, 4);
  });

  it('reconstitute yearly returns 365', () => {
    const vo = ScheduleFrequencyVO.reconstitute('yearly');
    expect(vo.approximateIntervalDays).toBe(365);
  });
});

describe('ScheduleStatusVO — reconstitute branch', () => {
  it('reconstitute active isRunnable', () => {
    expect(ScheduleStatusVO.reconstitute('active').isRunnable()).toBe(true);
  });

  it('reconstitute pending is not runnable', () => {
    expect(ScheduleStatusVO.reconstitute('pending').isRunnable()).toBe(false);
  });

  it('reconstitute all statuses', () => {
    ['pending', 'active', 'paused', 'completed', 'cancelled', 'failed'].forEach((s) => {
      expect(ScheduleStatusVO.reconstitute(s).value).toBe(s);
    });
  });
});

describe('Cross-service IDs — branded round-trip', () => {
  it('UserIdVO fromBranded + toBranded', () => {
    const vo = UserIdVO.create(IDS.userId);
    const branded = vo.toBranded();
    const back = UserIdVO.fromBranded(branded);
    expect(back.value).toBe(IDS.userId);
  });

  it('VendorIdVO fromBranded + toBranded', () => {
    const vo = VendorIdVO.create(IDS.vendorId);
    const branded = vo.toBranded();
    const back = VendorIdVO.fromBranded(branded);
    expect(back.value).toBe(IDS.vendorId);
  });

  it('OrderIdVO fromBranded', () => {
    const vo = OrderIdVO.create(IDS.orderId);
    const back = OrderIdVO.fromBranded(vo.toBranded());
    expect(back.value).toBe(IDS.orderId);
  });

  it('ProductIdVO fromBranded', () => {
    const vo = ProductIdVO.create(IDS.productId);
    const back = ProductIdVO.fromBranded(vo.toBranded());
    expect(back.value).toBe(IDS.productId);
  });

  it('PaymentIdVO fromBranded', () => {
    const vo = PaymentIdVO.create(IDS.paymentId);
    const back = PaymentIdVO.fromBranded(vo.toBranded());
    expect(back.value).toBe(IDS.paymentId);
  });
});

describe('WebhookSecretVO — masked short branch', () => {
  it('masked with 16 chars', () => {
    const secret = 'a'.repeat(16);
    expect(WebhookSecretVO.create(secret).masked).toBe('aaaa' + '*'.repeat(8) + 'aaaa');
  });

  it('masked with 8- chars returns ****', () => {
    const vo = WebhookSecretVO.reconstitute('short');
    expect(vo.masked).toBe('****');
  });
});

describe('WebhookStatusVO — reconstitute + predicates', () => {
  it('reconstitute active isActive + canDeliver', () => {
    const vo = WebhookStatusVO.reconstitute('active');
    expect(vo.isActive()).toBe(true);
    expect(vo.canDeliver()).toBe(true);
  });

  it('reconstitute paused', () => {
    const vo = WebhookStatusVO.reconstitute('paused');
    expect(vo.isPaused()).toBe(true);
    expect(vo.canDeliver()).toBe(false);
  });

  it('reconstitute disabled isTerminal', () => {
    const vo = WebhookStatusVO.reconstitute('disabled');
    expect(vo.isTerminal()).toBe(true);
  });

  it('reconstitute failed', () => {
    expect(WebhookStatusVO.reconstitute('failed').isFailed()).toBe(true);
  });

  it('reconstitute inactive', () => {
    expect(WebhookStatusVO.reconstitute('inactive').isInactive()).toBe(true);
  });
});

describe('RateLimitKeyVO — toKeyString branch', () => {
  it('toKeyString with identifier', () => {
    const vo = RateLimitKeyVO.create({
      channel: 'email',
      scope: 'user',
      identifier: IDS.userId,
    });
    expect(vo.toKeyString()).toBe(`rl:email:user:${IDS.userId}`);
  });

  it('toKeyString without identifier (global)', () => {
    const vo = RateLimitKeyVO.create({
      channel: 'email',
      scope: 'global',
    });
    expect(vo.toKeyString()).toBe('rl:email:global');
  });

  it('toKeyString channel scope', () => {
    const vo = RateLimitKeyVO.create({
      channel: 'sms',
      scope: 'channel',
    });
    expect(vo.toKeyString()).toBe('rl:sms:channel');
  });

  it('reconstitute + toKeyString', () => {
    const vo = RateLimitKeyVO.reconstitute({
      channel: 'push',
      scope: 'device',
      identifier: IDS.deviceId,
    });
    expect(vo.toKeyString()).toBe(`rl:push:device:${IDS.deviceId}`);
  });
});
