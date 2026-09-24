import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { NotificationSwagger } from '../../swagger/notification.swagger';
import { SendNotificationCommand } from '../../../application/commands/notification/send-notification.command';
import { CancelNotificationCommand } from '../../../application/commands/notification/cancel-notification.command';
import { GetNotificationQuery } from '../../../application/queries/notification/get-notification.query';
import { ListNotificationsQuery } from '../../../application/queries/notification/list-notifications.query';

interface SendNotificationBody {
  userId: string;
  type: string;
  channel: string;
  category: string;
  title: string;
  body: string;
  priority?: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  scheduledAt?: string;
}

@NotificationSwagger.Tag()
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @NotificationSwagger.Send()
  async send(@Body() body: SendNotificationBody): Promise<unknown> {
    return this.commandBus.execute(
      new SendNotificationCommand(
        body.userId,
        body.type,
        body.channel,
        body.category,
        body.title,
        body.body,
        body.priority,
        body.data,
        body.actionUrl,
        body.scheduledAt,
      ),
    );
  }

  @Get()
  @NotificationSwagger.List()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const parsed = limit ? Number(limit) : 50;
    return this.queryBus.execute(
      new ListNotificationsQuery(user.userId, Number.isFinite(parsed) ? parsed : 50),
    );
  }

  @Get(':id')
  @NotificationSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetNotificationQuery(id));
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<void> {
    await this.commandBus.execute(new CancelNotificationCommand(id, body.reason));
  }
}
