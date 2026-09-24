import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateCacheCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.update-cache';

  constructor(
    public readonly cacheType: string,
    public readonly entityId: string,
  ) {
    super();
  }
}
