import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { SavedListOptionsDTO } from '../../services/interfaces/saved-for-later.service.interface.js';

export class ListSavedQuery extends BaseQuery {
  readonly type = 'cart.saved.list';

  constructor(public readonly options: SavedListOptionsDTO) {
    super();
  }
}
