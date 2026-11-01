import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ReviewListOptionsDTO } from '../../services/interfaces/product-review.service.interface.js';

export class ListReviewsQuery extends BaseQuery {
  readonly type = 'product.review.list';
  constructor(public readonly options: ReviewListOptionsDTO) {
    super();
  }
}
