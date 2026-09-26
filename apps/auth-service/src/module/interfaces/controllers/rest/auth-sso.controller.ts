/**
 * AuthSsoController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Post, Body, HttpCode, HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';

import { SsoLoginCommand } from '../../../application/commands/auth/sso-login.command';
import { SsoCallbackCommand } from '../../../application/commands/auth/sso-callback.command';
import {
  SsoLoginRequestDTO,
  SsoCallbackRequestDTO,
} from '../../dtos/requests/sso.request.dto';

@ApiTags('Auth SSO')
@Controller('auth/sso')
export class AuthSsoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SsoLoginRequestDTO) {
    return this.commandBus.execute(
      new SsoLoginCommand({
        providerId: body.provider,
        relayState: body.tenantId,
        returnUrl: body.redirectUri,
      } as never),
    );
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: SsoCallbackRequestDTO) {
    return this.commandBus.execute(
      new SsoCallbackCommand({
        provider: body.provider,
        tenantId: body.tenantId,
        samlResponse: body.samlResponse,
        code: body.code,
        state: body.state,
      } as never),
    );
  }
}
