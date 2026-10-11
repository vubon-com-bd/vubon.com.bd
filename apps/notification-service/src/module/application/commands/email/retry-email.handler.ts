import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetryEmailCommand } from './retry-email.command.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(RetryEmailCommand)
export class RetryEmailHandler implements ICommandHandler<RetryEmailCommand, EmailSendResponseDTO> {
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(c: RetryEmailCommand): Promise<EmailSendResponseDTO> {
    return this.service.retry(c.emailId, c.actorId);
  }
}
