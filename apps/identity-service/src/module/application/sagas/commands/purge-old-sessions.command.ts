import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class PurgeOldSessionsCommand extends BaseSagaCommand {
  readonly type = 'saga.purge-old-sessions';
  constructor(
    public readonly olderThanDays: number,
  ) {
    super();
  }
}
