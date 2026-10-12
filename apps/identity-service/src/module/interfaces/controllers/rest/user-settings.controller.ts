/**
 * User Settings Controller
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { UpdateSettingsCommand } from '../../../application/commands/user/update-settings.command.js';
import { GetUserSettingsNewQuery } from '../../../application/queries/settings/get-user-settings.query.js';

import { UpdateSettingsHttpDTO } from '../../dtos/requests/update-settings.request.dto.js';
import type { UserSettingsHttpResponseDTO } from '../../dtos/responses/settings.response.dto.js';

import { SettingsControllerMapper } from '../../mappers/settings.controller.mapper.js';

@ApiTags('user-settings')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/settings')
export class UserSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user settings' })
  async get(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserSettingsHttpResponseDTO | null> {
    const result = await this.queryBus.execute(new GetUserSettingsNewQuery(user.userId));
    return SettingsControllerMapper.toHttpResponse(result);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user settings' })
  async update(
    @Body() dto: UpdateSettingsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserSettingsHttpResponseDTO | null> {
    const appDto = SettingsControllerMapper.toUpdateAppDto(dto);
    const result = await this.commandBus.execute(
      new UpdateSettingsCommand(user.userId, appDto as never),
    );
    return SettingsControllerMapper.toHttpResponse(result);
  }
}
