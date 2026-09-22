import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReviewStatsQuery } from './get-review-stats.query';
import type { ProductReviewServiceInterface } from '../../services/interfaces/product-review.service.interface';

@QueryHandler(GetReviewStatsQuery)
export class GetReviewStatsHandler
  extends BaseQueryHandler<GetReviewStatsQuery, { average: number; count: number }>
  implements IQueryHandler<GetReviewStatsQuery>
{
  readonly queryType = 'product.review.stats';

  constructor(private readonly reviewService: ProductReviewServiceInterface) {
    super();
  }

  async execute(query: GetReviewStatsQuery): Promise<{ average: number; count: number }> {
    return this.reviewService.getStats(query.productId);
  }
}
