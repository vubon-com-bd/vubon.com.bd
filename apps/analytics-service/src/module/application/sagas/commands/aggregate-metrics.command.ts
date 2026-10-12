import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class AggregateMetricsCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.aggregate-metrics';
  constructor(
    public readonly seriesKeys: readonly string[],
    public readonly sagaId?: string
  ) { super(); }
}
