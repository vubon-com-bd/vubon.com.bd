/**
 * PushController
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SendPushCommand } from '@application/commands/push/send-push.command.js';
import { SendBulkPushCommand } from '@application/commands/push/send-bulk-push.command.js';

import {
  SendPushHttpDTO,
  SendBulkPushHttpDTO,
} from '@interfaces/dtos/requests/push.request.dto.js';
import type {
  PushSendHttpResponseDTO,
  BulkPushSendHttpResponseDTO,
} from '@interfaces/dtos/responses/push.response.dto.js';

import { PushHttpValidator } from '@interfaces/validators/push.validator.js';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';

@ApiTags('push')
@ApiBearerAuth('bearer')
@Controller('push')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DeliveryTrackingInterceptor)
export class PushController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send push notification' })
  async send(
    @Body() dto: SendPushHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<PushSendHttpResponseDTO> {
    PushHttpValidator.validateSend(dto);
    return this.commandBus.execute(
      new SendPushCommand({ ...dto, idempotencyKey } as never, user.userId),
    );
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send bulk push' })
  async sendBulk(
    @Body() dto: SendBulkPushHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BulkPushSendHttpResponseDTO> {
    PushHttpValidator.validateBulk(dto);
    return this.commandBus.execute(
      new SendBulkPushCommand(dto as never, user.userId),
    );
  }
}
