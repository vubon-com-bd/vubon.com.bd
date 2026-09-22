import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserByEmailQuery extends BaseQuery {
  readonly type = 'user.get-by-email';

  constructor(public readonly email: string) {
    super();
  }
}
