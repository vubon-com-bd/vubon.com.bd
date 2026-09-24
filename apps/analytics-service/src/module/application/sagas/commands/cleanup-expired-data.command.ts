import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class CleanupExpiredDataCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.cleanup-expired';

  constructor(public readonly retentionDays: number) {
    super();
  }
}
