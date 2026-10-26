/**
 * SesProviderModule — Unit tests
 */
import 'reflect-metadata';
import { SesProviderModule } from '@modules/provider-gateways/providers/ses.module.js';
import { SesProvider } from '@infrastructure/providers/email/ses.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('SesProviderModule', () => {
  it('should be defined', () => expect(SesProviderModule).toBeDefined());
  it('should provide SesProvider', () => {
    expect(readMeta('providers', SesProviderModule)).toContain(SesProvider);
  });
  it('should export SesProvider', () => {
    expect(readMeta('exports', SesProviderModule)).toContain(SesProvider);
  });
});
