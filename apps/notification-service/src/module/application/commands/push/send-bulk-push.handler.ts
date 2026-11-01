import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendBulkPushCommand } from './send-bulk-push.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { BulkPushSendResponseDTO } from '@application/dtos/responses/push-response.dto.js';

@CommandHandler(SendBulkPushCommand)
export class SendBulkPushHandler
  implements ICommandHandler<SendBulkPushCommand, BulkPushSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService,
  ) {}

  async execute(c: SendBulkPushCommand): Promise<BulkPushSendResponseDTO> {
    try {
      await this.service.send({
        userId: '00000000-0000-0000-0000-000000000000',
        type: 'transactional',
        category: 'system',
        channels: ['push'],
        priority: c.dto.priority,
        subject: c.dto.title,
        body: c.dto.body,
        data: {
          tokens: c.dto.tokens,
          imageUrl: c.dto.imageUrl,
          payload: c.dto.data,
          silent: c.dto.silent,
        },
        idempotencyKey: c.dto.idempotencyKey,
      }, c.actorId);
      return {
        success: true,
        totalTokens: c.dto.tokens.length,
        successCount: c.dto.tokens.length,
        failureCount: 0,
        invalidTokens: [],
      };
    } catch (e) {
      return {
        success: false,
        totalTokens: c.dto.tokens.length,
        successCount: 0,
        failureCount: c.dto.tokens.length,
        invalidTokens: c.dto.tokens,
        // error not in type — swallow
      };
    }
  }
}
