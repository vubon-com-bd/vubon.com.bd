import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateQuietHoursCommand } from './update-quiet-hours.command.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@CommandHandler(UpdateQuietHoursCommand)
export class UpdateQuietHoursHandler
  implements ICommandHandler<UpdateQuietHoursCommand, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: UpdateQuietHoursCommand): Promise<PreferenceResponseDTO> {
    return this.service.updateQuietHours(c.dto);
  }
}
