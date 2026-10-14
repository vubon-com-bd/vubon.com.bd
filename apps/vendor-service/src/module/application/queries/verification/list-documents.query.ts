import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListDocumentsQuery extends BaseQuery {
  readonly type = 'vendor.document.list';
  constructor(public readonly vendorId: string) {
    super();
  }
}
