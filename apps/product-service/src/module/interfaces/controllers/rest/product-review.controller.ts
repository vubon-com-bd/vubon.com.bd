import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { SubmitReviewCommand } from '../../../application/commands/review/submit-review.command';
import { DeleteReviewCommand } from '../../../application/commands/review/delete-review.command';
import { ApproveReviewCommand } from '../../../application/commands/review/approve-review.command';
import { RejectReviewCommand } from '../../../application/commands/review/reject-review.command';
import { ListReviewsQuery } from '../../../application/queries/review/list-reviews.query';
import { GetReviewStatsQuery } from '../../../application/queries/review/get-review-stats.query';
import { ReviewSwagger } from '../../swagger/review.swagger';

@ApiTags('Product Reviews')
@Controller('products/:productId/reviews')
@UseGuards(JwtAuthGuard)
export class ProductReviewController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ReviewSwagger.List()
  async list(@Param('productId') productId: string): Promise<unknown> {
    return this.queryBus.execute(new ListReviewsQuery(productId));
  }

  @Get('stats')
  async stats(@Param('productId') productId: string): Promise<unknown> {
    return this.queryBus.execute(new GetReviewStatsQuery(productId));
  }

  @Post()
  @ReviewSwagger.Submit()
  async submit(
    @Param('productId') productId: string,
    @Body() body: { rating: number; content: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitReviewCommand(productId, user.userId, body.rating, body.content),
    );
  }

  @Patch(':id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  async approve(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ApproveReviewCommand(id));
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reject(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<void> {
    return this.commandBus.execute(new RejectReviewCommand(id, body.reason));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteReviewCommand(id));
  }
}
