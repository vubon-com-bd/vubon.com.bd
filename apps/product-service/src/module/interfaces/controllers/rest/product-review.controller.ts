/**
 * ProductReviewController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../../application/services/interfaces/product-review.service.interface.js';

import {
  SubmitReviewHttpDTO,
  UpdateReviewHttpDTO,
  ListReviewsHttpQueryDTO,
  RejectReviewHttpDTO,
} from '../../dtos/requests/review.request.dto.js';

import type {
  ReviewHttpResponseDTO,
  ReviewListHttpResponseDTO,
  ReviewStatsHttpResponseDTO,
} from '../../dtos/responses/review.response.dto.js';

import { ReviewControllerMapper } from '../../mappers/review.controller.mapper.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiReviewTag,
  ApiSubmitReview,
  ApiUpdateReview,
  ApiApproveReview,
  ApiRejectReview,
  ApiListReviews,
  ApiGetReviewStats,
} from '../../swagger/review.swagger.js';

@ApiReviewTag()
@ApiBearerAuth('bearer')
@Controller('product-reviews')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductReviewController extends BaseController {
  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly reviewService: IProductReviewService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiSubmitReview()
  async submit(
    @Body() dto: SubmitReviewHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewHttpResponseDTO> {
    const appDto = ReviewControllerMapper.toSubmitAppDto(dto, user.userId);
    const result = await this.reviewService.submit(appDto);
    return ReviewControllerMapper.toHttpResponse(result);
  }

  @Patch(':id')
  @ApiUpdateReview()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewHttpDTO,
  ): Promise<ReviewHttpResponseDTO> {
    const patch = ReviewControllerMapper.toUpdatePatch(dto);
    const result = await this.reviewService.update({ reviewId: id, ...patch });
    return ReviewControllerMapper.toHttpResponse(result);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiApproveReview()
  async approve(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewHttpResponseDTO> {
    const result = await this.reviewService.approve({ reviewId: id, approvedBy: user.userId });
    return ReviewControllerMapper.toHttpResponse(result);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiRejectReview()
  async reject(
    @Param('id') id: string,
    @Body() dto: RejectReviewHttpDTO,
  ): Promise<ReviewHttpResponseDTO> {
    const result = await this.reviewService.reject({ reviewId: id, reason: dto.reason });
    return ReviewControllerMapper.toHttpResponse(result);
  }

  @Post(':id/helpful')
  @HttpCode(HttpStatus.OK)
  async markHelpful(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewHttpResponseDTO> {
    const result = await this.reviewService.markHelpful(id, user.userId);
    return ReviewControllerMapper.toHttpResponse(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiRejectReview()
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ readonly success: true; readonly reviewId: string }> {
    return this.reviewService.delete({ reviewId: id, actorId: user.userId });
  }

  @Get('stats/:productId')
  @ApiGetReviewStats()
  async stats(@Param('productId') productId: string): Promise<ReviewStatsHttpResponseDTO> {
    const result = await this.reviewService.getStats(productId);
    return ReviewControllerMapper.toStatsHttp(result);
  }

  @Get()
  @ApiListReviews()
  async list(@Query() q: ListReviewsHttpQueryDTO): Promise<ReviewListHttpResponseDTO> {
    const options = ReviewControllerMapper.toListOptions(q);
    const result = await this.reviewService.list(options);
    return ReviewControllerMapper.toListHttp(result);
  }

  @Get(':id')
  @ApiUpdateReview()
  async getById(@Param('id') id: string): Promise<ReviewHttpResponseDTO> {
    const result = await this.reviewService.getById(id);
    return ReviewControllerMapper.toHttpResponse(result);
  }
}
