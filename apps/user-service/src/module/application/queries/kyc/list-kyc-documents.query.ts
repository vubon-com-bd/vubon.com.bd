/**
 * ListKycDocumentsQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListKycDocumentsQuery extends BaseQuery {
  readonly type = 'kyc.listDocuments';

  constructor(public readonly userId: string) {
    super();
  }
}
