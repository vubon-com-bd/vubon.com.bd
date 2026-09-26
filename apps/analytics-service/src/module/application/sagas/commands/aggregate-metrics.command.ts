import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class AggregateMetricsCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.aggregate-metrics';

  constructor(public readonly eventId: string) {
    super();
  }
}
