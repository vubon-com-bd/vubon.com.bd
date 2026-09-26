import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDocumentsQuery extends BaseQuery {
  readonly type = 'vendor.verification.list-documents';

  constructor(public readonly vendorId: string) {
    super();
  }
}
