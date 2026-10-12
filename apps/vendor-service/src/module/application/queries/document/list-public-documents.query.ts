import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListPublicDocumentsQuery extends BaseQuery {
  readonly type = 'vendor.document.list_public';
  constructor(public readonly vendorId: string) { super(); }
}
