/**
 * GetDefaultAddressQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDefaultAddressQuery extends BaseQuery {
  readonly type = 'address.getDefault';

  constructor(public readonly userId: string) {
    super();
  }
}
