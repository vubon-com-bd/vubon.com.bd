import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DismissInAppCommand } from './dismiss-in-app.command.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(DismissInAppCommand)
export class DismissInAppHandler
  implements ICommandHandler<DismissInAppCommand, InAppResponseDTO>
{
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(c: DismissInAppCommand): Promise<InAppResponseDTO> {
    return this.service.dismiss(c.dto);
  }
}
