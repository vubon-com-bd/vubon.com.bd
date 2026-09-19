import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserProfileQuery extends BaseQuery {
  readonly type = 'user.get-profile';

  constructor(public readonly userId: string) {
    super();
  }
}
