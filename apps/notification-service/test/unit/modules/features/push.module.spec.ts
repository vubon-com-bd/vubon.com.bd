/**
 * PushModule — Unit tests
 */
import 'reflect-metadata';
import { PushModule } from '@modules/push/push.module.js';
import { PushController } from '@interfaces/controllers/rest/push.controller.js';
import { PUSH_COMMAND_HANDLERS } from '@modules/push/commands/index.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('PushModule', () => {
  it('should be defined', () => expect(PushModule).toBeDefined());

  it('should register PushController', () => {
    expect(readMeta('controllers', PushModule)).toContain(PushController);
  });

  it('should register all command handlers', () => {
    const providers = readMeta('providers', PushModule);
    for (const handler of PUSH_COMMAND_HANDLERS) expect(providers).toContain(handler);
  });

  it('should have command handler count = 2', () => {
    expect(PUSH_COMMAND_HANDLERS).toHaveLength(2);
  });
});
