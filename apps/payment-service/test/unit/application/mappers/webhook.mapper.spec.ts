import { WebhookMapper } from '../../../../src/module/application/mappers/webhook.mapper.js';
import { WebhookEventEntity } from '../../../../src/module/domain/entities/webhook-event.entity.js';

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
      payload: { paymentId: UUID },
    },
  });
}

describe('WebhookMapper', () => {
  it('toResponse maps all fields', () => {
    const dto = WebhookMapper.toResponse(makeEvent());
    expect(dto.id).toBe(UUID);
    expect(dto.gateway).toBe('bkash');
    expect(dto.gatewayEventId).toBe('evt_123');
    expect(dto.eventType).toBe('payment.succeeded');
    expect(dto.verified).toBe(false);
    expect(dto.processed).toBe(false);
    expect(dto.attempts).toBe(0);
  });

  it('toListResponse computes totalPages', () => {
    const dto = WebhookMapper.toListResponse([makeEvent()], 100, 1, 30);
    expect(dto.totalPages).toBe(4);
  });
});
