import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const makeProps = (overrides: any = {}) => ({
  id: WebhookIdVO.create(IDS.webhookId),
  name: 'Order events',
  type: WebhookTypeVO.create('outgoing'),
  status: WebhookStatusVO.active(),
  url: WebhookUrlVO.create('https://example.com/hook'),
  events: ['order.created', 'order.updated'] as const,
  ...overrides,
});

describe('WebhookVO', () => {
  describe('create()', () => {
    it('creates valid webhook', () => {
      const vo = WebhookVO.create(makeProps());
      expect(vo.name).toBe('Order events');
      expect(vo.eventCount).toBe(2);
    });

    it('rejects empty name', () => {
      expect(() => WebhookVO.create(makeProps({ name: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long name (>100)', () => {
      expect(() => WebhookVO.create(makeProps({ name: 'a'.repeat(101) }))).toThrow(ValidationError);
    });

    it('rejects no events', () => {
      expect(() => WebhookVO.create(makeProps({ events: [] }))).toThrow(ValidationError);
    });

    it('rejects invalid event', () => {
      expect(() =>
        WebhookVO.create(makeProps({ events: ['bogus.event'] })),
      ).toThrow(ValidationError);
    });

    it('rejects too many headers', () => {
      const headers = Object.fromEntries(
        Array.from({ length: 21 }, (_, i) => [`X-Header-${i}`, 'v']),
      );
      expect(() =>
        WebhookVO.create(makeProps({ headers })),
      ).toThrow(ValidationError);
    });

    it('accepts valid headers', () => {
      const vo = WebhookVO.create(makeProps({ headers: { 'X-Custom': 'v' } }));
      expect(vo.hasHeaders()).toBe(true);
    });

    it('rejects incoming without secret', () => {
      expect(() =>
        WebhookVO.create(makeProps({ type: WebhookTypeVO.create('incoming') })),
      ).toThrow(ValidationError);
    });

    it('accepts incoming with secret', () => {
      const vo = WebhookVO.create(
        makeProps({
          type: WebhookTypeVO.create('incoming'),
          secret: WebhookSecretVO.create(IDS.webhookSecret),
        }),
      );
      expect(vo.hasSecret()).toBe(true);
    });

    it('accepts outgoing without secret', () => {
      const vo = WebhookVO.create(makeProps());
      expect(vo.hasSecret()).toBe(false);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = WebhookVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isActive', () => {
      expect(WebhookVO.reconstitute(makeProps()).isActive()).toBe(true);
    });

    it('canDeliver for active', () => {
      expect(WebhookVO.reconstitute(makeProps()).canDeliver()).toBe(true);
    });

    it('isIncoming / isOutgoing', () => {
      expect(WebhookVO.reconstitute(makeProps()).isOutgoing()).toBe(true);
      expect(WebhookVO.reconstitute(makeProps()).isIncoming()).toBe(false);
    });

    it('isTerminal for disabled', () => {
      const vo = WebhookVO.reconstitute(makeProps({ status: WebhookStatusVO.disabled() }));
      expect(vo.isTerminal()).toBe(true);
    });
  });

  describe('subscribes', () => {
    const vo = WebhookVO.reconstitute(makeProps());
    it('true for subscribed event', () => {
      expect(vo.subscribes('order.created')).toBe(true);
    });
    it('false for non-subscribed', () => {
      expect(vo.subscribes('payment.failed')).toBe(false);
    });
  });

  describe('withStatus / withLastTriggeredAt / withEvents', () => {
    const base = WebhookVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus(WebhookStatusVO.paused());
      expect(updated.isActive()).toBe(false);
    });

    it('withLastTriggeredAt', () => {
      const updated = base.withLastTriggeredAt('2025-01-15T10:00:00Z');
      expect(updated.lastTriggeredAt).toBe('2025-01-15T10:00:00Z');
    });

    it('withEvents updates', () => {
      const updated = base.withEvents(['user.created']);
      expect(updated.eventCount).toBe(1);
    });
  });

  describe('getters', () => {
    const vo = WebhookVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.name).toBe('Order events');
      expect(vo.type).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.url).toBeDefined();
      expect(vo.secret).toBeUndefined();
      expect(vo.events.length).toBe(2);
      expect(vo.headers).toBeUndefined();
      expect(vo.lastTriggeredAt).toBeUndefined();
    });
  });
});
