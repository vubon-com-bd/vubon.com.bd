import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateWarrantyPeriodCommand extends BaseCommand {
  readonly type = 'vendor.warranty.update_period';
  constructor(
    public readonly vendorId: string,
    public readonly days: number,
    public readonly actorId?: string,
  ) { super(); }
}
