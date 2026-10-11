import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendEmailCommand } from './send-email.command.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand, EmailSendResponseDTO> {
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(c: SendEmailCommand): Promise<EmailSendResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
