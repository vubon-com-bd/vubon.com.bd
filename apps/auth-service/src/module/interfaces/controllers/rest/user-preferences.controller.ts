/**
 * UserPreferencesController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { UpdatePreferencesCommand } from '../../../application/commands/user/update-preferences.command';
import { GetUserPreferencesQuery } from '../../../application/queries/user/get-user-preferences.query';
import { UpdatePreferencesRequestDTO } from '../../dtos/requests/preferences.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Preferences')
@Controller('users/preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new GetUserPreferencesQuery(user.id as UserId));
  }

  @Put()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpdatePreferencesRequestDTO,
  ) {
    return this.commandBus.execute(
      new UpdatePreferencesCommand(user.id as UserId, body as never),
    );
  }
}
