import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendInAppCommand } from './send-in-app.command.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppSendResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(SendInAppCommand)
export class SendInAppHandler
  implements ICommandHandler<SendInAppCommand, InAppSendResponseDTO>
{
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(c: SendInAppCommand): Promise<InAppSendResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
