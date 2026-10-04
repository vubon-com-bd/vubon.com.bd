/**
 * UserSettingsService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserSettingsServiceInterface } from '../interfaces/user-settings.service.interface.js';
import { UpdateSettingsCommand } from '../../commands/settings/update-settings.command.js';
import { ResetSettingsCommand } from '../../commands/settings/reset-settings.command.js';
import { GetSettingsQuery } from '../../queries/settings/get-settings.query.js';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/settings/index.js';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto.js';

@Injectable()
export class UserSettingsService implements UserSettingsServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  findByUserId(userId: string): Promise<SettingsResponseDTO> {
    return this.queryBus.execute(new GetSettingsQuery(userId));
  }

  update(
    userId: string,
    input: UpdateSettingsRequestDTO
  ): Promise<SettingsResponseDTO> {
    return this.commandBus.execute(
      new UpdateSettingsCommand({ ...input, userId })
    );
  }

  reset(userId: string): Promise<SettingsResponseDTO> {
    return this.commandBus.execute(new ResetSettingsCommand(userId));
  }
}
