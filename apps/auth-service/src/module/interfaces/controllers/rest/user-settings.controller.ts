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
import { UpdateSettingsCommand } from '../../../application/commands/user/update-settings.command';
import { GetUserSettingsQuery } from '../../../application/queries/user/get-user-settings.query';
import { SettingsUpdateRequestDTO } from '../../dtos/requests/settings.request.dto';

@ApiTags('Settings')
@Controller('users/settings')
@UseGuards(JwtAuthGuard)
export class UserSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUserSettingsQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SettingsUpdateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateSettingsCommand(
        user.userId,
        body.theme,
        body.language,
        body.timezone,
        body.notifications,
      ),
    );
  }
}
