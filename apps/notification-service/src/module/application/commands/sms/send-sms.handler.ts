/**
 * SendSmsHandler
 * @module notification-service/application/commands/sms
 *
 * Delegates to NotificationService.send with channel='sms'.
 * Resolves recipient from DTO's "to" field (no user lookup needed)।
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendSmsCommand } from './send-sms.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { SmsSendResponseDTO } from '@application/dtos/responses/sms-response.dto.js';

// Synthetic user ID for direct-SMS flow
const SYSTEM_USER_ID = '00000000-0000-4000-8000-000000000001';

@CommandHandler(SendSmsCommand)
export class SendSmsHandler
  implements ICommandHandler<SendSmsCommand, SmsSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendSmsCommand): Promise<SmsSendResponseDTO> {
    const recipients = Array.isArray(c.dto.to) ? [...c.dto.to] : [c.dto.to];
    const firstPhone = recipients[0];

    try {
      const result = await this.service.send({
        userId: SYSTEM_USER_ID,
        type: 'transactional',
        category: 'system',
        channels: ['sms'],
        subject: 'SMS',
        body: c.dto.message,
        // ─── Direct phone hint (bypasses identity lookup) ───
        phone: firstPhone,
        data: { recipients, senderId: c.dto.senderId, smsType: c.dto.type },
        idempotencyKey: c.dto.idempotencyKey,
      }, c.actorId);

      return {
        success: result.success,
        messageId: result.notificationIds[0],
        status: result.status as string,
        segments: 1,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      return {
        success: false,
        status: 'failed',
        segments: 0,
        error: msg,
      };
    }
  }
}
