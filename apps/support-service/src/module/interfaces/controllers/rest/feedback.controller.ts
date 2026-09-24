import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { SubmitFeedbackCommand } from '../../../application/commands/feedback/submit-feedback.command';
import { ReviewFeedbackCommand } from '../../../application/commands/feedback/review-feedback.command';
import { GetFeedbackQuery } from '../../../application/queries/feedback/get-feedback.query';
import { ListFeedbackByUserQuery } from '../../../application/queries/feedback/list-feedback-by-user.query';
import { SubmitFeedbackRequestDto } from '../../dtos/requests/feedback.request.dto';
import { FeedbackSwagger } from '../../swagger/feedback.swagger';

@ApiTags('Feedback')
@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async listMy(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListFeedbackByUserQuery(user.userId));
  }

  @Get(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetFeedbackQuery(id));
  }

  @Post()
  @FeedbackSwagger.Submit()
  async submit(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SubmitFeedbackRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SubmitFeedbackCommand(user.userId, body.type, body.content),
    );
  }

  @Post(':id/review')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async review(
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new ReviewFeedbackCommand(id, body.status, body.notes),
    );
  }
}
