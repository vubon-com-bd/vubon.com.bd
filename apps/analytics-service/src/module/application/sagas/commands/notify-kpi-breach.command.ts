import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyKpiBreachCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.notify-kpi-breach';

  constructor(
    public readonly kpiId: string,
    public readonly name: string,
    public readonly actual: number,
    public readonly target: number,
  ) {
    super();
  }
}
