import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVerificationQuery extends BaseQuery {
  readonly type = 'vendor.verification.get';

  constructor(public readonly vendorId: string) {
    super();
  }
}
