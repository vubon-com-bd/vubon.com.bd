import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateSettingsCommand } from '../../../application/commands/settings/update-settings.command';
import { GetSettingsQuery } from '../../../application/queries/settings/get-settings.query';
import { UpdateSettingsRequestDto } from '../../dtos/requests/settings.request.dto';

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
    return this.queryBus.execute(new GetSettingsQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdateSettingsRequestDto,
  ): Promise<unknown> {
    const patch: Record<string, string> = {};
    if (body.theme) patch.theme = body.theme;
    if (body.language) patch.language = body.language;
    if (body.timezone) patch.timezone = body.timezone;
    if (body.currency) patch.currency = body.currency;
    if (body.notifications !== undefined) patch.notifications = String(body.notifications);
    return this.commandBus.execute(new UpdateSettingsCommand(user.userId, patch));
  }
}
