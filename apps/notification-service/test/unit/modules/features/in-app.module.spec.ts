/**
 * InAppModule — Unit tests
 */
import 'reflect-metadata';
import { InAppModule } from '@modules/in-app/in-app.module.js';
import { InAppController } from '@interfaces/controllers/rest/in-app.controller.js';
import { IN_APP_COMMAND_HANDLERS } from '@modules/in-app/commands/index.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('InAppModule', () => {
  it('should be defined', () => expect(InAppModule).toBeDefined());

  it('should register InAppController', () => {
    expect(readMeta('controllers', InAppModule)).toContain(InAppController);
  });

  it('should register all command handlers', () => {
    const providers = readMeta('providers', InAppModule);
    for (const handler of IN_APP_COMMAND_HANDLERS) expect(providers).toContain(handler);
  });

  it('should have command handler count = 3', () => {
    expect(IN_APP_COMMAND_HANDLERS).toHaveLength(3);
  });
});
