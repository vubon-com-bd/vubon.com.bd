import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class CleanupExpiredDataCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.cleanup-expired-data';
  constructor(
    public readonly cutoff: string,
    public readonly sagaId?: string
  ) { super(); }
}
