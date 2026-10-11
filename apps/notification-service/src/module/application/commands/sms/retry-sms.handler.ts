import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetrySmsCommand } from './retry-sms.command.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(RetrySmsCommand)
export class RetrySmsHandler implements ICommandHandler<RetrySmsCommand, SmsSendResponseDTO> {
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(c: RetrySmsCommand): Promise<SmsSendResponseDTO> {
    return this.service.retry(c.smsId, c.actorId);
  }
}
