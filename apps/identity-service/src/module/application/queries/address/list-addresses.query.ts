/**
 * List Addresses Query
 * @module identity-service/application/queries/address
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAddressesQuery extends BaseQuery {
  readonly type = 'user.list-addresses';
  readonly queryType = 'user.list-addresses';
  constructor(public readonly userId: string) { super(); }
}
