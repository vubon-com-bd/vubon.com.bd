import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetPreferencesQuery extends BaseQuery {
  readonly type = 'user.get-preferences';
  readonly queryType = 'user.get-preferences';
  constructor(public readonly userId: string) { super(); }
}
