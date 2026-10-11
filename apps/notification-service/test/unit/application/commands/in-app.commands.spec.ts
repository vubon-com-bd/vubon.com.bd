import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SendInAppHandler } from '../../../../src/module/application/commands/in-app/send-in-app.handler.js';
import { SendInAppCommand } from '../../../../src/module/application/commands/in-app/send-in-app.command.js';
import { MarkInAppReadHandler } from '../../../../src/module/application/commands/in-app/mark-in-app-read.handler.js';
import { MarkInAppReadCommand } from '../../../../src/module/application/commands/in-app/mark-in-app-read.command.js';
import { DismissInAppHandler } from '../../../../src/module/application/commands/in-app/dismiss-in-app.handler.js';
import { DismissInAppCommand } from '../../../../src/module/application/commands/in-app/dismiss-in-app.command.js';
import { RecordInAppClickHandler } from '../../../../src/module/application/commands/in-app/record-in-app-click.handler.js';
import { RecordInAppClickCommand } from '../../../../src/module/application/commands/in-app/record-in-app-click.command.js';

function mockSvc() {
  return {
    send: jest.fn().mockResolvedValue({ success: true, notificationId: 'n-1', status: 'queued' }),
    markRead: jest.fn().mockResolvedValue({ id: 'n-1' }),
    dismiss: jest.fn().mockResolvedValue({ id: 'n-1' }),
    recordClick: jest.fn().mockResolvedValue({ id: 'n-1' }),
  } as never;
}

describe('In-App command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('SendInAppHandler', async () => {
    await new SendInAppHandler(svc).execute(new SendInAppCommand({
      userId: 'u', type: 'toast', title: 'T', body: 'B',
    } as never, 'a'));
    expect(svc.send).toHaveBeenCalled();
  });
  it('MarkInAppReadHandler', async () => {
    await new MarkInAppReadHandler(svc).execute(new MarkInAppReadCommand({
      notificationId: 'n-1', userId: 'u',
    }));
    expect(svc.markRead).toHaveBeenCalled();
  });
  it('DismissInAppHandler', async () => {
    await new DismissInAppHandler(svc).execute(new DismissInAppCommand({
      notificationId: 'n-1', userId: 'u',
    }));
    expect(svc.dismiss).toHaveBeenCalled();
  });
  it('RecordInAppClickHandler', async () => {
    await new RecordInAppClickHandler(svc).execute(new RecordInAppClickCommand({
      notificationId: 'n-1', userId: 'u', actionId: 'a-1',
    }));
    expect(svc.recordClick).toHaveBeenCalled();
  });
});
