import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateSearchIndexCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.update_search_index';

  constructor(
    public readonly vendorId: string,
    public readonly action: 'index' | 'reindex' | 'delete',
    public readonly sagaId?: string,
  ) {
    super();
  }
}
