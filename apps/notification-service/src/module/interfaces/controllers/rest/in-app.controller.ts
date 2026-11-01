/**
 * InAppController
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { CreateInAppCommand } from '@application/commands/in-app/create-in-app.command.js';
import { DismissInAppCommand } from '@application/commands/in-app/dismiss.command.js';

import {
  CreateInAppHttpDTO,
  DismissInAppHttpDTO,
} from '@interfaces/dtos/requests/in-app.request.dto.js';
import type { NotificationSendHttpResponseDTO } from '@interfaces/dtos/responses/notification.response.dto.js';

@ApiTags('in-app')
@ApiBearerAuth('bearer')
@Controller('in-app')
@UseGuards(JwtAuthGuard)
export class InAppController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create in-app notification' })
  async create(
    @Body() dto: CreateInAppHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<NotificationSendHttpResponseDTO> {
    return this.commandBus.execute(
      new CreateInAppCommand(dto as never, user.userId),
    );
  }

  @Post(':id/dismiss')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Dismiss in-app notification' })
  async dismiss(
    @Param('id') id: string,
    @Body() dto: DismissInAppHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ readonly dismissed: boolean }> {
    return this.commandBus.execute(
      new DismissInAppCommand({ notificationId: id, ...dto }, user.userId),
    );
  }
}
