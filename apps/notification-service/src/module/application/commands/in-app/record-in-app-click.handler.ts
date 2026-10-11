import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RecordInAppClickCommand } from './record-in-app-click.command.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@CommandHandler(RecordInAppClickCommand)
export class RecordInAppClickHandler
  implements ICommandHandler<RecordInAppClickCommand, InAppResponseDTO>
{
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(c: RecordInAppClickCommand): Promise<InAppResponseDTO> {
    return this.service.recordClick(c.dto);
  }
}
