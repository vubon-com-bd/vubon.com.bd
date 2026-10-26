/**
 * EmailModule — Unit tests
 * @module notification-service/test/unit/modules/features
 */
import 'reflect-metadata';
import { EmailModule } from '@modules/email/email.module.js';
import { EmailController } from '@interfaces/controllers/rest/email.controller.js';
import { EMAIL_COMMAND_HANDLERS } from '@modules/email/commands/index.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('EmailModule', () => {
  it('should be defined', () => {
    expect(EmailModule).toBeDefined();
  });

  it('should register EmailController', () => {
    expect(readMeta('controllers', EmailModule)).toContain(EmailController);
  });

  it('should register all command handlers', () => {
    const providers = readMeta('providers', EmailModule);
    for (const handler of EMAIL_COMMAND_HANDLERS) {
      expect(providers).toContain(handler);
    }
  });

  it('should have command handler count = 3', () => {
    expect(EMAIL_COMMAND_HANDLERS).toHaveLength(3);
  });
});
