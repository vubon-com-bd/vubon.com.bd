/**
 * UserSettingsController
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

import { UpdateSettingsCommand } from '../../../application/commands/user/update-settings.command';
import { GetUserSettingsQuery } from '../../../application/queries/user/get-user-settings.query';
import { UpdateSettingsRequestDTO } from '../../dtos/requests/settings.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Settings')
@Controller('users/settings')
@UseGuards(JwtAuthGuard)
export class UserSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new GetUserSettingsQuery(user.id as UserId));
  }

  @Put()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpdateSettingsRequestDTO,
  ) {
    return this.commandBus.execute(
      new UpdateSettingsCommand(user.id as UserId, body as never),
    );
  }
}
