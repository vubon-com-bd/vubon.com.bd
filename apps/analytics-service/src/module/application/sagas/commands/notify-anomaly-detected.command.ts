import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyAnomalyDetectedCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.notify-anomaly';
  constructor(
    public readonly metricName: string,
    public readonly anomalyCount: number,
    public readonly sagaId?: string
  ) { super(); }
}
