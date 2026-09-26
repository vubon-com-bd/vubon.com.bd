import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.create';

  constructor(
    public readonly name: string,
    public readonly metricName: string,
    public readonly target: number,
    public readonly threshold: number,
    public readonly ownerId: string,
  ) {
    super();
  }
}
