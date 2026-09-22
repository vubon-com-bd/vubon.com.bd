import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { SubmitReviewCommand } from '../../../application/commands/review';
import { RespondReviewCommand } from '../../../application/commands/review';
import { ListReviewsQuery } from '../../../application/queries/review';
import { GetReviewStatsQuery } from '../../../application/queries/review';

interface SubmitReviewBody {
  vendorId: string;
  orderId: string;
  rating: number;
  content?: string;
}

interface RespondReviewBody {
  reviewId: string;
  response: string;
}

@ApiTags('Vendor Reviews')
@ApiBearerAuth()
@Controller('vendors/reviews')
@UseGuards(JwtAuthGuard)
export class VendorReviewController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new ListReviewsQuery(vendorId));
  }

  @Get(':vendorId/stats')
  async stats(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetReviewStatsQuery(vendorId));
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  async submit(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SubmitReviewBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitReviewCommand(
        body.vendorId,
        user.userId,
        body.orderId,
        body.rating,
        body.content,
      ),
    );
  }

  @Post('respond')
  @HttpCode(HttpStatus.OK)
  async respond(@Body() body: RespondReviewBody): Promise<void> {
    return this.commandBus.execute(
      new RespondReviewCommand(body.reviewId, body.response),
    );
  }
}
