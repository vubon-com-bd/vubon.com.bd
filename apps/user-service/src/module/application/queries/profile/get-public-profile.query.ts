import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPublicProfileQuery extends BaseQuery {
  readonly type = 'user.profile.get-public';

  constructor(public readonly userId: string) {
    super();
  }
}
