/**
 * AuthSocialController — REST endpoints for social login
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  Public,
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { SocialLoginCommand } from '../../../application/commands/auth/social-login.command.js';
import { LinkSocialCommand } from '../../../application/commands/auth/link-social.command.js';
import { UnlinkSocialCommand } from '../../../application/commands/auth/unlink-social.command.js';

import { SocialLoginHttpDTO } from '../../dtos/requests/auth/social-login.request.dto.js';
import { LinkSocialHttpDTO } from '../../dtos/requests/auth/link-social.request.dto.js';
import { UnlinkSocialHttpDTO } from '../../dtos/requests/auth/unlink-social.request.dto.js';

import type { SocialLoginHttpResponseDTO } from '../../dtos/responses/social/social-login.response.dto.js';

import { AuthSocialControllerMapper } from '../../mappers/auth-social.controller.mapper.js';

@ApiTags('auth-social')
@Controller('auth/social')
export class AuthSocialController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Social login' })
  async login(@Body() dto: SocialLoginHttpDTO): Promise<SocialLoginHttpResponseDTO> {
    const appDto = AuthSocialControllerMapper.toLoginAppDto(dto);
    const result = await this.commandBus.execute(new SocialLoginCommand(appDto as never));
    return AuthSocialControllerMapper.toHttpResponse(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('link')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Link social account' })
  async link(
    @Body() dto: LinkSocialHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; linked: boolean }> {
    const appDto = AuthSocialControllerMapper.toLinkAppDto(dto);
    return this.commandBus.execute(new LinkSocialCommand(user.userId, appDto as never));
  }

  @UseGuards(JwtAuthGuard)
  @Post('unlink')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Unlink social account' })
  async unlink(
    @Body() dto: UnlinkSocialHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; unlinked: boolean }> {
    const appDto = AuthSocialControllerMapper.toUnlinkAppDto(dto);
    return this.commandBus.execute(new UnlinkSocialCommand(user.userId, appDto as never));
  }
}
