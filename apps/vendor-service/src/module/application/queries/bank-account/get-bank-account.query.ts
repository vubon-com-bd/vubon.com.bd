import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetBankAccountQuery extends BaseQuery {
  readonly type = 'vendor.bank_account.get';
  constructor(public readonly bankAccountId: string) {
    super();
  }
}
