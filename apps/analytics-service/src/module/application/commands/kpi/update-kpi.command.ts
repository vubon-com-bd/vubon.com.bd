import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.update';

  constructor(
    public readonly kpiId: string,
    public readonly name?: string,
    public readonly target?: number,
    public readonly threshold?: number,
    public readonly metricName?: string,
  ) {
    super();
  }
}
