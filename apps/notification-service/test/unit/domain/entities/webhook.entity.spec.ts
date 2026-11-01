import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const makeVO = (overrides: any = {}) =>
  WebhookVO.create({
    id: WebhookIdVO.create(IDS.webhookId),
    name: 'Order events',
    type: WebhookTypeVO.create('outgoing'),
    status: WebhookStatusVO.active(),
    url: WebhookUrlVO.create('https://example.com/hook'),
    events: ['order.created', 'order.updated'] as const,
    ...overrides,
  });

describe('WebhookEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates active webhook + event', () => {
      const entity = WebhookEntity.create({
        id: WebhookIdVO.create(IDS.webhookId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isActive()).toBe(true);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-active status', () => {
      expect(() =>
        WebhookEntity.create({
          id: WebhookIdVO.create(IDS.webhookId),
          vo: makeVO({ status: WebhookStatusVO.paused() }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.webhookId);
    });

    it('paused state requires pausedAt', () => {
      expect(() =>
        WebhookEntity.reconstitute({
          id: IDS.webhookId,
          createdAt: NOW,
          updatedAt: NOW,
          props: { vo: makeVO({ status: WebhookStatusVO.paused() }) },
        }),
      ).toThrow(ValidationError);
    });

    it('disabled state requires disabledAt', () => {
      expect(() =>
        WebhookEntity.reconstitute({
          id: IDS.webhookId,
          createdAt: NOW,
          updatedAt: NOW,
          props: { vo: makeVO({ status: WebhookStatusVO.disabled() }) },
        }),
      ).toThrow(ValidationError);
    });

    it('failed state requires failureReason', () => {
      expect(() =>
        WebhookEntity.reconstitute({
          id: IDS.webhookId,
          createdAt: NOW,
          updatedAt: NOW,
          props: { vo: makeVO({ status: WebhookStatusVO.failed() }) },
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('activate()', () => {
    it('paused → active', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: WebhookStatusVO.paused() }), pausedAt: NOW },
      });
      entity.activate(NOW);
      expect(entity.isActive()).toBe(true);
      expect(entity.pausedAt).toBeUndefined();
    });
  });

  describe('pause()', () => {
    it('active → paused with reason', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.pause('maintenance', NOW);
      expect(entity.vo.status.isPaused()).toBe(true);
      expect(entity.pausedReason).toBe('maintenance');
    });
  });

  describe('disable()', () => {
    it('active → disabled', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.disable('deprecated', NOW);
      expect(entity.vo.status.isDisabled()).toBe(true);
      expect(entity.disabledReason).toBe('deprecated');
    });
  });

  describe('recordDelivery()', () => {
    it('updates lastTriggeredAt + emits event', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.recordDelivery('del-1', 'order.created', 200, 150, NOW);
      expect(entity.vo.lastTriggeredAt).toBe(NOW);
    });
  });

  describe('recordDeliveryFailure()', () => {
    it('emits failure event', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      const before = entity.domainEvents.length;
      entity.recordDeliveryFailure('del-1', 'order.created', 1, 'timeout', 500, NOW);
      expect(entity.domainEvents.length).toBeGreaterThan(before);
    });
  });

  describe('addEvents()', () => {
    it('updates events', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.addEvents(['user.created'], NOW);
      expect(entity.vo.eventCount).toBe(1);
    });
  });

  describe('predicates', () => {
    it('canDeliver for active', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.canDeliver()).toBe(true);
    });

    it('isTerminal for disabled', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: WebhookStatusVO.disabled() }),
          disabledAt: NOW,
        },
      });
      expect(entity.isTerminal()).toBe(true);
    });

    it('subscribes to event', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.subscribes('order.created')).toBe(true);
      expect(entity.subscribes('payment.failed')).toBe(false);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = WebhookEntity.reconstitute({
        id: IDS.webhookId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.webhookId);
      expect(entity.webhookId.value).toBe(IDS.webhookId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.pausedAt).toBeUndefined();
      expect(entity.pausedReason).toBeUndefined();
      expect(entity.disabledAt).toBeUndefined();
      expect(entity.disabledReason).toBeUndefined();
      expect(entity.failureReason).toBeUndefined();
    });
  });
});
