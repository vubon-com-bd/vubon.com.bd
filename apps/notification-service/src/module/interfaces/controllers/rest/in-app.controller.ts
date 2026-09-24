import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { CreateInAppCommand } from '../../../application/commands/in-app/create-in-app.command';
import { MarkAsReadCommand } from '../../../application/commands/in-app/mark-as-read.command';
import { ListNotificationsQuery } from '../../../application/queries/notification/list-notifications.query';
import { GetUnreadCountQuery } from '../../../application/queries/notification/get-unread-count.query';

interface CreateInAppBody {
  userId: string;
  title: string;
  body: string;
  position?: string;
  actionUrl?: string;
}

@Controller('notifications/in-app')
@UseGuards(JwtAuthGuard)
export class InAppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateInAppBody): Promise<unknown> {
    return this.commandBus.execute(
      new CreateInAppCommand(
        body.userId,
        body.title,
        body.body,
        body.position,
        body.actionUrl,
      ),
    );
  }

  @Get('mine')
  async mine(
    @CurrentUser() user: CurrentUserShape,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const parsed = limit ? Number(limit) : 50;
    return this.queryBus.execute(
      new ListNotificationsQuery(user.userId, Number.isFinite(parsed) ? parsed : 50),
    );
  }

  @Get('unread-count')
  async unreadCount(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUnreadCountQuery(user.userId));
  }

  @Post('mark-read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markRead(@Body() body: { notificationIds: string[] }): Promise<void> {
    await this.commandBus.execute(new MarkAsReadCommand(body.notificationIds));
  }
}
