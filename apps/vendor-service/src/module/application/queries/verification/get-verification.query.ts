import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVerificationQuery extends BaseQuery {
  readonly type = 'vendor.verification.get';
  constructor(public readonly verificationId: string) {
    super();
  }
}
