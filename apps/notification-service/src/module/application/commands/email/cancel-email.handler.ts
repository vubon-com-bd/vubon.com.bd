import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelEmailCommand } from './cancel-email.command.js';
import { EMAIL_SERVICE, type IEmailService } from '../../services/interfaces/email.service.interface.js';
import type { EmailResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(CancelEmailCommand)
export class CancelEmailHandler implements ICommandHandler<CancelEmailCommand, EmailResponseDTO> {
  constructor(@Inject(EMAIL_SERVICE) private readonly service: IEmailService) {}

  async execute(c: CancelEmailCommand): Promise<EmailResponseDTO> {
    return this.service.cancel(c.emailId, c.actorId);
  }
}
