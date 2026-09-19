import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateProfileCommand } from '../../../application/commands/user/update-profile.command';
import { GetUserProfileQuery } from '../../../application/queries/user/get-user-profile.query';
import { ProfileUpdateRequestDTO } from '../../dtos/requests/profile.request.dto';

@ApiTags('Profile')
@Controller('users/profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUserProfileQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: ProfileUpdateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateProfileCommand(
        user.userId,
        body.firstName,
        body.lastName,
        body.bio,
        body.avatarUrl,
      ),
    );
  }
}
