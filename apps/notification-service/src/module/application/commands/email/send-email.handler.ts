import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendEmailCommand } from './send-email.command';
import type { EmailResponseDTO } from '../../dtos/responses/email-response.dto';

@CommandHandler(SendEmailCommand)
export class SendEmailHandler
  extends BaseCommandHandler<SendEmailCommand, EmailResponseDTO>
  implements ICommandHandler<SendEmailCommand>
{
  readonly commandType = 'email.send';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: SendEmailCommand): Promise<EmailResponseDTO> {
    void this.eventBus;
    void command;
    return {
      success: true,
      messageId: `email-${Date.now()}`,
      providerName: 'sendgrid',
      status: 'queued',
      error: null,
    };
  }
}
