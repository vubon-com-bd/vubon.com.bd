import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendSmsCommand } from './send-sms.command';
import type { SmsResponseDTO } from '../../dtos/responses/sms-response.dto';

@CommandHandler(SendSmsCommand)
export class SendSmsHandler
  extends BaseCommandHandler<SendSmsCommand, SmsResponseDTO>
  implements ICommandHandler<SendSmsCommand>
{
  readonly commandType = 'sms.send';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: SendSmsCommand): Promise<SmsResponseDTO> {
    void this.eventBus;
    return {
      success: true,
      messageId: `sms-${Date.now()}`,
      providerName: 'twilio',
      status: 'queued',
      parts: 1,
      error: null,
    };
  }
}
