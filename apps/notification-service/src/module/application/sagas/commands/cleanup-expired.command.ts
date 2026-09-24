import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class CleanupExpiredSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.cleanup-expired';

  constructor(public readonly olderThanMs: number) {
    super();
  }
}
