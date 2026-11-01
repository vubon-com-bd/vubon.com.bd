import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnsubscribeCommand } from './unsubscribe.command.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';
import type { PreferenceResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler
  implements ICommandHandler<UnsubscribeCommand, PreferenceResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: UnsubscribeCommand): Promise<PreferenceResponseDTO> {
    return this.service.unsubscribe(c.dto, c.actorId);
  }
}
