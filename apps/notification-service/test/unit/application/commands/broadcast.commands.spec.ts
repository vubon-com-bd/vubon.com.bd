import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateBroadcastHandler } from '../../../../src/module/application/commands/broadcast/create-broadcast.handler.js';
import { CreateBroadcastCommand } from '../../../../src/module/application/commands/broadcast/create-broadcast.command.js';
import { UpdateBroadcastHandler } from '../../../../src/module/application/commands/broadcast/update-broadcast.handler.js';
import { UpdateBroadcastCommand } from '../../../../src/module/application/commands/broadcast/update-broadcast.command.js';
import { ScheduleBroadcastHandler } from '../../../../src/module/application/commands/broadcast/schedule-broadcast.handler.js';
import { ScheduleBroadcastCommand } from '../../../../src/module/application/commands/broadcast/schedule-broadcast.command.js';
import { StartBroadcastHandler } from '../../../../src/module/application/commands/broadcast/start-broadcast.handler.js';
import { StartBroadcastCommand } from '../../../../src/module/application/commands/broadcast/start-broadcast.command.js';
import { CancelBroadcastHandler } from '../../../../src/module/application/commands/broadcast/cancel-broadcast.handler.js';
import { CancelBroadcastCommand } from '../../../../src/module/application/commands/broadcast/cancel-broadcast.command.js';
import { TestBroadcastHandler } from '../../../../src/module/application/commands/broadcast/test-broadcast.handler.js';
import { TestBroadcastCommand } from '../../../../src/module/application/commands/broadcast/test-broadcast.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 'b-1' });
  return {
    create: r, update: r, schedule: r, start: r, cancel: r, test: r,
  } as never;
}

describe('Broadcast command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('CreateBroadcastHandler', async () => {
    await new CreateBroadcastHandler(svc).execute(new CreateBroadcastCommand({
      type: 'all_users', target: 'all', templateId: 't-1', channels: ['email'],
    } as never, 'a'));
    expect(svc.create).toHaveBeenCalled();
  });
  it('UpdateBroadcastHandler', async () => {
    await new UpdateBroadcastHandler(svc).execute(new UpdateBroadcastCommand({ broadcastId: 'b-1' } as never, 'a'));
    expect(svc.update).toHaveBeenCalled();
  });
  it('ScheduleBroadcastHandler', async () => {
    await new ScheduleBroadcastHandler(svc).execute(new ScheduleBroadcastCommand({
      broadcastId: 'b-1', scheduledAt: new Date().toISOString(),
    } as never, 'a'));
    expect(svc.schedule).toHaveBeenCalled();
  });
  it('StartBroadcastHandler', async () => {
    await new StartBroadcastHandler(svc).execute(new StartBroadcastCommand({
      broadcastId: 'b-1', totalRecipients: 100,
    } as never, 'a'));
    expect(svc.start).toHaveBeenCalled();
  });
  it('CancelBroadcastHandler', async () => {
    await new CancelBroadcastHandler(svc).execute(new CancelBroadcastCommand({
      broadcastId: 'b-1', reason: 'x',
    } as never, 'a'));
    expect(svc.cancel).toHaveBeenCalled();
  });
  it('TestBroadcastHandler', async () => {
    await new TestBroadcastHandler(svc).execute(new TestBroadcastCommand({
      broadcastId: 'b-1', recipientIds: ['u1'],
    } as never, 'a'));
    expect(svc.test).toHaveBeenCalled();
  });
});
