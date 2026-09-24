import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { SendEmailCommand } from '../../../application/commands/email/send-email.command';
import { SendTemplateEmailCommand } from '../../../application/commands/email/send-template-email.command';

interface SendEmailBody {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

interface SendTemplateEmailBody {
  to: string | string[];
  templateName: string;
  variables: Record<string, string | number | boolean>;
  locale?: string;
}

@Controller('notifications/email')
@UseGuards(JwtAuthGuard)
export class EmailController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendEmailBody): Promise<unknown> {
    return this.commandBus.execute(
      new SendEmailCommand(body.to, body.subject, body.html, body.text),
    );
  }

  @Post('send-template')
  @HttpCode(HttpStatus.OK)
  async sendTemplate(@Body() body: SendTemplateEmailBody): Promise<unknown> {
    return this.commandBus.execute(
      new SendTemplateEmailCommand(
        body.to,
        body.templateName,
        body.variables,
        body.locale,
      ),
    );
  }
}
