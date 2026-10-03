/**
 * UserPreferencesService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserPreferencesServiceInterface } from '../interfaces/user-preferences.service.interface.js';
import { UpdatePreferencesCommand } from '../../commands/preferences/update-preferences.command.js';
import { ResetPreferencesCommand } from '../../commands/preferences/reset-preferences.command.js';
import { GetPreferencesQuery } from '../../queries/preferences/get-preferences.query.js';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/preferences/index.js';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto.js';

@Injectable()
export class UserPreferencesService implements UserPreferencesServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  findByUserId(userId: string): Promise<PreferencesResponseDTO> {
    return this.queryBus.execute(new GetPreferencesQuery(userId));
  }

  update(
    userId: string,
    input: UpdatePreferencesRequestDTO
  ): Promise<PreferencesResponseDTO> {
    return this.commandBus.execute(
      new UpdatePreferencesCommand({ ...input, userId })
    );
  }

  reset(userId: string): Promise<PreferencesResponseDTO> {
    return this.commandBus.execute(new ResetPreferencesCommand(userId));
  }
}
