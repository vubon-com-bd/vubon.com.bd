import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetPackagingQuery extends BaseQuery {
  readonly type = 'logistics.packaging.get';
  constructor(public readonly packagingId: string) { super(); }
}
