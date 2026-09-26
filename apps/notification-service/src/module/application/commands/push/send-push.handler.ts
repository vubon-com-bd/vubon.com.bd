import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendPushCommand } from './send-push.command';
import type { PushResponseDTO } from '../../dtos/responses/push-response.dto';

@CommandHandler(SendPushCommand)
export class SendPushHandler
  extends BaseCommandHandler<SendPushCommand, PushResponseDTO>
  implements ICommandHandler<SendPushCommand>
{
  readonly commandType = 'push.send';

  async execute(command: SendPushCommand): Promise<PushResponseDTO> {
    void command;
    return {
      success: true,
      messageId: `push-${Date.now()}`,
      providerName: 'fcm',
      status: 'queued',
      error: null,
    };
  }
}
