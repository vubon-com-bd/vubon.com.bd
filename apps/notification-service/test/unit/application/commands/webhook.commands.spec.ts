import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateWebhookHandler } from '../../../../src/module/application/commands/webhook/create-webhook.handler.js';
import { CreateWebhookCommand } from '../../../../src/module/application/commands/webhook/create-webhook.command.js';
import { UpdateWebhookHandler } from '../../../../src/module/application/commands/webhook/update-webhook.handler.js';
import { UpdateWebhookCommand } from '../../../../src/module/application/commands/webhook/update-webhook.command.js';
import { ActivateWebhookHandler } from '../../../../src/module/application/commands/webhook/activate-webhook.handler.js';
import { ActivateWebhookCommand } from '../../../../src/module/application/commands/webhook/activate-webhook.command.js';
import { DeactivateWebhookHandler } from '../../../../src/module/application/commands/webhook/deactivate-webhook.handler.js';
import { DeactivateWebhookCommand } from '../../../../src/module/application/commands/webhook/deactivate-webhook.command.js';
import { DisableWebhookHandler } from '../../../../src/module/application/commands/webhook/disable-webhook.handler.js';
import { DisableWebhookCommand } from '../../../../src/module/application/commands/webhook/disable-webhook.command.js';
import { TestWebhookHandler } from '../../../../src/module/application/commands/webhook/test-webhook.handler.js';
import { TestWebhookCommand } from '../../../../src/module/application/commands/webhook/test-webhook.command.js';
import { RetryWebhookDeliveryHandler } from '../../../../src/module/application/commands/webhook/retry-webhook-delivery.handler.js';
import { RetryWebhookDeliveryCommand } from '../../../../src/module/application/commands/webhook/retry-webhook-delivery.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 'w-1' });
  return {
    create: r, update: r, activate: r, deactivate: r, disable: r,
    test: jest.fn().mockResolvedValue({ webhookId: 'w-1', success: true }),
    retryDelivery: jest.fn().mockResolvedValue({ id: 'd-1' }),
  } as never;
}

describe('Webhook command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('CreateWebhookHandler', async () => {
    await new CreateWebhookHandler(svc).execute(new CreateWebhookCommand({
      url: 'https://x.com/h', method: 'POST', events: ['order.created'],
    } as never, 'a'));
    expect(svc.create).toHaveBeenCalled();
  });
  it('UpdateWebhookHandler', async () => {
    await new UpdateWebhookHandler(svc).execute(new UpdateWebhookCommand({ webhookId: 'w-1' } as never, 'a'));
    expect(svc.update).toHaveBeenCalled();
  });
  it('ActivateWebhookHandler', async () => {
    await new ActivateWebhookHandler(svc).execute(new ActivateWebhookCommand({ webhookId: 'w-1' } as never, 'a'));
    expect(svc.activate).toHaveBeenCalled();
  });
  it('DeactivateWebhookHandler', async () => {
    await new DeactivateWebhookHandler(svc).execute(new DeactivateWebhookCommand({ webhookId: 'w-1' } as never, 'a'));
    expect(svc.deactivate).toHaveBeenCalled();
  });
  it('DisableWebhookHandler', async () => {
    await new DisableWebhookHandler(svc).execute(new DisableWebhookCommand({ webhookId: 'w-1', reason: 'x' } as never, 'a'));
    expect(svc.disable).toHaveBeenCalled();
  });
  it('TestWebhookHandler', async () => {
    await new TestWebhookHandler(svc).execute(new TestWebhookCommand({ webhookId: 'w-1' } as never, 'a'));
    expect(svc.test).toHaveBeenCalled();
  });
  it('RetryWebhookDeliveryHandler', async () => {
    await new RetryWebhookDeliveryHandler(svc).execute(new RetryWebhookDeliveryCommand({
      deliveryId: 'd-1',
    } as never, 'a'));
    expect(svc.retryDelivery).toHaveBeenCalled();
  });
});
