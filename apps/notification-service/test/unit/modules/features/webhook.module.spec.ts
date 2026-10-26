/**
 * WebhookModule — Unit tests
 */
import 'reflect-metadata';
import { WebhookModule } from '@modules/webhook/webhook.module.js';
import { WebhookController } from '@interfaces/controllers/rest/webhook.controller.js';
import { WEBHOOK_COMMAND_HANDLERS } from '@modules/webhook/commands/index.js';
import { WEBHOOK_QUERY_HANDLERS } from '@modules/webhook/queries/index.js';
import { WebhookService } from '@application/services/impl/webhook.service.js';
import { WEBHOOK_SERVICE } from '@application/services/interfaces/webhook.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('WebhookModule', () => {
  it('should be defined', () => expect(WebhookModule).toBeDefined());

  it('should register WebhookController', () => {
    expect(readMeta('controllers', WebhookModule)).toContain(WebhookController);
  });

  it('should provide WebhookService + token', () => {
    const providers = readMeta('providers', WebhookModule);
    expect(providers).toContain(WebhookService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === WEBHOOK_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all handlers', () => {
    const providers = readMeta('providers', WebhookModule);
    for (const h of WEBHOOK_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of WEBHOOK_QUERY_HANDLERS) expect(providers).toContain(h);
  });
});
