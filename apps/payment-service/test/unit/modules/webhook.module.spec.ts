/**
 * WebhookModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { WebhookModule } from '@modules/webhook/webhook.module';
import { BkashWebhookController } from '@interfaces/controllers/webhooks/bkash.webhook';
import { NagadWebhookController } from '@interfaces/controllers/webhooks/nagad.webhook';
import { StripeWebhookController } from '@interfaces/controllers/webhooks/stripe.webhook';
import { WEBHOOK_COMMAND_HANDLERS } from '@modules/webhook/commands';

describe('WebhookModule', () => {
  it('is defined', () => {
    expect(WebhookModule).toBeDefined();
  });

  it('registers 8 webhook controllers', () => {
    const controllers = Reflect.getMetadata('controllers', WebhookModule) as unknown[];
    expect(controllers).toHaveLength(8);
    expect(controllers).toContain(BkashWebhookController);
    expect(controllers).toContain(NagadWebhookController);
    expect(controllers).toContain(StripeWebhookController);
  });

  it('has 4 command handlers', () => {
    expect(WEBHOOK_COMMAND_HANDLERS).toHaveLength(4);
  });
});
