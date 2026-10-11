/**
 * InAppController — REST endpoints for in-app notifications
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

import { SendInAppCommand } from '../../../application/commands/in-app/send-in-app.command.js';
import { MarkInAppReadCommand } from '../../../application/commands/in-app/mark-in-app-read.command.js';
import { DismissInAppCommand } from '../../../application/commands/in-app/dismiss-in-app.command.js';
import { RecordInAppClickCommand } from '../../../application/commands/in-app/record-in-app-click.command.js';

import { GetInAppInboxQuery } from '../../../application/queries/in-app/get-in-app-inbox.query.js';
import { GetInAppQuery } from '../../../application/queries/in-app/get-in-app.query.js';

import {
  SendInAppHttpDTO,
  InAppInboxHttpQueryDTO,
} from '../../dtos/requests/in-app/in-app.http-dto.js';
import { InAppControllerMapper } from '../../mappers/in-app.controller.mapper.js';

@ApiTags('in-app')
@ApiBearerAuth('bearer')
@Controller('in-app')
@UseGuards(JwtAuthGuard)
export class InAppController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send an in-app notification' })
  async send(
    @Body() dto: SendInAppHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SendInAppCommand(InAppControllerMapper.toSendAppDto(dto), user.userId),
    );
  }

  @Get('inbox')
  @ApiOperation({ summary: 'Get current user in-app inbox' })
  async inbox(
    @Query() q: InAppInboxHttpQueryDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetInAppInboxQuery(InAppControllerMapper.toInboxAppDto(q, user.userId)),
    );
  }

  @Get(':notificationId')
  @ApiOperation({ summary: 'Get in-app notification by id' })
  async getById(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetInAppQuery(notificationId, user.userId));
  }

  @Post(':notificationId/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark an in-app notification as read' })
  async markRead(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MarkInAppReadCommand({ notificationId, userId: user.userId }),
    );
  }

  @Post(':notificationId/dismiss')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Dismiss an in-app notification' })
  async dismiss(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new DismissInAppCommand({ notificationId, userId: user.userId }),
    );
  }

  @Post(':notificationId/click')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Record a click on an in-app notification action' })
  async click(
    @Param('notificationId') notificationId: string,
    @Body() body: { actionId?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RecordInAppClickCommand({
        notificationId,
        userId: user.userId,
        actionId: body.actionId,
      }),
    );
  }
}
