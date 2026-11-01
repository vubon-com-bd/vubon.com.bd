import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListUsablePackagingsQuery extends BaseQuery {
  readonly type = 'logistics.packaging.list_usable';
  constructor() { super(); }
}
