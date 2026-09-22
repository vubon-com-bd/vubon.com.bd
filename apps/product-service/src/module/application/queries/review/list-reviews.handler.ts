import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListReviewsQuery } from './list-reviews.query';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@QueryHandler(ListReviewsQuery)
export class ListReviewsHandler
  extends BaseQueryHandler<ListReviewsQuery, readonly ReviewResponseDTO[]>
  implements IQueryHandler<ListReviewsQuery>
{
  readonly queryType = 'product.review.list';

  constructor(private readonly reviewService: ProductReviewServiceInterface) {
    super();
  }

  async execute(query: ListReviewsQuery): Promise<readonly ReviewResponseDTO[]> {
    return this.reviewService.listByProduct(query.productId);
  }
}
