import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListKycDocumentsQuery extends BaseQuery {
  readonly type = 'user.kyc.list-documents';

  constructor(public readonly userId: string) {
    super();
  }
}
