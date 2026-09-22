import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListActivitiesQuery extends BaseQuery {
  readonly type = 'user.activity.list';

  constructor(
    public readonly userId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
