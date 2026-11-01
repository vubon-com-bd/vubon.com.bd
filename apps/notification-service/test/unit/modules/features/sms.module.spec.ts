/**
 * SmsModule — Unit tests
 */
import 'reflect-metadata';
import { SmsModule } from '@modules/sms/sms.module.js';
import { SmsController } from '@interfaces/controllers/rest/sms.controller.js';
import { SMS_COMMAND_HANDLERS } from '@modules/sms/commands/index.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('SmsModule', () => {
  it('should be defined', () => expect(SmsModule).toBeDefined());

  it('should register SmsController', () => {
    expect(readMeta('controllers', SmsModule)).toContain(SmsController);
  });

  it('should register all command handlers', () => {
    const providers = readMeta('providers', SmsModule);
    for (const handler of SMS_COMMAND_HANDLERS) expect(providers).toContain(handler);
  });

  it('should have command handler count = 2', () => {
    expect(SMS_COMMAND_HANDLERS).toHaveLength(2);
  });
});
