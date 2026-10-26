/**
 * PreferenceModule — Unit tests
 */
import 'reflect-metadata';
import { PreferenceModule } from '@modules/preference/preference.module.js';
import { PreferenceController } from '@interfaces/controllers/rest/preference.controller.js';
import { PREFERENCE_COMMAND_HANDLERS } from '@modules/preference/commands/index.js';
import { PREFERENCE_QUERY_HANDLERS } from '@modules/preference/queries/index.js';
import { PreferenceService } from '@application/services/impl/preference.service.js';
import { PREFERENCE_SERVICE } from '@application/services/interfaces/preference.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('PreferenceModule', () => {
  it('should be defined', () => expect(PreferenceModule).toBeDefined());

  it('should register PreferenceController', () => {
    expect(readMeta('controllers', PreferenceModule)).toContain(PreferenceController);
  });

  it('should provide PreferenceService + token', () => {
    const providers = readMeta('providers', PreferenceModule);
    expect(providers).toContain(PreferenceService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === PREFERENCE_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all handlers', () => {
    const providers = readMeta('providers', PreferenceModule);
    for (const h of PREFERENCE_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of PREFERENCE_QUERY_HANDLERS) expect(providers).toContain(h);
  });
});
