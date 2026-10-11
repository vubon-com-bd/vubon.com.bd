import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ToggleCategoryCommand } from './toggle-category.command.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '../../services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto.js';

@CommandHandler(ToggleCategoryCommand)
export class ToggleCategoryHandler
  implements ICommandHandler<ToggleCategoryCommand, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: ToggleCategoryCommand): Promise<PreferenceResponseDTO> {
    return this.service.toggleCategory(c.dto);
  }
}
