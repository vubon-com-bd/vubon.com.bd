import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendBulkSmsCommand } from './send-bulk-sms.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { BulkSmsSendResponseDTO } from '@application/dtos/responses/sms-response.dto.js';

@CommandHandler(SendBulkSmsCommand)
export class SendBulkSmsHandler
  implements ICommandHandler<SendBulkSmsCommand, BulkSmsSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService,
  ) {}

  async execute(c: SendBulkSmsCommand): Promise<BulkSmsSendResponseDTO> {
    let successCount = 0;
    let failureCount = 0;
    let totalSegments = 0;
    const failures: { phone: string; error: string }[] = [];

    for (const r of c.dto.recipients) {
      try {
        const message = r.message ?? c.dto.message ?? '';
        const result = await this.service.send({
          userId: '00000000-0000-0000-0000-000000000000',
          type: 'transactional',
          category: 'system',
          channels: ['sms'],
          subject: 'SMS',
          body: message,
          data: { recipients: [r.phone], senderId: c.dto.senderId },
        }, c.actorId);
        successCount++;
        totalSegments += 1;
        void result;
      } catch (e) {
        failureCount++;
        failures.push({ phone: r.phone, error: e instanceof Error ? e.message : 'Unknown' });
      }
    }

    return {
      success: failureCount === 0,
      totalRequested: c.dto.recipients.length,
      successCount,
      failureCount,
      totalSegments,
      failures,
    };
  }
}
