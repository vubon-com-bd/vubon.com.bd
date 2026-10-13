/**
 * UpdateSearchIndexCommand — saga command
 * @module product-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateSearchIndexCommand extends BaseSagaCommand {
  readonly type = 'product.saga.update_search_index';

  constructor(
    public readonly productId: string,
    public readonly action: 'index' | 'reindex' | 'delete',
    public readonly document?: Readonly<Record<string, unknown>>,
    sagaId?: string,
  ) {
    super();
    if (sagaId) (this as { sagaId?: string }).sagaId = sagaId;
  }
}
