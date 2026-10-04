import { jest } from '@jest/globals';
import { ProcessWebhookHandler } from '../../../../src/module/application/commands/webhook/process-webhook.handler.js';
import { ProcessWebhookCommand } from '../../../../src/module/application/commands/webhook/process-webhook.command.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('ProcessWebhookHandler', () => {
  it('calls service.process', async () => {
    const svc = {
      process: jest.fn(async () => ({
        success: true,
        webhookId: UUID,
        processed: true,
      })),
    };
    const h = new ProcessWebhookHandler(svc as never);
    const out = await h.execute(
      new ProcessWebhookCommand({
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'payment.succeeded',
        payload: {},
      }),
    );
    expect(svc.process).toHaveBeenCalled();
    expect(out.success).toBe(true);
  });
});
