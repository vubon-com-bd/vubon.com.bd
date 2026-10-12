/**
 * User Preferences Controller
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { UpdatePreferencesCommand } from '../../../application/commands/user/update-preferences.command.js';
import { ResetPreferencesCommand } from '../../../application/commands/preferences/reset-preferences.command.js';

import { GetPreferencesQuery } from '../../../application/queries/preferences/get-preferences.query.js';

import { UpdatePreferencesHttpDTO } from '../../dtos/requests/update-preferences.request.dto.js';
import { ResetPreferencesHttpDTO } from '../../dtos/requests/reset-preferences.request.dto.js';

import type { PreferencesHttpResponseDTO } from '../../dtos/responses/preferences.response.dto.js';

import { PreferencesControllerMapper } from '../../mappers/preferences.controller.mapper.js';

@ApiTags('user-preferences')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/preferences')
export class UserPreferencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user preferences' })
  async get(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PreferencesHttpResponseDTO | null> {
    const result = await this.queryBus.execute(new GetPreferencesQuery(user.userId));
    return PreferencesControllerMapper.toHttpResponse(result);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user preferences' })
  async update(
    @Body() dto: UpdatePreferencesHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PreferencesHttpResponseDTO | null> {
    const appDto = PreferencesControllerMapper.toUpdateAppDto(dto);
    await this.commandBus.execute(new UpdatePreferencesCommand(user.userId, appDto as never));
    return this.get(user);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset preferences' })
  async reset(
    @Body() dto: ResetPreferencesHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PreferencesHttpResponseDTO | null> {
    await this.commandBus.execute(
      new ResetPreferencesCommand(user.userId, dto.scope ?? 'marketing'),
    );
    return this.get(user);
  }
}
