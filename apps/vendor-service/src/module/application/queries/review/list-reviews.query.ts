import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ReviewListOptionsDTO } from '../../services/interfaces/vendor-review.service.interface.js';

export class ListReviewsQuery extends BaseQuery {
  readonly type = 'vendor.review.list';
  constructor(
    public readonly vendorId: string,
    public readonly options?: ReviewListOptionsDTO,
  ) {
    super();
  }
}
