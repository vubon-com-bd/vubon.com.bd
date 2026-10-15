import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class ClearCacheCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.clear_cache';

  constructor(
    public readonly cacheKeys: readonly string[],
    public readonly sagaId?: string,
  ) {
    super();
  }
}
