import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateSearchIndexCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.update-search-index';

  constructor(
    public readonly entityType: string,
    public readonly entityId: string,
  ) {
    super();
  }
}
