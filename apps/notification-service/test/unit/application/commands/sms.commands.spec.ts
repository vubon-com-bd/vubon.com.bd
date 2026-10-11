import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SendSmsHandler } from '../../../../src/module/application/commands/sms/send-sms.handler.js';
import { SendSmsCommand } from '../../../../src/module/application/commands/sms/send-sms.command.js';
import { SendBulkSmsHandler } from '../../../../src/module/application/commands/sms/send-bulk-sms.handler.js';
import { SendBulkSmsCommand } from '../../../../src/module/application/commands/sms/send-bulk-sms.command.js';
import { RetrySmsHandler } from '../../../../src/module/application/commands/sms/retry-sms.handler.js';
import { RetrySmsCommand } from '../../../../src/module/application/commands/sms/retry-sms.command.js';
import { CancelSmsHandler } from '../../../../src/module/application/commands/sms/cancel-sms.handler.js';
import { CancelSmsCommand } from '../../../../src/module/application/commands/sms/cancel-sms.command.js';

function mockSvc() {
  return {
    send: jest.fn().mockResolvedValue({ success: true, messageId: 'm-1' }),
    sendBulk: jest.fn().mockResolvedValue([]),
    retry: jest.fn().mockResolvedValue({ success: true }),
    cancel: jest.fn().mockResolvedValue({ id: 's-1' }),
  } as never;
}

describe('SMS command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('SendSmsHandler', async () => {
    await new SendSmsHandler(svc).execute(
      new SendSmsCommand({ to: '+88017', message: 'M' } as never, 'a'),
    );
    expect(svc.send).toHaveBeenCalled();
  });
  it('SendBulkSmsHandler', async () => {
    await new SendBulkSmsHandler(svc).execute(
      new SendBulkSmsCommand({ recipients: ['+88017'], message: 'M' } as never, 'a'),
    );
    expect(svc.sendBulk).toHaveBeenCalled();
  });
  it('RetrySmsHandler', async () => {
    await new RetrySmsHandler(svc).execute(new RetrySmsCommand('s-1', 'a'));
    expect(svc.retry).toHaveBeenCalled();
  });
  it('CancelSmsHandler', async () => {
    await new CancelSmsHandler(svc).execute(new CancelSmsCommand('s-1', 'a'));
    expect(svc.cancel).toHaveBeenCalled();
  });
});
