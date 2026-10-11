/**
 * SmsController — REST endpoints for SMS aggregate
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

import { SendSmsCommand } from '../../../application/commands/sms/send-sms.command.js';
import { SendBulkSmsCommand } from '../../../application/commands/sms/send-bulk-sms.command.js';
import { RetrySmsCommand } from '../../../application/commands/sms/retry-sms.command.js';
import { CancelSmsCommand } from '../../../application/commands/sms/cancel-sms.command.js';

import { GetSmsQuery } from '../../../application/queries/sms/get-sms.query.js';
import { ListSmsQuery } from '../../../application/queries/sms/list-sms.query.js';

import {
  SendSmsHttpDTO,
  SendBulkSmsHttpDTO,
  ListSmsHttpQueryDTO,
} from '../../dtos/requests/sms/sms.http-dto.js';
import { SmsControllerMapper } from '../../mappers/sms.controller.mapper.js';

@ApiTags('sms')
@ApiBearerAuth('bearer')
@Controller('sms')
@UseGuards(JwtAuthGuard)
export class SmsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send an SMS' })
  async send(
    @Body() dto: SendSmsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = SmsControllerMapper.toSendAppDto(dto);
    return this.commandBus.execute(new SendSmsCommand(appDto, user.userId));
  }

  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send bulk SMS' })
  async sendBulk(
    @Body() dto: SendBulkSmsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = SmsControllerMapper.toBulkAppDto(dto);
    return this.commandBus.execute(new SendBulkSmsCommand(appDto, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List SMS (paginated)' })
  async list(@Query() q: ListSmsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(new ListSmsQuery(SmsControllerMapper.toListAppDto(q)));
  }

  @Get(':smsId')
  @ApiOperation({ summary: 'Get SMS by id' })
  async getById(@Param('smsId') smsId: string): Promise<unknown> {
    return this.queryBus.execute(new GetSmsQuery(smsId));
  }

  @Post(':smsId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a failed SMS' })
  async retry(
    @Param('smsId') smsId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new RetrySmsCommand(smsId, user.userId));
  }

  @Post(':smsId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a pending SMS' })
  async cancel(
    @Param('smsId') smsId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new CancelSmsCommand(smsId, user.userId));
  }
}
