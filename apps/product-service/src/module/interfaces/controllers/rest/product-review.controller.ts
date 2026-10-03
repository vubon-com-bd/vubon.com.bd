/**
 * ProductReviewController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { SubmitReviewCommand } from '../../../application/commands/review/submit-review.command.js';
import { UpdateReviewCommand } from '../../../application/commands/review/update-review.command.js';
import { ApproveReviewCommand } from '../../../application/commands/review/approve-review.command.js';
import { RejectReviewCommand } from '../../../application/commands/review/reject-review.command.js';
import { DeleteReviewCommand } from '../../../application/commands/review/delete-review.command.js';
import { ListReviewsByProductQuery } from '../../../application/queries/review/list-reviews-by-product.query.js';
import { GetReviewStatsQuery } from '../../../application/queries/review/get-review-stats.query.js';

import { SubmitReviewRequestDTO, UpdateReviewRequestDTO } from '../../dtos/requests/review.request.dto.js';
import { ReviewResponseDTO, ReviewStatsResponseDTO } from '../../dtos/responses/review.response.dto.js';

@ApiTags('reviews')
@ApiBearerAuth('bearer')
@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductReviewController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Submit a review' })
  @HttpCode(HttpStatus.CREATED)
  async submit(
    @Body() dto: SubmitReviewRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewResponseDTO> {
    return this.commandBus.execute(
      new SubmitReviewCommand({ ...dto, userId: user.userId } as never),
    );
  }

  @Get('product/:productId')
  @Public()
  @ApiOperation({ summary: 'List reviews for a product' })
  async listByProduct(
    @Param('productId') productId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<{ items: readonly ReviewResponseDTO[]; total: number }> {
    return this.queryBus.execute(new ListReviewsByProductQuery(productId, Number(page), Number(limit)));
  }

  @Get('product/:productId/stats')
  @Public()
  @ApiOperation({ summary: 'Get review stats for a product' })
  async stats(@Param('productId') productId: string): Promise<ReviewStatsResponseDTO | null> {
    return this.queryBus.execute(new GetReviewStatsQuery(productId));
  }

  @Patch(':reviewId')
  @ApiOperation({ summary: 'Update own review' })
  async update(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewResponseDTO> {
    return this.commandBus.execute(
      new UpdateReviewCommand({ ...dto, reviewId, updatedBy: user.userId } as never),
    );
  }

  @Post(':reviewId/approve')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Approve a review' })
  async approve(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewResponseDTO> {
    return this.commandBus.execute(new ApproveReviewCommand(reviewId, user.userId));
  }

  @Post(':reviewId/reject')
  @Roles('admin', 'moderator')
  @ApiOperation({ summary: 'Reject a review' })
  async reject(
    @Param('reviewId') reviewId: string,
    @Body() body: { reason: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ReviewResponseDTO> {
    return this.commandBus.execute(new RejectReviewCommand(reviewId, body.reason, user.userId));
  }

  @Delete(':reviewId')
  @ApiOperation({ summary: 'Delete own review' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('reviewId') reviewId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteReviewCommand(reviewId, user.userId));
  }
}
