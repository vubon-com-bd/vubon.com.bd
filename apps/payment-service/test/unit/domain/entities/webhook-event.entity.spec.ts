/**
 * WebhookEventEntity — unit tests
 */
import { WebhookEventEntity } from '../../../../src/module/domain/entities/webhook-event.entity.js';
import { GatewaySignatureVO } from '../../../../src/module/domain/value-objects/primitives/gateway-signature.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeEvent(): WebhookEventEntity {
  return WebhookEventEntity.receive({
    id: UUID,
    now: NOW,
    props: {
      gateway: 'bkash',
      gatewayEventId: 'evt_123',
      eventType: 'payment.succeeded',
      payload: { paymentId: UUID, status: 'success' },
    },
  });
}

describe('WebhookEventEntity', () => {
  describe('receive()', () => {
    it('creates an unverified, unprocessed event', () => {
      const e = makeEvent();
      expect(e.verified).toBe(false);
      expect(e.processed).toBe(false);
      expect(e.attempts).toBe(0);
      expect(e.maxAttempts).toBe(5);
    });

    it('emits WebhookReceivedEvent', () => {
      const e = makeEvent();
      expect(e.domainEvents[0].type).toBe('webhook.received');
    });

    it('rejects empty gateway', () => {
      expect(() =>
        WebhookEventEntity.receive({
          id: UUID,
          now: NOW,
          props: {
            gateway: '',
            gatewayEventId: 'x',
            eventType: 'y',
            payload: {},
          },
        }),
      ).toThrow();
    });
  });

  describe('verify()', () => {
    it('marks event as verified', () => {
      const e = makeEvent();
      e.verify();
      expect(e.verified).toBe(true);
      expect(e.verifiedAt).toBeDefined();
    });

    it('is idempotent (verify twice is no-op)', () => {
      const e = makeEvent();
      e.verify();
      const v1 = e.version;
      e.verify();
      expect(e.version).toBe(v1);
    });
  });

  describe('markProcessed()', () => {
    it('fails if not verified', () => {
      const e = makeEvent();
      expect(() => e.markProcessed()).toThrow(BusinessRuleError);
    });

    it('marks processed when verified', () => {
      const e = makeEvent();
      e.verify();
      e.markProcessed(PaymentIdVO.create(UUID));
      expect(e.processed).toBe(true);
      expect(e.processedAt).toBeDefined();
      expect(e.paymentId?.value).toBe(UUID);
    });

    it('throws if already processed', () => {
      const e = makeEvent();
      e.verify();
      e.markProcessed();
      expect(() => e.markProcessed()).toThrow(BusinessRuleError);
    });
  });

  describe('markFailed()', () => {
    it('increments attempts and records error', () => {
      const e = makeEvent();
      e.markFailed(FailureReasonVO.create('network timeout'));
      expect(e.attempts).toBe(1);
      expect(e.isFailed()).toBe(true);
      expect(e.lastError?.value).toBe('network timeout');
    });

    it('exhausts attempts after maxAttempts failures', () => {
      const e = makeEvent();
      for (let i = 0; i < e.maxAttempts; i++) {
        e.markFailed(FailureReasonVO.create(`attempt ${i + 1}`));
      }
      expect(e.isExhausted()).toBe(true);
      expect(e.canRetry()).toBe(false);
    });
  });

  describe('canRetry()', () => {
    it('true before any failure', () => {
      expect(makeEvent().canRetry()).toBe(true);
    });

    it('false after processed', () => {
      const e = makeEvent();
      e.verify();
      e.markProcessed();
      expect(e.canRetry()).toBe(false);
    });
  });
});
