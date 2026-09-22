import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateSearchIndexCommand extends BaseSagaCommand {
  readonly type = 'saga.update-search-index';

  constructor(public readonly vendorId: string) {
    super();
  }
}
