/**
 * ListContactsQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListContactsQuery extends BaseQuery {
  readonly type = 'contact.list';

  constructor(public readonly userId: string) {
    super();
  }
}
