import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SetAutoAcceptOrdersCommand extends BaseCommand {
  readonly type = 'vendor.settings.set_auto_accept';
  constructor(
    public readonly vendorId: string,
    public readonly enabled: boolean,
    public readonly actorId?: string,
  ) { super(); }
}
