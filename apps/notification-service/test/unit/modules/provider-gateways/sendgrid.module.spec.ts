/**
 * SendgridProviderModule — Unit tests
 */
import 'reflect-metadata';
import { SendgridProviderModule } from '@modules/provider-gateways/providers/sendgrid.module.js';
import { SendgridProvider } from '@infrastructure/providers/email/sendgrid.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('SendgridProviderModule', () => {
  it('should be defined', () => expect(SendgridProviderModule).toBeDefined());
  it('should provide SendgridProvider', () => {
    expect(readMeta('providers', SendgridProviderModule)).toContain(SendgridProvider);
  });
  it('should export SendgridProvider', () => {
    expect(readMeta('exports', SendgridProviderModule)).toContain(SendgridProvider);
  });
});
