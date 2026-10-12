/**
 * VendorReviewController — customer reviews
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';

import { SubmitVendorReviewCommand } from '../../../application/commands/rating/submit-vendor-review.command.js';
import { ApproveVendorReviewCommand } from '../../../application/commands/rating/approve-vendor-review.command.js';

import { GetVendorReviewQuery } from '../../../application/queries/review/get-vendor-review.query.js';
import { ListVendorReviewsQuery } from '../../../application/queries/review/list-vendor-reviews.query.js';
import { ListPublicVendorReviewsQuery } from '../../../application/queries/review/list-public-vendor-reviews.query.js';

interface SubmitReviewBody {
  readonly orderId: string;
  readonly rating: number;
  readonly comment?: string;
  readonly isVerifiedPurchase?: boolean;
  readonly idempotencyKey?: string;
}

interface RejectReviewBody {
  readonly reason: string;
}

interface FlagReviewBody {
  readonly reason: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_REVIEW)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/reviews')
export class VendorReviewController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Submit review ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a review' })
  async submit(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: SubmitReviewBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitVendorReviewCommand({
        vendorId,
        userId: user.userId,
        orderId: body.orderId,
        rating: body.rating,
        comment: body.comment,
        isVerifiedPurchase: body.isVerifiedPurchase ?? false,
      }, user.userId),
    );
  }

  // ─── Read ───
  @Get()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all reviews (admin)' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListVendorReviewsQuery(vendorId));
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: 'List public reviews (public)' })
  async listPublic(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListPublicVendorReviewsQuery(vendorId));
  }

  @Get(':reviewId')
  @Public()
  @ApiOperation({ summary: 'Get a review' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reviewId', ParseUuidPipe) reviewId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorReviewQuery(reviewId));
  }

  // ─── Moderation (admin) ───
  @Post(':reviewId/approve')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Approve a review (admin)' })
  async approve(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reviewId', ParseUuidPipe) reviewId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new ApproveVendorReviewCommand(reviewId, user.userId));
  }

  @Post(':reviewId/reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject a review (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reviewId', ParseUuidPipe) _reviewId: string,
    @Body() _body: RejectReviewBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }

  @Post(':reviewId/flag')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Flag a review' })
  async flag(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reviewId', ParseUuidPipe) _reviewId: string,
    @Body() _body: FlagReviewBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }
}
