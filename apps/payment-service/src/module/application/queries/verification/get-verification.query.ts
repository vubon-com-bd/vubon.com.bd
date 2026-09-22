import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVerificationQuery extends BaseQuery {
  readonly type = 'verification.get';
  constructor(public readonly paymentId: string) { super(); }
}
