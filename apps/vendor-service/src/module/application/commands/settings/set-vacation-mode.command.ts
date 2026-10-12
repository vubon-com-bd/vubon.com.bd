import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SetVacationModeCommand extends BaseCommand {
  readonly type = 'vendor.settings.set_vacation';
  constructor(
    public readonly vendorId: string,
    public readonly enabled: boolean,
    public readonly message?: string,
    public readonly actorId?: string,
  ) { super(); }
}
