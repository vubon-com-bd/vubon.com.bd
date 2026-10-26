/**
 * SendEmailHandler
 * @module notification-service/application/commands/email
 *
 * Delegates to NotificationService.send with channel='email'.
 * Resolves recipient from DTO's "to" field directly (no user lookup needed)।
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendEmailCommand } from './send-email.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { EmailSendResponseDTO } from '@application/dtos/responses/email-response.dto.js';

// Synthetic user ID for direct-email flow (email is the destination, not user)
const SYSTEM_USER_ID = '00000000-0000-4000-8000-000000000001';

@CommandHandler(SendEmailCommand)
export class SendEmailHandler
  implements ICommandHandler<SendEmailCommand, EmailSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendEmailCommand): Promise<EmailSendResponseDTO> {
    const recipients = Array.isArray(c.dto.to) ? [...c.dto.to] : [c.dto.to];
    const firstEmail = recipients[0];

    const result = await this.service.send({
      userId: SYSTEM_USER_ID,
      type: 'transactional',
      category: 'system',
      channels: ['email'],
      subject: c.dto.subject,
      body: c.dto.text ?? c.dto.html ?? '',
      // ─── Direct email hint (bypasses identity lookup) ───
      email: firstEmail,
      data: { recipients, cc: c.dto.cc, bcc: c.dto.bcc, attachments: c.dto.attachments },
      idempotencyKey: c.dto.idempotencyKey,
    }, c.actorId);

    return {
      success: result.success,
      messageId: result.notificationIds[0],
      status: result.status as string,
    };
  }
}
