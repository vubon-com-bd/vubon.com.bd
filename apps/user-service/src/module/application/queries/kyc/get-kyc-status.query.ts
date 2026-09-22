import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetKycStatusQuery extends BaseQuery {
  readonly type = 'user.kyc.get-status';

  constructor(public readonly userId: string) {
    super();
  }
}
