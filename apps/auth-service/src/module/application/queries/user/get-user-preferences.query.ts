import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserPreferencesQuery extends BaseQuery {
  readonly type = 'user.get-preferences';

  constructor(public readonly userId: string) {
    super();
  }
}
