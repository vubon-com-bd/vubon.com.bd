/**
 * NotificationController — REST endpoints for notification aggregate
 * @module notification-service/interfaces/controllers/rest
 */
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { SendNotificationCommand } from '../../../application/commands/notification/send-notification.command.js';
import { SendNotificationToManyCommand } from '../../../application/commands/notification/send-notification-to-many.command.js';
import { ScheduleNotificationCommand } from '../../../application/commands/notification/schedule-notification.command.js';
import { CancelNotificationCommand } from '../../../application/commands/notification/cancel-notification.command.js';
import { UpdateNotificationCommand } from '../../../application/commands/notification/update-notification.command.js';
import { DeleteNotificationCommand } from '../../../application/commands/notification/delete-notification.command.js';
import { RetryNotificationCommand } from '../../../application/commands/notification/retry-notification.command.js';
import { MarkNotificationReadCommand } from '../../../application/commands/notification/mark-notification-read.command.js';
import { MarkNotificationsReadCommand } from '../../../application/commands/notification/mark-notifications-read.command.js';
import { MarkAllReadCommand } from '../../../application/commands/notification/mark-all-read.command.js';
import { ArchiveNotificationCommand } from '../../../application/commands/notification/archive-notification.command.js';
import { SnoozeNotificationCommand } from '../../../application/commands/notification/snooze-notification.command.js';
import { StarNotificationCommand } from '../../../application/commands/notification/star-notification.command.js';

import { GetNotificationByIdQuery } from '../../../application/queries/notification/get-notification-by-id.query.js';
import { GetNotificationPublicQuery } from '../../../application/queries/notification/get-notification-public.query.js';
import { GetNotificationDetailQuery } from '../../../application/queries/notification/get-notification-detail.query.js';
import { ListNotificationsQuery } from '../../../application/queries/notification/list-notifications.query.js';
import { GetNotificationStatsQuery } from '../../../application/queries/notification/get-notification-stats.query.js';
import { GetUnreadCountQuery } from '../../../application/queries/notification/get-unread-count.query.js';

import {
  SendNotificationHttpDTO,
  SendNotificationToManyHttpDTO,
  ScheduleNotificationHttpDTO,
} from '../../dtos/requests/notification/send-notification.http-dto.js';
import {
  ListNotificationsHttpQueryDTO,
  NotificationStatsHttpQueryDTO,
} from '../../dtos/requests/notification/list-notifications.http-dto.js';
import {
  MarkNotificationReadHttpDTO,
  MarkNotificationsReadHttpDTO,
  MarkAllReadHttpDTO,
  ArchiveNotificationHttpDTO,
  SnoozeNotificationHttpDTO,
  StarNotificationHttpDTO,
} from '../../dtos/requests/notification/mark-read.http-dto.js';
import {
  UpdateNotificationHttpDTO,
  CancelNotificationHttpDTO,
  DeleteNotificationHttpDTO,
  RetryNotificationHttpDTO,
} from '../../dtos/requests/notification/update-notification.http-dto.js';

import { NotificationControllerMapper } from '../../mappers/notification.controller.mapper.js';

