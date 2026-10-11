import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendBulkSmsCommand } from './send-bulk-sms.command.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendBulkSmsCommand)
export class SendBulkSmsHandler
  implements ICommandHandler<SendBulkSmsCommand, readonly SmsSendResponseDTO[]>
{
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(c: SendBulkSmsCommand): Promise<readonly SmsSendResponseDTO[]> {
    return this.service.sendBulk(c.dto, c.actorId);
  }
}
