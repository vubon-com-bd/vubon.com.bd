import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  status: DeliveryStatusVO.queued(),
  attemptCount: 0,
  maxAttempts: 3,
  ...overrides,
});

describe('NotificationDeliveryVO', () => {
  describe('create()', () => {
    it('creates valid delivery', () => {
      const vo = NotificationDeliveryVO.create(makeProps());
      expect(vo.status.isQueued()).toBe(true);
    });

    it('accepts provider info', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          providerName: ProviderNameVO.create('sendgrid'),
          providerMessageId: ProviderMessageIdVO.create('msg-1'),
        }),
      );
      expect(vo.providerName?.value).toBe('sendgrid');
      expect(vo.providerMessageId?.value).toBe('msg-1');
    });

    it('rejects negative attemptCount', () => {
      expect(() => NotificationDeliveryVO.create(makeProps({ attemptCount: -1 }))).toThrow(ValidationError);
    });

    it('rejects non-integer attemptCount', () => {
      expect(() => NotificationDeliveryVO.create(makeProps({ attemptCount: 1.5 }))).toThrow(ValidationError);
    });

    it('rejects maxAttempts < 1', () => {
      expect(() => NotificationDeliveryVO.create(makeProps({ maxAttempts: 0 }))).toThrow(ValidationError);
    });

    it('rejects attemptCount > maxAttempts', () => {
      expect(() =>
        NotificationDeliveryVO.create(makeProps({ attemptCount: 5, maxAttempts: 3 })),
      ).toThrow(ValidationError);
    });

    it('rejects delivered status without deliveredAt', () => {
      expect(() =>
        NotificationDeliveryVO.create(makeProps({ status: DeliveryStatusVO.delivered() })),
      ).toThrow(ValidationError);
    });

    it('rejects failed status without failedAt', () => {
      expect(() =>
        NotificationDeliveryVO.create(makeProps({ status: DeliveryStatusVO.failed() })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationDeliveryVO.reconstitute(
        makeProps({ status: DeliveryStatusVO.delivered() }),
      );
      expect(vo.status.isDelivered()).toBe(true);
    });
  });

  describe('predicates + getters', () => {
    it('remainingAttempts', () => {
      const vo = NotificationDeliveryVO.create(makeProps({ attemptCount: 1, maxAttempts: 3 }));
      expect(vo.remainingAttempts).toBe(2);
    });

    it('canRetry when status failed + remaining', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.failed(),
          attemptCount: 1,
          failedAt: DATES.now,
        }),
      );
      expect(vo.canRetry).toBe(true);
    });

    it('canRetry false when no remaining', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.failed(),
          attemptCount: 3,
          maxAttempts: 3,
          failedAt: DATES.now,
        }),
      );
      expect(vo.canRetry).toBe(false);
    });

    it('isSuccess for delivered', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.delivered(),
          deliveredAt: DATES.now,
        }),
      );
      expect(vo.isSuccess).toBe(true);
    });

    it('isTerminal for delivered', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.delivered(),
          deliveredAt: DATES.now,
        }),
      );
      expect(vo.isTerminal).toBe(true);
    });

    it('deliveryDurationMs when both timestamps set', () => {
      const sent = '2025-01-15T10:00:00.000Z';
      const delivered = '2025-01-15T10:00:05.000Z';
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.delivered(),
          sentAt: sent,
          deliveredAt: delivered,
        }),
      );
      expect(vo.deliveryDurationMs).toBe(5000);
    });

    it('deliveryDurationMs undefined when timestamps missing', () => {
      const vo = NotificationDeliveryVO.create(makeProps());
      expect(vo.deliveryDurationMs).toBeUndefined();
    });

    it('exposes sentAt/failedAt/provider fields', () => {
      const vo = NotificationDeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.failed(),
          sentAt: DATES.now,
          failedAt: DATES.now,
        }),
      );
      expect(vo.sentAt).toBe(DATES.now);
      expect(vo.failedAt).toBe(DATES.now);
      expect(vo.providerName).toBeUndefined();
      expect(vo.providerMessageId).toBeUndefined();
    });
  });
});
