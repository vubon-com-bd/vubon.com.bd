/**
 * SmsController
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

import { SendSmsCommand } from '@application/commands/sms/send-sms.command.js';
import { SendBulkSmsCommand } from '@application/commands/sms/send-bulk-sms.command.js';

import {
  SendSmsHttpDTO,
  SendBulkSmsHttpDTO,
} from '@interfaces/dtos/requests/sms.request.dto.js';
import type {
  SmsSendHttpResponseDTO,
  BulkSmsSendHttpResponseDTO,
} from '@interfaces/dtos/responses/sms.response.dto.js';

import { SmsHttpValidator } from '@interfaces/validators/sms.validator.js';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';

@ApiTags('sms')
@ApiBearerAuth('bearer')
@Controller('sms')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DeliveryTrackingInterceptor)
export class SmsController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send SMS' })
  async send(
    @Body() dto: SendSmsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<SmsSendHttpResponseDTO> {
    SmsHttpValidator.validateSend(dto);
    return this.commandBus.execute(
      new SendSmsCommand({ ...dto, idempotencyKey } as never, user.userId),
    );
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send bulk SMS' })
  async sendBulk(
    @Body() dto: SendBulkSmsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BulkSmsSendHttpResponseDTO> {
    SmsHttpValidator.validateBulk(dto);
    return this.commandBus.execute(
      new SendBulkSmsCommand(dto as never, user.userId),
    );
  }
}
