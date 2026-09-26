/**
 * UserProfileController
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

import { UpdateProfileCommand } from '../../../application/commands/user/update-profile.command';
import { GetUserProfileQuery } from '../../../application/queries/user/get-user-profile.query';
import { UpdateProfileRequestDTO } from '../../dtos/requests/profile.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Profile')
@Controller('users/profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new GetUserProfileQuery(user.id as UserId));
  }

  @Put()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpdateProfileRequestDTO,
  ) {
    return this.commandBus.execute(
      new UpdateProfileCommand(user.id as UserId, body as never),
    );
  }
}
