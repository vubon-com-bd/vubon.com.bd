import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateScheduleHandler } from '../../../../src/module/application/commands/schedule/create-schedule.handler.js';
import { CreateScheduleCommand } from '../../../../src/module/application/commands/schedule/create-schedule.command.js';
import { UpdateScheduleHandler } from '../../../../src/module/application/commands/schedule/update-schedule.handler.js';
import { UpdateScheduleCommand } from '../../../../src/module/application/commands/schedule/update-schedule.command.js';
import { ActivateScheduleHandler } from '../../../../src/module/application/commands/schedule/activate-schedule.handler.js';
import { ActivateScheduleCommand } from '../../../../src/module/application/commands/schedule/activate-schedule.command.js';
import { PauseScheduleHandler } from '../../../../src/module/application/commands/schedule/pause-schedule.handler.js';
import { PauseScheduleCommand } from '../../../../src/module/application/commands/schedule/pause-schedule.command.js';
import { ResumeScheduleHandler } from '../../../../src/module/application/commands/schedule/resume-schedule.handler.js';
import { ResumeScheduleCommand } from '../../../../src/module/application/commands/schedule/resume-schedule.command.js';
import { CancelScheduleHandler } from '../../../../src/module/application/commands/schedule/cancel-schedule.handler.js';
import { CancelScheduleCommand } from '../../../../src/module/application/commands/schedule/cancel-schedule.command.js';
import { TriggerScheduleHandler } from '../../../../src/module/application/commands/schedule/trigger-schedule.handler.js';
import { TriggerScheduleCommand } from '../../../../src/module/application/commands/schedule/trigger-schedule.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 's-1' });
  return {
    create: r, update: r, activate: r, pause: r, resume: r, cancel: r,
    trigger: jest.fn().mockResolvedValue({ scheduleId: 's-1' }),
  } as never;
}

describe('Schedule command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('CreateScheduleHandler', async () => {
    await new CreateScheduleHandler(svc).execute(new CreateScheduleCommand({
      type: 'scheduled', recurrence: 'none',
      scheduledAt: new Date().toISOString(), timezone: 'Asia/Dhaka',
    } as never, 'a'));
    expect(svc.create).toHaveBeenCalled();
  });
  it('UpdateScheduleHandler', async () => {
    await new UpdateScheduleHandler(svc).execute(new UpdateScheduleCommand({ scheduleId: 's-1' } as never, 'a'));
    expect(svc.update).toHaveBeenCalled();
  });
  it('ActivateScheduleHandler', async () => {
    await new ActivateScheduleHandler(svc).execute(new ActivateScheduleCommand('s-1', 'a'));
    expect(svc.activate).toHaveBeenCalled();
  });
  it('PauseScheduleHandler', async () => {
    await new PauseScheduleHandler(svc).execute(new PauseScheduleCommand({ scheduleId: 's-1', reason: 'x' } as never, 'a'));
    expect(svc.pause).toHaveBeenCalled();
  });
  it('ResumeScheduleHandler', async () => {
    await new ResumeScheduleHandler(svc).execute(new ResumeScheduleCommand({ scheduleId: 's-1' } as never, 'a'));
    expect(svc.resume).toHaveBeenCalled();
  });
  it('CancelScheduleHandler', async () => {
    await new CancelScheduleHandler(svc).execute(new CancelScheduleCommand({ scheduleId: 's-1' } as never, 'a'));
    expect(svc.cancel).toHaveBeenCalled();
  });
  it('TriggerScheduleHandler', async () => {
    await new TriggerScheduleHandler(svc).execute(new TriggerScheduleCommand({ scheduleId: 's-1' } as never, 'a'));
    expect(svc.trigger).toHaveBeenCalled();
  });
});
