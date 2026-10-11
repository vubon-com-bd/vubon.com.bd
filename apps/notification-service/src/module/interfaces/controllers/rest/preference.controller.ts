/**
 * PreferenceController — REST endpoints for user notification preferences
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { UpdatePreferenceCommand } from '../../../application/commands/preference/update-preference.command.js';
import { ToggleChannelCommand } from '../../../application/commands/preference/toggle-channel.command.js';
import { ToggleCategoryCommand } from '../../../application/commands/preference/toggle-category.command.js';
import { UpdateQuietHoursCommand } from '../../../application/commands/preference/update-quiet-hours.command.js';
import { OptOutCommand } from '../../../application/commands/preference/opt-out.command.js';
import { OptInCommand } from '../../../application/commands/preference/opt-in.command.js';

import { GetPreferenceQuery } from '../../../application/queries/preference/get-preference.query.js';
import { GetPreferencePublicQuery } from '../../../application/queries/preference/get-preference-public.query.js';

import {
  UpdatePreferenceHttpDTO,
  ToggleChannelHttpDTO,
  ToggleCategoryHttpDTO,
  UpdateQuietHoursHttpDTO,
  OptOutHttpDTO,
  OptInHttpDTO,
} from '../../dtos/requests/preference/preference.http-dto.js';
import { PreferenceControllerMapper } from '../../mappers/preference.controller.mapper.js';

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

  @Get()
  @ApiOperation({ summary: 'Get current user preferences' })
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferenceQuery(user.userId));
  }

  @Get('public')
  @ApiOperation({ summary: 'Get public preferences view' })
  async getPublic(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferencePublicQuery(user.userId));
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update preferences (channel/category/quiet hours)' })
  async update(
    @Body() dto: UpdatePreferenceHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePreferenceCommand(PreferenceControllerMapper.toUpdateAppDto(user.userId, dto)),
    );
  }

  @Post('toggle-channel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enable/disable a channel' })
  async toggleChannel(
    @Body() dto: ToggleChannelHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ToggleChannelCommand(PreferenceControllerMapper.toToggleChannelAppDto(user.userId, dto)),
    );
  }

  @Post('toggle-category')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enable/disable a category' })
  async toggleCategory(
    @Body() dto: ToggleCategoryHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ToggleCategoryCommand(PreferenceControllerMapper.toToggleCategoryAppDto(user.userId, dto)),
    );
  }

  @Post('quiet-hours')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update quiet hours' })
  async updateQuietHours(
    @Body() dto: UpdateQuietHoursHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateQuietHoursCommand(PreferenceControllerMapper.toQuietHoursAppDto(user.userId, dto)),
    );
  }

  @Post('opt-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Opt out of a scope (channel/category)' })
  async optOut(
    @Body() dto: OptOutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new OptOutCommand(PreferenceControllerMapper.toOptOutAppDto(user.userId, dto)),
    );
  }

  @Post('opt-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Opt back in to a scope' })
  async optIn(
    @Body() dto: OptInHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new OptInCommand(PreferenceControllerMapper.toOptInAppDto(user.userId, dto)),
    );
  }
}
