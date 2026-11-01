/**
 * FcmProviderModule — Unit tests
 */
import 'reflect-metadata';
import { FcmProviderModule } from '@modules/provider-gateways/providers/fcm.module.js';
import { FcmProvider } from '@infrastructure/providers/push/fcm.provider.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('FcmProviderModule', () => {
  it('should be defined', () => expect(FcmProviderModule).toBeDefined());
  it('should provide FcmProvider', () => {
    expect(readMeta('providers', FcmProviderModule)).toContain(FcmProvider);
  });
  it('should export FcmProvider', () => {
    expect(readMeta('exports', FcmProviderModule)).toContain(FcmProvider);
  });
});
