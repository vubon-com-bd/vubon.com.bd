/**
 * AuthSsoController — REST endpoints for SSO
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { SsoLoginCommand } from '../../../application/commands/auth/sso-login.command.js';
import { SsoCallbackCommand } from '../../../application/commands/auth/sso-callback.command.js';

import { SsoLoginHttpDTO } from '../../dtos/requests/auth/sso-login.request.dto.js';
import { SsoCallbackHttpDTO } from '../../dtos/requests/auth/sso-callback.request.dto.js';

import type { SsoLoginHttpResponseDTO } from '../../dtos/responses/sso/sso-login.response.dto.js';

import { AuthSsoControllerMapper } from '../../mappers/auth-sso.controller.mapper.js';

@ApiTags('auth-sso')
@Controller('auth/sso')
export class AuthSsoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSO login' })
  async login(@Body() dto: SsoLoginHttpDTO): Promise<SsoLoginHttpResponseDTO> {
    const appDto = AuthSsoControllerMapper.toLoginAppDto(dto);
    const result = await this.commandBus.execute(new SsoLoginCommand(appDto as never));
    return AuthSsoControllerMapper.toHttpResponse(result);
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'SSO callback' })
  async callback(@Body() dto: SsoCallbackHttpDTO): Promise<SsoLoginHttpResponseDTO> {
    const appDto = AuthSsoControllerMapper.toLoginAppDto(dto);
    const result = await this.commandBus.execute(new SsoCallbackCommand(appDto as never));
    return AuthSsoControllerMapper.toHttpResponse(result);
  }
}
