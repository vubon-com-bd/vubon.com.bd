/**
 * TwilioProviderModule — Unit tests
 */
import 'reflect-metadata';
import { TwilioProviderModule } from '@modules/provider-gateways/providers/twilio.module.js';
import { TwilioProvider } from '@infrastructure/providers/sms/twilio.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('TwilioProviderModule', () => {
  it('should be defined', () => expect(TwilioProviderModule).toBeDefined());
  it('should provide TwilioProvider', () => {
    expect(readMeta('providers', TwilioProviderModule)).toContain(TwilioProvider);
  });
  it('should export TwilioProvider', () => {
    expect(readMeta('exports', TwilioProviderModule)).toContain(TwilioProvider);
  });
});
