import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PackagingListOptionsDTO } from '@application/services/interfaces/packaging.service.interface';
export class ListPackagingsQuery extends BaseQuery {
  readonly type = 'logistics.packaging.list';
  constructor(public readonly options: PackagingListOptionsDTO) { super(); }
}
