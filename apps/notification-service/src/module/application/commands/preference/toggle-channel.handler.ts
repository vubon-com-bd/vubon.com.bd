import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToggleChannelCommand } from './toggle-channel.command.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@CommandHandler(ToggleChannelCommand)
export class ToggleChannelHandler
  implements ICommandHandler<ToggleChannelCommand, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: ToggleChannelCommand): Promise<PreferenceResponseDTO> {
    return this.service.toggleChannel(c.dto);
  }
}
