import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendTemplateEmailCommand } from './send-template-email.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { EmailSendResponseDTO } from '@application/dtos/responses/email-response.dto.js';

@CommandHandler(SendTemplateEmailCommand)
export class SendTemplateEmailHandler
  implements ICommandHandler<SendTemplateEmailCommand, EmailSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendTemplateEmailCommand): Promise<EmailSendResponseDTO> {
    const recipients = Array.isArray(c.dto.to) ? c.dto.to : [c.dto.to];
    const result = await this.service.send({
      userId: '00000000-0000-0000-0000-000000000000',
      type: 'transactional',
      category: 'system',
      channels: ['email'],
      subject: '',
      body: '',
      data: {
        templateId: c.dto.templateId,
        templateData: c.dto.templateData,
        recipients,
        cc: c.dto.cc,
        bcc: c.dto.bcc,
      },
      idempotencyKey: c.dto.idempotencyKey,
    }, c.actorId);

    return {
      success: result.success,
      messageId: result.notificationIds[0],
      status: result.status as string,
    };
  }
}
