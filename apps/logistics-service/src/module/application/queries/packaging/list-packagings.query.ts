import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PackagingListOptionsDTO } from '../../services/interfaces/packaging.service.interface.js';
export class ListPackagingsQuery extends BaseQuery {
  readonly type = 'logistics.packaging.list';
  constructor(public readonly options: PackagingListOptionsDTO) { super(); }
}
