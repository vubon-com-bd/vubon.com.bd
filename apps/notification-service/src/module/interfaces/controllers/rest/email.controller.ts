/**
 * EmailController — REST endpoints for email aggregate
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

import { SendEmailCommand } from '../../../application/commands/email/send-email.command.js';
import { SendEmailWithTemplateCommand } from '../../../application/commands/email/send-email-with-template.command.js';
import { RetryEmailCommand } from '../../../application/commands/email/retry-email.command.js';
import { CancelEmailCommand } from '../../../application/commands/email/cancel-email.command.js';

import { GetEmailQuery } from '../../../application/queries/email/get-email.query.js';
import { ListEmailsQuery } from '../../../application/queries/email/list-emails.query.js';

import {
  SendEmailHttpDTO,
  SendEmailWithTemplateHttpDTO,
  ListEmailsHttpQueryDTO,
} from '../../dtos/requests/email/email.http-dto.js';
import { EmailControllerMapper } from '../../mappers/email.controller.mapper.js';

@ApiTags('email')
@ApiBearerAuth('bearer')
@Controller('email')
@UseGuards(JwtAuthGuard)
export class EmailController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send an email' })
  async send(
    @Body() dto: SendEmailHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = EmailControllerMapper.toSendAppDto(dto);
    return this.commandBus.execute(new SendEmailCommand(appDto, user.userId));
  }

  @Post('with-template')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send an email using a template' })
  async sendWithTemplate(
    @Body() dto: SendEmailWithTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = EmailControllerMapper.toSendWithTemplateAppDto(dto);
    return this.commandBus.execute(new SendEmailWithTemplateCommand(appDto, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List emails (paginated)' })
  async list(@Query() q: ListEmailsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(new ListEmailsQuery(EmailControllerMapper.toListAppDto(q)));
  }

  @Get(':emailId')
  @ApiOperation({ summary: 'Get email by id' })
  async getById(@Param('emailId') emailId: string): Promise<unknown> {
    return this.queryBus.execute(new GetEmailQuery(emailId));
  }

  @Post(':emailId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a failed email' })
  async retry(
    @Param('emailId') emailId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new RetryEmailCommand(emailId, user.userId));
  }

  @Post(':emailId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a pending email' })
  async cancel(
    @Param('emailId') emailId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new CancelEmailCommand(emailId, user.userId));
  }
}
