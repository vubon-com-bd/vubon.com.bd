import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RecordOrderStatsCommand extends BaseCommand {
  readonly type = 'vendor.stats.record_order';
  constructor(
    public readonly vendorId: string,
    public readonly amount: number,
    public readonly actorId?: string,
  ) { super(); }
}
