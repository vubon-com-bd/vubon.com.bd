import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListBankAccountsQuery extends BaseQuery {
  readonly type = 'vendor.bank_account.list';
  constructor(public readonly vendorId: string) {
    super();
  }
}
