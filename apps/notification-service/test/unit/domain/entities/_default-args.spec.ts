/**
 * Default-argument coverage — Target 54 default-arg branches
 * @module notification-service/test/unit/domain
 */
import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

describe('WebhookEntity — default-arg branches', () => {
  const makeVO = (o: any = {}) =>
    WebhookVO.create({
      id: WebhookIdVO.create(IDS.webhookId),
      name: 'Hook',
      type: WebhookTypeVO.create('outgoing'),
      status: WebhookStatusVO.active(),
      url: WebhookUrlVO.create('https://x.com/h'),
      events: ['order.created'] as const,
      ...o,
    });
  const make = (o: any = {}) =>
    WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO(), ...o },
    });

  it('activate() without now — L89', () => {
    const e = make({ vo: makeVO({ status: WebhookStatusVO.paused() }), pausedAt: NOW });
    e.activate();
    expect(e.isActive()).toBe(true);
  });

  it('pause() without now — L106', () => {
    const e = make();
    e.pause('reason');
    expect(e.vo.status.isPaused()).toBe(true);
  });

  it('disable() without now — L122', () => {
    const e = make();
    e.disable('reason');
    expect(e.vo.status.isDisabled()).toBe(true);
  });

  it('recordDelivery() without now — L143', () => {
    const e = make();
    e.recordDelivery('del-1', 'order.created', 200, 100);
    expect(e.vo.lastTriggeredAt).toBeDefined();
  });

  it('recordDeliveryFailure() without now — L170', () => {
    const e = make();
    const before = e.domainEvents.length;
    e.recordDeliveryFailure('del-1', 'order.created', 1, 'timeout');
    expect(e.domainEvents.length).toBeGreaterThan(before);
  });

  it('addEvents() without now — L191', () => {
    const e = make();
    e.addEvents(['user.created']);
    expect(e.vo.eventCount).toBe(1);
  });
});
