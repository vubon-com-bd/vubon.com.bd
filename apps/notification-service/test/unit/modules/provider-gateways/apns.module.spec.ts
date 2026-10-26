/**
 * ApnsProviderModule — Unit tests
 */
import 'reflect-metadata';
import { ApnsProviderModule } from '@modules/provider-gateways/providers/apns.module.js';
import { ApnsProvider } from '@infrastructure/providers/push/apns.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('ApnsProviderModule', () => {
  it('should be defined', () => expect(ApnsProviderModule).toBeDefined());
  it('should provide ApnsProvider', () => {
    expect(readMeta('providers', ApnsProviderModule)).toContain(ApnsProvider);
  });
  it('should export ApnsProvider', () => {
    expect(readMeta('exports', ApnsProviderModule)).toContain(ApnsProvider);
  });
});
