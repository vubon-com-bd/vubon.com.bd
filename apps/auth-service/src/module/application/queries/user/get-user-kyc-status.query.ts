import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserKycStatusQuery extends BaseQuery {
  readonly type = 'user.get-kyc-status';

  constructor(public readonly userId: string) {
    super();
  }
}
