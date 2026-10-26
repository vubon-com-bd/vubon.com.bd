/**
 * NotificationController — primary notification REST endpoints
 * @module notification-service/interfaces/controllers/rest
 */
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
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SendNotificationCommand } from '@application/commands/notification/send-notification.command.js';
import { SendBulkNotificationCommand } from '@application/commands/notification/send-bulk.command.js';
import { CancelNotificationCommand } from '@application/commands/notification/cancel-notification.command.js';
import { ResendNotificationCommand } from '@application/commands/notification/resend-notification.command.js';
import { GetNotificationQuery } from '@application/queries/notification/get-notification.query.js';
import { GetNotificationDetailQuery } from '@application/queries/notification/get-notification-detail.query.js';
import { GetPublicNotificationQuery } from '@application/queries/notification/get-public-notification.query.js';
import { ListNotificationsQuery } from '@application/queries/notification/list-notifications.query.js';
import { GetUserFeedQuery } from '@application/queries/notification/get-user-feed.query.js';
import { CountUnreadQuery } from '@application/queries/notification/count-unread.query.js';
import { GetNotificationStatsQuery } from '@application/queries/notification/get-notification-stats.query.js';

import {
  NOTIFICATION_DELIVERY_SERVICE,
  type INotificationDeliveryService,
} from '@application/services/interfaces/notification-delivery.service.interface.js';
import {
  NOTIFICATION_ATTEMPT_SERVICE,
  type INotificationAttemptService,
} from '@application/services/interfaces/notification-attempt.service.interface.js';
import type { DeliveryResponseDTO, DeliveryAttemptResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';
import { Inject } from '@nestjs/common';
import {
  SendNotificationHttpDTO,
  SendBulkNotificationHttpDTO,
  CancelNotificationHttpDTO,
  ResendNotificationHttpDTO,
  ListNotificationsHttpQueryDTO,
} from '@interfaces/dtos/requests/notification.request.dto.js';
import type {
  NotificationHttpResponseDTO,
  NotificationPublicHttpResponseDTO,
  NotificationListHttpResponseDTO,
  NotificationStatsHttpResponseDTO,
  NotificationSendHttpResponseDTO,
  NotificationUserFeedHttpResponseDTO,
} from '@interfaces/dtos/responses/notification.response.dto.js';
import type { NotificationDetailHttpResponseDTO } from '@interfaces/dtos/responses/notification-detail.response.dto.js';

import { NotificationControllerMapper } from '@interfaces/mappers/notification.controller.mapper.js';
import { NotificationHttpValidator } from '@interfaces/validators/notification.validator.js';
import { OwnNotificationGuard } from '@interfaces/guards/own-notification.guard.js';
import { NotificationRateLimitGuard } from '@interfaces/guards/notification-rate-limit.guard.js';
import { NotificationCacheInterceptor } from '@interfaces/interceptors/notification-cache.interceptor.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator.js';
import { NotificationOwner } from '@interfaces/decorators/notification-owner.decorator.js';
import {
  ApiNotificationTag,
  ApiSendNotification,
  ApiSendBulkNotification,
  ApiGetNotification,
  ApiGetNotificationPublic,
  ApiGetNotificationDetail,
  ApiListNotifications,
  ApiNotificationStats,
} from '@interfaces/swagger/notification.swagger.js';

@ApiNotificationTag()
@ApiBearerAuth('bearer')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@UseInterceptors(NotificationCacheInterceptor, DeliveryTrackingInterceptor)
export class NotificationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(NOTIFICATION_DELIVERY_SERVICE)
    private readonly deliveryService: INotificationDeliveryService,
    @Inject(NOTIFICATION_ATTEMPT_SERVICE)
    private readonly attemptService: INotificationAttemptService,
  ) {
    super();
  }

  // ═══════════ COMMANDS ═══════════
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(NotificationRateLimitGuard)
  @ApiSendNotification()
  async send(
    @Body() dto: SendNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<NotificationSendHttpResponseDTO> {
    NotificationHttpValidator.validateSend(dto);

    const appDto = NotificationControllerMapper.toSendRequestDTO(dto);
    return this.commandBus.execute(
      new SendNotificationCommand(
        { ...appDto, idempotencyKey } as never,
        user.userId,
        user.userId,
      ),
    );
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(NotificationRateLimitGuard)
  @ApiSendBulkNotification()
  async sendBulk(
    @Body() dto: SendBulkNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<NotificationSendHttpResponseDTO> {
    NotificationHttpValidator.validateSendBulk(dto);

    const appDto = NotificationControllerMapper.toSendBulkRequestDTO(dto);
    return this.commandBus.execute(
      new SendBulkNotificationCommand(appDto as never, user.userId, user.userId),
    );
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnNotificationGuard)
  async cancel(
    @Param('id') id: string,
    @Body() dto: CancelNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<NotificationHttpResponseDTO> {
    const appDto = NotificationControllerMapper.toCancelRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new CancelNotificationCommand(appDto as never, user.userId),
    );
    return NotificationControllerMapper.toHttpResponse(result);
  }

  @Post(':id/resend')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnNotificationGuard)
  async resend(
    @Param('id') id: string,
    @Body() dto: ResendNotificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<NotificationHttpResponseDTO> {
    const appDto = NotificationControllerMapper.toResendRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new ResendNotificationCommand(appDto as never, user.userId),
    );
    return NotificationControllerMapper.toHttpResponse(result);
  }

  // ═══════════ QUERIES ═══════════
  @Get()
  @ApiListNotifications()
  async list(
    @Query() q: ListNotificationsHttpQueryDTO,
  ): Promise<NotificationListHttpResponseDTO> {
    const options = NotificationControllerMapper.toListOptions(q);
    const result = await this.queryBus.execute(
      new ListNotificationsQuery(options),
    );
    return NotificationControllerMapper.toListHttp(result);
  }

  @Get('stats')
  @ApiNotificationStats()
  async stats(
    @CurrentUser() user: CurrentUserShape,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<NotificationStatsHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetNotificationStatsQuery(user.userId, fromDate, toDate),
    );
    return NotificationControllerMapper.toStatsHttp(result);
  }

  @Get('feed')
  async feed(
    @CurrentUser() user: CurrentUserShape,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<NotificationUserFeedHttpResponseDTO> {
    return this.queryBus.execute(
      new GetUserFeedQuery(user.userId, page ?? 1, limit ?? 20),
    );
  }

  @Get('unread-count')
  async unreadCount(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ readonly count: number }> {
    return this.queryBus.execute(new CountUnreadQuery(user.userId));
  }

  @Get(':id/detail')
  @NotificationOwner()
  @UseGuards(OwnNotificationGuard)
  @ApiGetNotificationDetail()
  async detail(
    @Param('id') id: string,
  ): Promise<NotificationDetailHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetNotificationDetailQuery(id),
    );
    return NotificationControllerMapper.toDetailHttp(result);
  }

  @Get(':id/public')
  @ApiGetNotificationPublic()
  async publicView(
    @Param('id') id: string,
  ): Promise<NotificationPublicHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetPublicNotificationQuery(id),
    );
    return NotificationControllerMapper.toPublicHttpResponse(result);
  }

  @Get(':id')
  @NotificationOwner()
  @UseGuards(OwnNotificationGuard)
  @ApiGetNotification()
  async getById(
    @Param('id') id: string,
  ): Promise<NotificationHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetNotificationQuery(id),
    );
    return NotificationControllerMapper.toHttpResponse(result);
  }
  // ═══════════ DELIVERY TRACKING ═══════════
  @Get(':id/delivery')
  @NotificationOwner()
  @UseGuards(OwnNotificationGuard)
  async getDelivery(
    @Param('id') id: string,
  ): Promise<DeliveryResponseDTO | null> {
    return this.deliveryService.getByNotification(id);
  }

  @Get(':id/attempts')
  @NotificationOwner()
  @UseGuards(OwnNotificationGuard)
  async getAttempts(
    @Param('id') id: string,
  ): Promise<readonly DeliveryAttemptResponseDTO[]> {
    return this.attemptService.listByNotification(id);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @NotificationOwner()
  @UseGuards(OwnNotificationGuard)
  async retry(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ readonly queued: boolean; readonly notificationId: string }> {
    // Delegate to resend command — retry same as re-queueing
    await this.commandBus.execute(
      new ResendNotificationCommand({ notificationId: id, forceResend: true } as never, user.userId),
    );
    return { queued: true, notificationId: id };
  }
}
