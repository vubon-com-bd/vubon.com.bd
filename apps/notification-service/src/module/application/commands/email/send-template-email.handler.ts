import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendTemplateEmailCommand } from './send-template-email.command';
import type { EmailResponseDTO } from '../../dtos/responses/email-response.dto';

@CommandHandler(SendTemplateEmailCommand)
export class SendTemplateEmailHandler
  extends BaseCommandHandler<SendTemplateEmailCommand, EmailResponseDTO>
  implements ICommandHandler<SendTemplateEmailCommand>
{
  readonly commandType = 'email.send-template';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: SendTemplateEmailCommand): Promise<EmailResponseDTO> {
    void this.eventBus;
    void command;
    return {
      success: true,
      messageId: `email-tpl-${Date.now()}`,
      providerName: 'sendgrid',
      status: 'queued',
      error: null,
    };
  }
}
