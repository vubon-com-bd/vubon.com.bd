import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListActivitiesQuery extends BaseQuery {
  readonly type = 'user.list-activities';
  readonly queryType = 'user.list-activities';
  constructor(public readonly userId: string, public readonly limit = 20) { super(); }
}
