import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListReviewsQuery } from './list-reviews.query';
import type { VendorReviewRepository } from '../../../domain/repositories/vendor-review.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { ReviewResponseDto } from '../../dtos/responses/review-response.dto';

@QueryHandler(ListReviewsQuery)
export class ListReviewsHandler
  extends BaseQueryHandler<ListReviewsQuery, readonly ReviewResponseDto[]>
  implements IQueryHandler<ListReviewsQuery>
{
  readonly queryType = 'vendor.review.list';

  constructor(private readonly reviewRepo: VendorReviewRepository) {
    super();
  }

  async execute(query: ListReviewsQuery): Promise<readonly ReviewResponseDto[]> {
    void query.limit;
    const items = await this.reviewRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return items.map((r) => ({
      id: r.id.value,
      vendorId: r.vendorId.value,
      userId: r.userId.value,
      orderId: r.orderId.value,
      rating: r.rating.value,
      content: r.content?.value ?? null,
      status: r.status.value,
      createdAt: r.createdAt,
    }));
  }
}
