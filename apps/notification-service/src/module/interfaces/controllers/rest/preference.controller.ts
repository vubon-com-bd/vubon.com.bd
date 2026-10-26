/**
 * PreferenceController
 * @module notification-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { UpdatePreferenceCommand } from '@application/commands/preference/update-preference.command.js';
import { BulkUpdatePreferenceCommand } from '@application/commands/preference/bulk-update-preference.command.js';
import { UnsubscribeCommand } from '@application/commands/preference/unsubscribe.command.js';
import { GetPreferenceQuery } from '@application/queries/preference/get-preference.query.js';
import { GetPreferenceMatrixQuery } from '@application/queries/preference/get-preference-matrix.query.js';
import { GetPreferenceDefaultsQuery } from '@application/queries/preference/get-preference-defaults.query.js';

@ApiTags('preferences')
@ApiBearerAuth('bearer')
@Controller('preferences')
@UseGuards(JwtAuthGuard)
export class PreferenceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get('me')
  async getMyPreference(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferenceQuery(user.userId));
  }

  @Get('me/matrix')
  async getMatrix(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferenceMatrixQuery(user.userId));
  }

  @Get('defaults')
  async getDefaults(): Promise<unknown> {
    return this.queryBus.execute(new GetPreferenceDefaultsQuery());
  }

  @Patch('me')
  async update(
    @Body() body: unknown,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePreferenceCommand({ ...(body as object), userId: user.userId } as never, user.userId),
    );
  }

  @Post('bulk')
  @HttpCode(HttpStatus.OK)
  async bulkUpdate(
    @Body() body: unknown,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new BulkUpdatePreferenceCommand(body as never, user.userId),
    );
  }

  @Post('unsubscribe')
  @HttpCode(HttpStatus.OK)
  async unsubscribe(
    @Body() body: unknown,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UnsubscribeCommand({ ...(body as object), userId: user.userId } as never, user.userId),
    );
  }
}
