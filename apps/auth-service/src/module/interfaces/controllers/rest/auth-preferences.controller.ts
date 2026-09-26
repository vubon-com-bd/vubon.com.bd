/**
 * AuthPreferencesController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { GetUserPreferencesQuery } from '../../../application/queries/user/get-user-preferences.query';
import { UpdateAuthPreferencesCommand } from '../../../application/commands/settings/update-auth-preferences.command';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Preferences')
@Controller('auth/preferences')
@UseGuards(JwtAuthGuard)
export class AuthPreferencesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new GetUserPreferencesQuery(user.id as UserId),
    );
  }

  @Put()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.commandBus.execute(
      new UpdateAuthPreferencesCommand(user.id as UserId, body as never),
    );
  }
}
