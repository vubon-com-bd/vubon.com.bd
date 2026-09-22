import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReviewStatsQuery } from './get-review-stats.query';
import type { VendorReviewRepository } from '../../../domain/repositories/vendor-review.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface ReviewStatsDto {
  readonly vendorId: string;
  readonly total: number;
  readonly averageRating: number;
  readonly distribution: Record<number, number>;
}

@QueryHandler(GetReviewStatsQuery)
export class GetReviewStatsHandler
  extends BaseQueryHandler<GetReviewStatsQuery, ReviewStatsDto>
  implements IQueryHandler<GetReviewStatsQuery>
{
  readonly queryType = 'vendor.review.stats';

  constructor(private readonly reviewRepo: VendorReviewRepository) {
    super();
  }

  async execute(query: GetReviewStatsQuery): Promise<ReviewStatsDto> {
    const items = await this.reviewRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    const total = items.length;
    const avg = total === 0 ? 0 : items.reduce((s, r) => s + r.rating.value, 0) / total;

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of items) {
      const star = Math.round(r.rating.value);
      if (star >= 1 && star <= 5) distribution[star] += 1;
    }

    return {
      vendorId: query.vendorId,
      total,
      averageRating: Math.round(avg * 100) / 100,
      distribution,
    };
  }
}
