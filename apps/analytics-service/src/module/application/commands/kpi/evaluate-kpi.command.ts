import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EvaluateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.evaluate';

  constructor(
    public readonly kpiId: string,
    public readonly actual: number,
    public readonly evaluatedAt?: string,
  ) {
    super();
  }
}
