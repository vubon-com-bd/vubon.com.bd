import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePreferenceCommand } from './update-preference.command.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@CommandHandler(UpdatePreferenceCommand)
export class UpdatePreferenceHandler
  implements ICommandHandler<UpdatePreferenceCommand, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: UpdatePreferenceCommand): Promise<PreferenceResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
