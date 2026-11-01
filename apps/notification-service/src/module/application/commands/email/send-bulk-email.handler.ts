import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendBulkEmailCommand } from './send-bulk-email.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { BulkEmailSendResponseDTO } from '@application/dtos/responses/email-response.dto.js';

@CommandHandler(SendBulkEmailCommand)
export class SendBulkEmailHandler
  implements ICommandHandler<SendBulkEmailCommand, BulkEmailSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendBulkEmailCommand): Promise<BulkEmailSendResponseDTO> {
    let successCount = 0;
    let failureCount = 0;
    const failures: { email: string; error: string }[] = [];

    for (const recipient of c.dto.recipients) {
      try {
        await this.service.send({
          userId: '00000000-0000-0000-0000-000000000000',
          type: 'transactional',
          category: 'system',
          channels: ['email'],
          subject: '',
          body: '',
          data: {
            templateId: c.dto.templateId,
            templateData: { ...c.dto.commonData, ...recipient.templateData },
            recipients: [recipient.email],
          },
        }, c.actorId);
        successCount++;
      } catch (e) {
        failureCount++;
        failures.push({
          email: recipient.email,
          error: e instanceof Error ? e.message : 'Unknown',
        });
      }
    }

    return {
      success: failureCount === 0,
      totalRequested: c.dto.recipients.length,
      successCount,
      failureCount,
      failures,
    };
  }
}
