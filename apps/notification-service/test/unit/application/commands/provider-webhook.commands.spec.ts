import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProcessProviderWebhookHandler } from '../../../../src/module/application/commands/provider-webhook/process-provider-webhook.handler.js';
import { ProcessProviderWebhookCommand } from '../../../../src/module/application/commands/provider-webhook/process-provider-webhook.command.js';

function mockSvc() {
  return {
    process: jest.fn().mockResolvedValue({
      accepted: true, provider: 'sendgrid', processedEvents: 0, updatedNotifications: [],
    }),
  } as never;
}

describe('ProviderWebhook command handler', () => {
  it('ProcessProviderWebhookHandler delegates', async () => {
    const svc = mockSvc();
    const h = new ProcessProviderWebhookHandler(svc);
    const c = new ProcessProviderWebhookCommand({
      provider: 'sendgrid', body: {}, headers: {},
    });
    const r = await h.execute(c);
    expect(svc.process).toHaveBeenCalled();
    expect(r.accepted).toBe(true);
  });
});
