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
import { GetAuthSettingsQuery } from '../../../application/queries/auth/get-auth-settings.query';
import { UpdateAuthSettingsCommand } from '../../../application/commands/settings/update-auth-settings.command';

interface UpdateAuthSettingsBody {
  mfaRequired?: boolean;
  sessionTimeoutMinutes?: number;
  passwordExpiryDays?: number;
  loginNotifications?: boolean;
}

@ApiTags('Auth Settings')
@Controller('auth/settings')
@UseGuards(JwtAuthGuard)
export class AuthSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetAuthSettingsQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdateAuthSettingsBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateAuthSettingsCommand(
        user.userId,
        body.mfaRequired,
        body.sessionTimeoutMinutes,
        body.passwordExpiryDays,
        body.loginNotifications,
      ),
    );
  }
}
