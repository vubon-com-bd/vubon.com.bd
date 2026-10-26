/**
 * MailgunProviderModule — Unit tests
 */
import 'reflect-metadata';
import { MailgunProviderModule } from '@modules/provider-gateways/providers/mailgun.module.js';
import { MailgunProvider } from '@infrastructure/providers/email/mailgun.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('MailgunProviderModule', () => {
  it('should be defined', () => expect(MailgunProviderModule).toBeDefined());
  it('should provide MailgunProvider', () => {
    expect(readMeta('providers', MailgunProviderModule)).toContain(MailgunProvider);
  });
  it('should export MailgunProvider', () => {
    expect(readMeta('exports', MailgunProviderModule)).toContain(MailgunProvider);
  });
});
