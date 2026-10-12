import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SetAutoPayoutCommand extends BaseCommand {
  readonly type = 'vendor.settings.set_auto_payout';
  constructor(
    public readonly vendorId: string,
    public readonly enabled: boolean,
    public readonly actorId?: string,
  ) { super(); }
}
