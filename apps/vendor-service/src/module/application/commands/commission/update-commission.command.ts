import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.update';

  constructor(
    public readonly vendorId: string,
    public readonly rate: number,
    public readonly commissionType: string,
  ) {
    super();
  }
}
