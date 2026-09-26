import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetProfileQuery extends BaseQuery {
  readonly type = 'user.profile.get';

  constructor(public readonly userId: string) {
    super();
  }
}
