/**
 * AuthSettingsController — REST endpoints for settings
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { UpdateAuthSettingsCommand } from '../../../application/commands/settings/update-auth-settings.command.js';
import { GetAuthSettingsQuery } from '../../../application/queries/auth/get-auth-settings.query.js';

import { UpdateAuthSettingsHttpDTO } from '../../dtos/requests/settings/update-auth-settings.request.dto.js';

import type { AuthSettingsHttpResponseDTO } from '../../dtos/responses/settings/auth-settings.response.dto.js';

import { AuthSettingsControllerMapper } from '../../mappers/auth-settings.controller.mapper.js';

@ApiTags('auth-settings')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/settings')
export class AuthSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get auth settings' })
  async get(): Promise<AuthSettingsHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetAuthSettingsQuery());
    return AuthSettingsControllerMapper.toHttpResponse(app);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update auth settings' })
  async update(
    @Body() dto: UpdateAuthSettingsHttpDTO,
  ): Promise<AuthSettingsHttpResponseDTO> {
    const appDto = AuthSettingsControllerMapper.toUpdateAppDto(dto);
    const result = await this.commandBus.execute(
      new UpdateAuthSettingsCommand(appDto as never),
    );
    return AuthSettingsControllerMapper.toHttpResponse(result);
  }
}
