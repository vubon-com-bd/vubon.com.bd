import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OptInCommand } from './opt-in.command.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@CommandHandler(OptInCommand)
export class OptInHandler implements ICommandHandler<OptInCommand, PreferenceResponseDTO> {
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: OptInCommand): Promise<PreferenceResponseDTO> {
    return this.service.optIn(c.dto);
  }
}
