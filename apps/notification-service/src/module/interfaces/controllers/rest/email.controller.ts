/**
 * EmailController — Email send endpoints
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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SendEmailCommand } from '@application/commands/email/send-email.command.js';
import { SendTemplateEmailCommand } from '@application/commands/email/send-template-email.command.js';
import { SendBulkEmailCommand } from '@application/commands/email/send-bulk-email.command.js';

import {
  SendEmailHttpDTO,
  SendTemplateEmailHttpDTO,
  SendBulkEmailHttpDTO,
} from '@interfaces/dtos/requests/email.request.dto.js';
import type {
  EmailSendHttpResponseDTO,
  BulkEmailSendHttpResponseDTO,
} from '@interfaces/dtos/responses/email.response.dto.js';

import { EmailHttpValidator } from '@interfaces/validators/email.validator.js';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';

@ApiTags('emails')
@ApiBearerAuth('bearer')
@Controller('emails')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DeliveryTrackingInterceptor)
export class EmailController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a single email' })
  async send(
    @Body() dto: SendEmailHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<EmailSendHttpResponseDTO> {
    EmailHttpValidator.validateSend(dto);
    const command = {
      ...dto,
      channels: undefined,
      idempotencyKey,
    };
    return this.commandBus.execute(
      new SendEmailCommand(command as never, user.userId),
    );
  }

  @Post('template')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send email from template' })
  async sendTemplate(
    @Body() dto: SendTemplateEmailHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<EmailSendHttpResponseDTO> {
    EmailHttpValidator.validateTemplate(dto);
    return this.commandBus.execute(
      new SendTemplateEmailCommand(dto as never, user.userId),
    );
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send bulk emails' })
  async sendBulk(
    @Body() dto: SendBulkEmailHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BulkEmailSendHttpResponseDTO> {
    EmailHttpValidator.validateBulk(dto);
    return this.commandBus.execute(
      new SendBulkEmailCommand(dto as never, user.userId),
    );
  }
}
