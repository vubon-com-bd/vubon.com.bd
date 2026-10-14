import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListSuspensionsQuery extends BaseQuery {
  readonly type = 'vendor.suspension.list';
  constructor(public readonly vendorId: string) {
    super();
  }
}
