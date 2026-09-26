import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTransactionQuery extends BaseQuery {
  readonly type = 'transaction.get';
  constructor(public readonly transactionId: string) { super(); }
}
