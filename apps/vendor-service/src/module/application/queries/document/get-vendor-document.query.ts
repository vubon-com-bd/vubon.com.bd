import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorDocumentQuery extends BaseQuery {
  readonly type = 'vendor.document.get';
  constructor(public readonly documentId: string) { super(); }
}
