import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class InitializeStatsPeriodCommand extends BaseCommand {
  readonly type = 'vendor.stats.initialize';
  constructor(
    public readonly vendorId: string,
    public readonly periodStart: string,
    public readonly periodEnd: string,
    public readonly currency: string,
    public readonly actorId?: string,
  ) { super(); }
}
