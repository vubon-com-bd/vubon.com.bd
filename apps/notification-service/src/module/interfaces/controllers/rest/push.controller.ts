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
import { SendPushCommand } from '../../../application/commands/push/send-push.command';

interface SendPushBody {
  userId: string;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  clickAction?: string;
  data?: Record<string, string>;
}

@Controller('notifications/push')
@UseGuards(JwtAuthGuard)
export class PushController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendPushBody): Promise<unknown> {
    return this.commandBus.execute(
      new SendPushCommand(
        body.userId,
        body.title,
        body.body,
        body.icon,
        body.image,
        body.clickAction,
        body.data,
      ),
    );
  }
}
