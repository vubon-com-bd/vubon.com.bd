import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OptOutCommand } from './opt-out.command.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@CommandHandler(OptOutCommand)
export class OptOutHandler implements ICommandHandler<OptOutCommand, PreferenceResponseDTO> {
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: OptOutCommand): Promise<PreferenceResponseDTO> {
    return this.service.optOut(c.dto);
  }
}
