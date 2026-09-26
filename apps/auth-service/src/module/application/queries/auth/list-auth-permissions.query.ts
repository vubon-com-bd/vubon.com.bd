import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAuthPermissionsQuery extends BaseQuery {
  readonly type = 'auth.list-permissions';
  constructor(public readonly resource?: string) { super(); }
}
