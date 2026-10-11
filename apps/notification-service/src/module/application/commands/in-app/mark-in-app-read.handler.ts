import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkInAppReadCommand } from './mark-in-app-read.command.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(MarkInAppReadCommand)
export class MarkInAppReadHandler
  implements ICommandHandler<MarkInAppReadCommand, InAppResponseDTO>
{
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(c: MarkInAppReadCommand): Promise<InAppResponseDTO> {
    return this.service.markRead(c.dto);
  }
}
