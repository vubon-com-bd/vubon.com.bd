/**
 * ListAddressesQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListAddressesQuery extends BaseQuery {
  readonly type = 'address.list';

  constructor(public readonly userId: string) {
    super();
  }
}
