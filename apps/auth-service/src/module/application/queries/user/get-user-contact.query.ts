import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserContactQuery extends BaseQuery {
  readonly type = 'user.get-contact';

  constructor(public readonly userId: string) {
    super();
  }
}
