/**
 * DigestModule — Unit tests
 */
import 'reflect-metadata';
import { DigestModule } from '@modules/digest/digest.module.js';
import { DigestController } from '@interfaces/controllers/rest/digest.controller.js';
import { DIGEST_COMMAND_HANDLERS } from '@modules/digest/commands/index.js';
import { DIGEST_QUERY_HANDLERS } from '@modules/digest/queries/index.js';
import { DigestService } from '@application/services/impl/digest.service.js';
import { DIGEST_SERVICE } from '@application/services/interfaces/digest.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('DigestModule', () => {
  it('should be defined', () => expect(DigestModule).toBeDefined());

  it('should register DigestController', () => {
    expect(readMeta('controllers', DigestModule)).toContain(DigestController);
  });

  it('should provide DigestService + token', () => {
    const providers = readMeta('providers', DigestModule);
    expect(providers).toContain(DigestService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === DIGEST_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all handlers', () => {
    const providers = readMeta('providers', DigestModule);
    for (const h of DIGEST_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of DIGEST_QUERY_HANDLERS) expect(providers).toContain(h);
  });
});
