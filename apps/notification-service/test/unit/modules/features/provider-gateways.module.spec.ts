/**
 * ProviderGatewaysModule — Unit tests
 */
import 'reflect-metadata';
import { ProviderGatewaysModule } from '@modules/provider-gateways/provider-gateways.module.js';
import { SendgridProviderModule } from '@modules/provider-gateways/providers/sendgrid.module.js';
import { MailgunProviderModule } from '@modules/provider-gateways/providers/mailgun.module.js';
import { SesProviderModule } from '@modules/provider-gateways/providers/ses.module.js';
import { TwilioProviderModule } from '@modules/provider-gateways/providers/twilio.module.js';
import { FcmProviderModule } from '@modules/provider-gateways/providers/fcm.module.js';
import { ApnsProviderModule } from '@modules/provider-gateways/providers/apns.module.js';
import { WebhookProviderModule } from '@modules/provider-gateways/providers/webhook.module.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('ProviderGatewaysModule', () => {
  it('should be defined', () => expect(ProviderGatewaysModule).toBeDefined());

  it('should import all 7 provider modules', () => {
    const imports = readMeta('imports', ProviderGatewaysModule);
    expect(imports).toContain(SendgridProviderModule);
    expect(imports).toContain(MailgunProviderModule);
    expect(imports).toContain(SesProviderModule);
    expect(imports).toContain(TwilioProviderModule);
    expect(imports).toContain(FcmProviderModule);
    expect(imports).toContain(ApnsProviderModule);
    expect(imports).toContain(WebhookProviderModule);
  });

  it('should have 7 imports', () => {
    expect(readMeta('imports', ProviderGatewaysModule)).toHaveLength(7);
  });

  it('should export all imported modules', () => {
    const imports = readMeta('imports', ProviderGatewaysModule);
    const exports = readMeta('exports', ProviderGatewaysModule);
    for (const imp of imports) expect(exports).toContain(imp);
  });
});
