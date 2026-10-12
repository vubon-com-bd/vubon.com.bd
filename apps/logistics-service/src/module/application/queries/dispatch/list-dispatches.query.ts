import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DispatchListOptionsDTO } from '../../services/interfaces/dispatch.service.interface.js';
export class ListDispatchesQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list';
  constructor(public readonly options: DispatchListOptionsDTO) { super(); }
}
