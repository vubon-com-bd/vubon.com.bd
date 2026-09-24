import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import type { EmailService } from '../../../infrastructure/external/email/email.service';
import type { SmsService } from '../../../infrastructure/external/sms/sms.service';
import type { PushService } from '../../../infrastructure/external/push/push.service';

interface SendNotificationBody {
  channel: 'email' | 'sms' | 'push';
  to: string;
  subject?: string;
  content: string;
}

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  @Post('send')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async send(@Body() body: SendNotificationBody): Promise<void> {
    if (body.channel === 'email') {
      await this.emailService.send({
        to: body.to,
        subject: body.subject ?? 'Notification',
        html: body.content,
      });
      return;
    }
    if (body.channel === 'sms') {
      await this.smsService.send({ to: body.to, message: body.content });
      return;
    }
    if (body.channel === 'push') {
      await this.pushService.send({
        deviceToken: body.to,
        title: body.subject ?? 'Notification',
        body: body.content,
      });
    }
  }
}
