/**
 * GetKycStatusQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetKycStatusQuery extends BaseQuery {
  readonly type = 'kyc.getStatus';

  constructor(public readonly userId: string) {
    super();
  }
}
