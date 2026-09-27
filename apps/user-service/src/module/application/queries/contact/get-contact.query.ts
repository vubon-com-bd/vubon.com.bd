/**
 * GetContactQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetContactQuery extends BaseQuery {
  readonly type = 'contact.get';

  constructor(
    public readonly userId: string,
    public readonly contactId: string
  ) {
    super();
  }
}
