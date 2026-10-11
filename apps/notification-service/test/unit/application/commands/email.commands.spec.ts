import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SendEmailHandler } from '../../../../src/module/application/commands/email/send-email.handler.js';
import { SendEmailCommand } from '../../../../src/module/application/commands/email/send-email.command.js';
import { SendEmailWithTemplateHandler } from '../../../../src/module/application/commands/email/send-email-with-template.handler.js';
import { SendEmailWithTemplateCommand } from '../../../../src/module/application/commands/email/send-email-with-template.command.js';
import { RetryEmailHandler } from '../../../../src/module/application/commands/email/retry-email.handler.js';
import { RetryEmailCommand } from '../../../../src/module/application/commands/email/retry-email.command.js';
import { CancelEmailHandler } from '../../../../src/module/application/commands/email/cancel-email.handler.js';
import { CancelEmailCommand } from '../../../../src/module/application/commands/email/cancel-email.command.js';

function mockSvc() {
  return {
    send: jest.fn().mockResolvedValue({ success: true, messageId: 'm-1' }),
    sendWithTemplate: jest.fn().mockResolvedValue({ success: true }),
    retry: jest.fn().mockResolvedValue({ success: true }),
    cancel: jest.fn().mockResolvedValue({ id: 'e-1' }),
  } as never;
}

describe('Email command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('SendEmailHandler', async () => {
    const h = new SendEmailHandler(svc);
    await h.execute(new SendEmailCommand({ to: 'x@y.com', subject: 'S' } as never, 'a'));
    expect(svc.send).toHaveBeenCalled();
  });
  it('SendEmailWithTemplateHandler', async () => {
    const h = new SendEmailWithTemplateHandler(svc);
    await h.execute(new SendEmailWithTemplateCommand({ to: 'x@y.com', templateSlug: 'w', templateData: {} } as never));
    expect(svc.sendWithTemplate).toHaveBeenCalled();
  });
  it('RetryEmailHandler', async () => {
    const h = new RetryEmailHandler(svc);
    await h.execute(new RetryEmailCommand('e-1', 'a'));
    expect(svc.retry).toHaveBeenCalled();
  });
  it('CancelEmailHandler', async () => {
    const h = new CancelEmailHandler(svc);
    await h.execute(new CancelEmailCommand('e-1', 'a'));
    expect(svc.cancel).toHaveBeenCalled();
  });
});
