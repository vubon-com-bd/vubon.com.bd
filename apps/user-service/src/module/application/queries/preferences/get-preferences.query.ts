import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPreferencesQuery extends BaseQuery {
  readonly type = 'user.preferences.get';

  constructor(public readonly userId: string) {
    super();
  }
}
