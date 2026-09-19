import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUserActivitiesQuery extends BaseQuery {
  readonly type = 'user.list-activities';

  constructor(
    public readonly userId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
