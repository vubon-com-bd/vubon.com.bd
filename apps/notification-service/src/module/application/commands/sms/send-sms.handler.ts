import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendSmsCommand } from './send-sms.command.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendSmsCommand)
export class SendSmsHandler implements ICommandHandler<SendSmsCommand, SmsSendResponseDTO> {
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(c: SendSmsCommand): Promise<SmsSendResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
