import { WebhookMapper } from '@application/mappers/webhook.mapper.js';
import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build(opts: { withSecret?: boolean; withHeaders?: boolean; withTriggered?: boolean } = {}) {
  const vo = WebhookVO.create({
    id: WebhookIdVO.create(IDS.webhookId),
    name: 'Order Hook',
    type: WebhookTypeVO.create('outgoing'),
    status: WebhookStatusVO.active(),
    url: WebhookUrlVO.create('https://example.com/webhook'),
    secret: opts.withSecret ? WebhookSecretVO.create(IDS.webhookSecret) : undefined,
    events: ['order.created'],
    headers: opts.withHeaders ? { 'X-Custom': 'value' } : undefined,
    lastTriggeredAt: opts.withTriggered ? DATES.now : undefined,
  });
  return WebhookEntity.create({
    id: WebhookIdVO.create(IDS.webhookId),
    vo,
    now: DATES.now,
  });
}

describe('WebhookMapper', () => {
  it('toResponse minimal', () => {
    const r = WebhookMapper.toResponse(build());
    expect(r.id).toBe(IDS.webhookId);
    expect(r.hasSecret).toBe(false);
    expect(r.headers).toBeUndefined();
  });

  it('toResponse with secret + headers', () => {
    const r = WebhookMapper.toResponse(build({ withSecret: true, withHeaders: true }));
    expect(r.hasSecret).toBe(true);
    expect(r.headers).toEqual({ 'X-Custom': 'value' });
  });

  it('toResponse with lastTriggeredAt', () => {
    const r = WebhookMapper.toResponse(build({ withTriggered: true }));
    expect(r.lastTriggeredAt).toBe(DATES.now);
  });

  it('toSummary', () => {
    const r = WebhookMapper.toSummary(build());
    expect(r.id).toBe(IDS.webhookId);
    expect(r.eventCount).toBe(1);
  });

  it('toListResponse', () => {
    const r = WebhookMapper.toListResponse([build()], 5, 1, 2);
    expect(r.totalPages).toBe(3);
  });
});
