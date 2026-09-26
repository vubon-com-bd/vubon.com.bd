/**
 * AuthSettingsController
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

import { GetAuthSettingsQuery } from '../../../application/queries/auth/get-auth-settings.query';
import { UpdateAuthSettingsCommand } from '../../../application/commands/settings/update-auth-settings.command';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Settings')
@Controller('auth/settings')
@UseGuards(JwtAuthGuard)
export class AuthSettingsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new GetAuthSettingsQuery(user.id as UserId),
    );
  }

  @Put()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: Record<string, unknown>,
  ) {
    return this.commandBus.execute(
      new UpdateAuthSettingsCommand(user.id as UserId, body as never),
    );
  }
}
