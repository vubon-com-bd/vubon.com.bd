import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateProfileCommand } from '../../../application/commands/profile/update-profile.command';
import { UpdateAvatarCommand } from '../../../application/commands/profile/update-avatar.command';
import { UpdateBioCommand } from '../../../application/commands/profile/update-bio.command';
import { GetProfileQuery } from '../../../application/queries/profile/get-profile.query';
import { UpdateProfileRequestDto } from '../../dtos/requests/profile.request.dto';
import { ProfileSwagger } from '../../swagger/profile.swagger';

@ApiTags('Profile')
@Controller('users/profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ProfileSwagger.Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetProfileQuery(user.userId));
  }

  @Patch()
  @ProfileSwagger.Update()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdateProfileRequestDto,
  ): Promise<unknown> {
    if (body.avatarUrl !== undefined) {
      return this.commandBus.execute(
        new UpdateAvatarCommand(user.userId, body.avatarUrl),
      );
    }
    if (body.bio !== undefined) {
      return this.commandBus.execute(new UpdateBioCommand(user.userId, body.bio));
    }
    return this.commandBus.execute(
      new UpdateProfileCommand(user.userId, body.firstName, body.lastName),
    );
  }
}
