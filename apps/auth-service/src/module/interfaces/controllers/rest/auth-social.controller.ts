/**
 * AuthSocialController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Post, Delete, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '@vubon/shared-kernel/interfaces';

import { SocialLoginCommand } from '../../../application/commands/auth/social-login.command';
import { SocialCallbackCommand } from '../../../application/commands/auth/social-callback.command';
import { LinkSocialCommand } from '../../../application/commands/auth/link-social.command';
import { UnlinkSocialCommand } from '../../../application/commands/auth/unlink-social.command';
import type { UserId } from '@vubon/shared-types/common';

import {
  SocialLoginRequestDTO,
  SocialCallbackRequestDTO,
  LinkSocialRequestDTO,
  UnlinkSocialRequestDTO,
} from '../../dtos/requests/social.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Social')
@Controller('auth/social')
export class AuthSocialController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SocialLoginRequestDTO) {
    // Initiate social login — only provider + redirect needed here.
    return this.commandBus.execute(
      new SocialLoginCommand({
        provider: body.provider,
        redirectUri: body.redirectUri ?? '',
        deviceId: body.deviceId,
      } as never),
    );
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: SocialCallbackRequestDTO) {
    return this.commandBus.execute(
      new SocialCallbackCommand({
        provider: body.provider,
        code: body.code,
        state: body.state,
        deviceId: body.deviceId,
      } as never),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('link')
  @HttpCode(HttpStatus.NO_CONTENT)
  async link(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: LinkSocialRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new LinkSocialCommand(user.id as UserId, {
        provider: body.provider,
        accessToken: body.accessToken,
        refreshToken: undefined,
        providerUserId: body.providerUserId,
        scopes: body.scopes,
      } as never),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unlink')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlink(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UnlinkSocialRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new UnlinkSocialCommand(user.id as UserId, {
        provider: body.provider,
        password: body.password,
      } as never),
    );
  }
}
