import { firstValueFrom, of } from 'rxjs';
import { WebhookLifecycleSaga } from '../../../../src/module/application/sagas/webhook-lifecycle.saga.js';
import {
  WebhookReceivedEvent,
  WebhookFailedEvent,
} from '../../../../src/module/domain/events/webhook.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('WebhookLifecycleSaga', () => {
  let saga: WebhookLifecycleSaga;

  beforeEach(() => {
    saga = new WebhookLifecycleSaga();
  });

  it('onWebhookReceived completes without error', async () => {
    const e = new WebhookReceivedEvent({
      aggregateId: UUID,
      payload: {
        webhookId: UUID,
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'payment.succeeded',
        receivedAt: new Date().toISOString(),
      },
    });
    await firstValueFrom(saga.onWebhookReceived(of(e)));
    expect(true).toBe(true);
  });

  it('onWebhookFailed completes without error', async () => {
    const e = new WebhookFailedEvent({
      aggregateId: UUID,
      payload: {
        webhookId: UUID,
        gateway: 'bkash',
        reason: 'network',
        attempts: 1,
      },
    });
    await firstValueFrom(saga.onWebhookFailed(of(e)));
    expect(true).toBe(true);
  });
});
