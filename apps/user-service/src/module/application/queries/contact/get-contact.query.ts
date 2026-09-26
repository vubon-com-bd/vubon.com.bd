import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetContactQuery extends BaseQuery {
  readonly type = 'user.contact.get';

  constructor(public readonly contactId: string) {
    super();
  }
}
