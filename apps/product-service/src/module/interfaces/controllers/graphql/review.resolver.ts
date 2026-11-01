/**
 * ReviewResolver — GraphQL endpoints
 * @module product-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../../application/services/interfaces/product-review.service.interface.js';

@Resolver('ProductReview')
@UseGuards(JwtAuthGuard)
export class ReviewResolver {
  private readonly logger = new Logger(ReviewResolver.name);

  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly reviewService: IProductReviewService,
  ) {}

  @Query('review')
  async getReview(@Args('id') id: string): Promise<unknown> {
    return this.reviewService.getById(id);
  }

  @Query('productReviews')
  async listByProduct(@Args('productId') productId: string): Promise<unknown> {
    return this.reviewService.listByProduct(productId);
  }

  @Query('reviewStats')
  async getStats(@Args('productId') productId: string): Promise<unknown> {
    return this.reviewService.getStats(productId);
  }

  @Query('reviews')
  async list(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    return this.reviewService.list({
      page: page ?? 1,
      limit: limit ?? 20,
    });
  }
}
