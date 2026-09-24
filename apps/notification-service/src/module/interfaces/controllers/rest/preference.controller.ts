import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdatePreferenceCommand } from '../../../application/commands/preference/update-preference.command';
import { UnsubscribeCommand } from '../../../application/commands/preference/unsubscribe.command';
import { GetPreferenceQuery } from '../../../application/queries/preference/get-preference.query';

interface UpdatePreferenceBody {
  preferenceType: string;
  option: string;
  value: string | boolean | number;
}

@Controller('notifications/preferences')
@UseGuards(JwtAuthGuard)
export class PreferenceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferenceQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdatePreferenceBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePreferenceCommand(
        user.userId,
        body.preferenceType,
        body.option,
        body.value,
      ),
    );
  }

  @Post('unsubscribe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: { channel: string; reason?: string },
  ): Promise<void> {
    await this.commandBus.execute(
      new UnsubscribeCommand(user.userId, body.channel, body.reason),
    );
  }
}
