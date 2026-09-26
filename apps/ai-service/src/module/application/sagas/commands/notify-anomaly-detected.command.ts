import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyAnomalyDetectedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-anomaly-detected';
  constructor(public readonly insightId: string) { super(); }
}
