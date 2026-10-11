import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdatePreferenceHandler } from '../../../../src/module/application/commands/preference/update-preference.handler.js';
import { UpdatePreferenceCommand } from '../../../../src/module/application/commands/preference/update-preference.command.js';
import { ToggleChannelHandler } from '../../../../src/module/application/commands/preference/toggle-channel.handler.js';
import { ToggleChannelCommand } from '../../../../src/module/application/commands/preference/toggle-channel.command.js';
import { ToggleCategoryHandler } from '../../../../src/module/application/commands/preference/toggle-category.handler.js';
import { ToggleCategoryCommand } from '../../../../src/module/application/commands/preference/toggle-category.command.js';
import { UpdateQuietHoursHandler } from '../../../../src/module/application/commands/preference/update-quiet-hours.handler.js';
import { UpdateQuietHoursCommand } from '../../../../src/module/application/commands/preference/update-quiet-hours.command.js';
import { OptOutHandler } from '../../../../src/module/application/commands/preference/opt-out.handler.js';
import { OptOutCommand } from '../../../../src/module/application/commands/preference/opt-out.command.js';
import { OptInHandler } from '../../../../src/module/application/commands/preference/opt-in.handler.js';
import { OptInCommand } from '../../../../src/module/application/commands/preference/opt-in.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ userId: 'u' });
  return {
    update: r, toggleChannel: r, toggleCategory: r,
    updateQuietHours: r, optOut: r, optIn: r,
  } as never;
}

describe('Preference command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('UpdatePreferenceHandler', async () => {
    await new UpdatePreferenceHandler(svc).execute(new UpdatePreferenceCommand({ userId: 'u' } as never));
    expect(svc.update).toHaveBeenCalled();
  });
  it('ToggleChannelHandler', async () => {
    await new ToggleChannelHandler(svc).execute(new ToggleChannelCommand({ userId: 'u', channel: 'email', enabled: false } as never));
    expect(svc.toggleChannel).toHaveBeenCalled();
  });
  it('ToggleCategoryHandler', async () => {
    await new ToggleCategoryHandler(svc).execute(new ToggleCategoryCommand({ userId: 'u', category: 'marketing', enabled: false } as never));
    expect(svc.toggleCategory).toHaveBeenCalled();
  });
  it('UpdateQuietHoursHandler', async () => {
    await new UpdateQuietHoursHandler(svc).execute(new UpdateQuietHoursCommand({ userId: 'u', enabled: true, startHour: 22, endHour: 8 } as never));
    expect(svc.updateQuietHours).toHaveBeenCalled();
  });
  it('OptOutHandler', async () => {
    await new OptOutHandler(svc).execute(new OptOutCommand({ userId: 'u', scope: 'email' } as never));
    expect(svc.optOut).toHaveBeenCalled();
  });
  it('OptInHandler', async () => {
    await new OptInHandler(svc).execute(new OptInCommand({ userId: 'u', scope: 'email' } as never));
    expect(svc.optIn).toHaveBeenCalled();
  });
});
