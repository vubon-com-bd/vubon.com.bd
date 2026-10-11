/**
 * PushController — REST endpoints for push notification aggregate
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { SendPushCommand } from '../../../application/commands/push/send-push.command.js';
import { SendPushToTopicCommand } from '../../../application/commands/push/send-push-to-topic.command.js';
import { SubscribePushCommand } from '../../../application/commands/push/subscribe-push.command.js';
import { UnsubscribePushCommand } from '../../../application/commands/push/unsubscribe-push.command.js';
import { RetryPushCommand } from '../../../application/commands/push/retry-push.command.js';

import { GetPushQuery } from '../../../application/queries/push/get-push.query.js';
import { ListPushQuery } from '../../../application/queries/push/list-push.query.js';

import {
  SendPushHttpDTO,
  SendPushToTopicHttpDTO,
  RegisterPushSubscriptionHttpDTO,
  ListPushHttpQueryDTO,
} from '../../dtos/requests/push/push.http-dto.js';
import { PushControllerMapper } from '../../mappers/push.controller.mapper.js';

@ApiTags('push')
@ApiBearerAuth('bearer')
@Controller('push')
@UseGuards(JwtAuthGuard)
export class PushController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send push notifications (fan-out to tokens)' })
  async send(
    @Body() dto: SendPushHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = PushControllerMapper.toSendAppDto(dto);
    return this.commandBus.execute(new SendPushCommand(appDto, user.userId));
  }

  @Post('topic')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send push to a topic' })
  async sendToTopic(
    @Body() dto: SendPushToTopicHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = PushControllerMapper.toTopicAppDto(dto);
    return this.commandBus.execute(new SendPushToTopicCommand(appDto, user.userId));
  }

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register a push subscription (token)' })
  async subscribe(@Body() dto: RegisterPushSubscriptionHttpDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SubscribePushCommand(PushControllerMapper.toSubscribeAppDto(dto)),
    );
  }

  @Post('unsubscribe/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Unsubscribe a push token' })
  async unsubscribe(
    @Param('token') token: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new UnsubscribePushCommand(token, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List push notifications (paginated)' })
  async list(@Query() q: ListPushHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(new ListPushQuery(PushControllerMapper.toListAppDto(q)));
  }

  @Get(':pushId')
  @ApiOperation({ summary: 'Get push notification by id' })
  async getById(@Param('pushId') pushId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPushQuery(pushId));
  }

  @Post(':pushId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a failed push' })
  async retry(
    @Param('pushId') pushId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new RetryPushCommand(pushId, user.userId));
  }
}
