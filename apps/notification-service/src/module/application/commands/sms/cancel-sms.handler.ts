import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelSmsCommand } from './cancel-sms.command.js';
import { SMS_SERVICE, type ISmsService } from '../../services/interfaces/sms.service.interface.js';
import type { SmsResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(CancelSmsCommand)
export class CancelSmsHandler implements ICommandHandler<CancelSmsCommand, SmsResponseDTO> {
  constructor(@Inject(SMS_SERVICE) private readonly service: ISmsService) {}

  async execute(c: CancelSmsCommand): Promise<SmsResponseDTO> {
    return this.service.cancel(c.smsId, c.actorId);
  }
}
