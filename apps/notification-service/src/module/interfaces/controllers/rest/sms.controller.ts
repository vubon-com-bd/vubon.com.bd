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
import { SendSmsCommand } from '../../../application/commands/sms/send-sms.command';

interface SendSmsBody {
  to: string | string[];
  body: string;
  from?: string;
}

@Controller('notifications/sms')
@UseGuards(JwtAuthGuard)
export class SmsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendSmsBody): Promise<unknown> {
    return this.commandBus.execute(
      new SendSmsCommand(body.to, body.body, body.from),
    );
  }
}
