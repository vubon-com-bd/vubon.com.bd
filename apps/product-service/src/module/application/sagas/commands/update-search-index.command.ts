import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateSearchIndexCommand extends BaseSagaCommand {
  readonly type = 'saga.product.update-search-index';

  constructor(public readonly productId: string) {
    super();
  }
}
