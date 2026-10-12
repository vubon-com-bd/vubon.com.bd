import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateCacheCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.update-cache';
  constructor(
    public readonly cacheKeys: readonly string[],
    public readonly sagaId?: string
  ) { super(); }
}