@ApiTags('notifications')
@ApiBearerAuth('bearer')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ═══ SEND ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a notification (fan-out to channels)' })
  async send(
    @Body() dto: SendNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = NotificationControllerMapper.toSendAppDto(dto);
    return this.commandBus.execute(new SendNotificationCommand(appDto, user.userId));
  }

  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send same notification to many users' })
  async sendToMany(
    @Body() dto: SendNotificationToManyHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = NotificationControllerMapper.toSendManyAppDto(dto);
    return this.commandBus.execute(new SendNotificationToManyCommand(appDto, user.userId));
  }

  @Post('schedule')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule a notification for the future' })
  async schedule(
    @Body() dto: ScheduleNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = { ...NotificationControllerMapper.toSendAppDto(dto), scheduledAt: dto.scheduledAt };
    return this.commandBus.execute(new ScheduleNotificationCommand(appDto, user.userId));
  }

  // ═══ READ ═══
  @Get()
  @ApiOperation({ summary: 'List notifications (paginated)' })
  async list(
    @Query() q: ListNotificationsHttpQueryDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const options = NotificationControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListNotificationsQuery(user.userId, options));
  }

  @Get('stats')
  @ApiOperation({ summary: 'Notification statistics' })
  async stats(@Query() q: NotificationStatsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new GetNotificationStatsQuery(q.userId, q.fromDate, q.toDate),
    );
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notification count for current user' })
  async unreadCount(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUnreadCountQuery(user.userId));
  }

  @Get(':notificationId')
  @ApiOperation({ summary: 'Get notification by id' })
  async getById(@Param('notificationId') notificationId: string): Promise<unknown> {
    return this.queryBus.execute(new GetNotificationByIdQuery(notificationId));
  }

  @Get(':notificationId/public')
  @ApiOperation({ summary: 'Get public notification view' })
  async getPublic(@Param('notificationId') notificationId: string): Promise<unknown> {
    return this.queryBus.execute(new GetNotificationPublicQuery(notificationId));
  }

  @Get(':notificationId/detail')
  @ApiOperation({ summary: 'Get notification detail (with delivery attempts)' })
  async getDetail(@Param('notificationId') notificationId: string): Promise<unknown> {
    return this.queryBus.execute(new GetNotificationDetailQuery(notificationId));
  }

  // ═══ UPDATE / CANCEL / DELETE ═══
  @Patch(':notificationId')
  @ApiOperation({ summary: 'Update a pending/scheduled notification' })
  async update(
    @Param('notificationId') notificationId: string,
    @Body() dto: UpdateNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateNotificationCommand({ ...dto, notificationId } as never, user.userId),
    );
  }

  @Post(':notificationId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a pending/scheduled notification' })
  async cancel(
    @Param('notificationId') notificationId: string,
    @Body() dto: CancelNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelNotificationCommand({ notificationId, reason: dto.reason }, user.userId),
    );
  }

  @Post(':notificationId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a failed notification' })
  async retry(
    @Param('notificationId') notificationId: string,
    @Body() dto: RetryNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RetryNotificationCommand({ notificationId, force: dto.force }, user.userId),
    );
  }

  @Delete(':notificationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete (soft by default) a notification' })
  async delete(
    @Param('notificationId') notificationId: string,
    @Query() q: DeleteNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteNotificationCommand(
        { notificationId, softDelete: q.softDelete !== false },
        user.userId,
      ),
    );
  }

  // ═══ READ-STATE MUTATIONS ═══
  @Post(':notificationId/mark-read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark a notification as read' })
  async markRead(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: MarkNotificationReadHttpDTO = { notificationId, userId: user.userId };
    return this.commandBus.execute(new MarkNotificationReadCommand(dto));
  }

  @Post('mark-many-read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark multiple notifications as read' })
  async markManyRead(
    @Body() dto: MarkNotificationsReadHttpDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(new MarkNotificationsReadCommand(dto));
  }

  @Post('mark-all-read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read for current user' })
  async markAllRead(
    @Body() dto: Omit<MarkAllReadHttpDTO, 'userId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MarkAllReadCommand({ ...dto, userId: user.userId }),
    );
  }

  @Post(':notificationId/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive a notification' })
  async archive(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: ArchiveNotificationHttpDTO = { notificationId, userId: user.userId };
    return this.commandBus.execute(new ArchiveNotificationCommand(dto));
  }

  @Post(':notificationId/snooze')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Snooze a notification until a given time' })
  async snooze(
    @Param('notificationId') notificationId: string,
    @Body() body: { snoozedUntil: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: SnoozeNotificationHttpDTO = {
      notificationId,
      userId: user.userId,
      snoozedUntil: body.snoozedUntil,
    };
    return this.commandBus.execute(new SnoozeNotificationCommand(dto));
  }

  @Post(':notificationId/star')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Star a notification' })
  async star(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: StarNotificationHttpDTO = { notificationId, userId: user.userId };
    return this.commandBus.execute(new StarNotificationCommand(dto));
  }
}
