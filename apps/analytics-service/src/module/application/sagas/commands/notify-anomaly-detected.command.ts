import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyAnomalyDetectedCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.notify-anomaly';

  constructor(
    public readonly metricId: string,
    public readonly value: number,
  ) {
    super();
  }
}
