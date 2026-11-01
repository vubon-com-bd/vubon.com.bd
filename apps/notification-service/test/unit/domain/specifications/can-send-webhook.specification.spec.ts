import { CanSendWebhookSpecification } from '@domain/specifications/can-send-webhook.specification.js';
import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const make = (o: any = {}) => {
  const vo = WebhookVO.create({
    id: WebhookIdVO.create(IDS.webhookId),
    name: 'Hook',
    type: WebhookTypeVO.create('outgoing'),
    status: WebhookStatusVO.active(),
    url: WebhookUrlVO.create('https://x.com/h'),
    events: ['order.created'] as const,
    ...o.vo,
  });
  return WebhookEntity.reconstitute({
    id: IDS.webhookId, createdAt: NOW, updatedAt: NOW,
    props: { vo, ...o.props },
  });
};

describe('CanSendWebhookSpecification', () => {
  const spec = CanSendWebhookSpecification.strict();

  it('satisfied for active + subscribed event', () => {
    expect(spec.isSatisfiedBy({ webhook: make(), ctx: { event: 'order.created' } })).toBe(true);
  });

  it('not satisfied when not subscribed', () => {
    expect(
      spec.isSatisfiedBy({ webhook: make(), ctx: { event: 'payment.failed' } }),
    ).toBe(false);
  });

  it('not satisfied when payload too large', () => {
    expect(
      spec.isSatisfiedBy({
        webhook: make(),
        ctx: { event: 'order.created', payloadSizeBytes: 300_000 },
      }),
    ).toBe(false);
  });

  it('not satisfied when too many failures', () => {
    expect(
      spec.isSatisfiedBy({
        webhook: make(),
        ctx: { event: 'order.created', failedAttempts24h: 10 },
      }),
    ).toBe(false);
  });

  it('not satisfied when paused', () => {
    const w = make({ vo: { status: WebhookStatusVO.paused() }, props: { pausedAt: NOW } });
    expect(spec.isSatisfiedBy({ webhook: w, ctx: { event: 'order.created' } })).toBe(false);
  });
});
