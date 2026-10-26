import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';
import { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';
import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build(opts: { withProvider?: boolean } = {}) {
  const delivery = NotificationDeliveryVO.create({
    status: DeliveryStatusVO.sent(),
    attemptCount: 1,
    maxAttempts: 3,
    sentAt: DATES.now,
    ...(opts.withProvider ? {
      providerName: ProviderNameVO.create('sendgrid'),
      providerMessageId: ProviderMessageIdVO.create('msg-123'),
    } : {}),
  });
  return NotificationDeliveryEntity.create({
    id: 'delivery-1',
    notificationId: NotificationIdVO.create(IDS.notificationId),
    delivery,
    now: DATES.now,
  });
}

describe('DeliveryMapper', () => {
  it('toResponse without provider', () => {
    const r = DeliveryMapper.toResponse(build());
    expect(r.id).toBe('delivery-1');
    expect(r.providerName).toBeUndefined();
  });

  it('toResponse with provider', () => {
    const r = DeliveryMapper.toResponse(build({ withProvider: true }));
    expect(r.providerName).toBe('sendgrid');
    expect(r.providerMessageId).toBe('msg-123');
  });

  it('toResponse includes status + attempts', () => {
    const r = DeliveryMapper.toResponse(build());
    expect(r.status).toBe('sent');
    expect(r.attemptCount).toBe(1);
    expect(r.maxAttempts).toBe(3);
  });
});
