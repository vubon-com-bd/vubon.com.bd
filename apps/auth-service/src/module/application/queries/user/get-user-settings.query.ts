import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserSettingsQuery extends BaseQuery {
  readonly type = 'user.get-settings';

  constructor(public readonly userId: string) {
    super();
  }
}
