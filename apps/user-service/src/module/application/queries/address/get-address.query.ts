/**
 * GetAddressQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetAddressQuery extends BaseQuery {
  readonly type = 'address.get';

  constructor(
    public readonly userId: string,
    public readonly addressId: string
  ) {
    super();
  }
}
