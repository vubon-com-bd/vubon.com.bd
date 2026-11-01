import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetPackagingByCodeQuery extends BaseQuery {
  readonly type = 'logistics.packaging.by_code';
  constructor(public readonly code: string) { super(); }
}
