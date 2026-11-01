import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendPushCommand } from './send-push.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { PushSendResponseDTO } from '@application/dtos/responses/push-response.dto.js';

@CommandHandler(SendPushCommand)
export class SendPushHandler implements ICommandHandler<SendPushCommand, PushSendResponseDTO> {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService,
  ) {}

  async execute(c: SendPushCommand): Promise<PushSendResponseDTO> {
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
          iconUrl: c.dto.iconUrl,
          payload: c.dto.data,
          silent: c.dto.silent,
          ttl: c.dto.ttl,
        },
        idempotencyKey: c.dto.idempotencyKey,
      }, c.actorId);
      return {
        success: true,
        successCount: c.dto.tokens.length,
        failureCount: 0,
      };
    } catch (e) {
      return {
        success: false,
        successCount: 0,
        failureCount: c.dto.tokens.length,
        error: e instanceof Error ? e.message : 'Unknown',
      };
    }
  }
}
