import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Public,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { SsoLoginCommand } from '../../../application/commands/auth/sso-login.command';
import { SsoCallbackCommand } from '../../../application/commands/auth/sso-callback.command';
import {
  SsoLoginRequestDTO,
  SsoCallbackRequestDTO,
  SsoLinkRequestDTO,
  SsoUnlinkRequestDTO,
} from '../../dtos/requests/sso.request.dto';

@ApiTags('SSO')
@Controller('auth/sso')
export class AuthSsoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SsoLoginRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SsoLoginCommand(body.provider, body.externalId),
    );
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: SsoCallbackRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SsoCallbackCommand(body.provider, body.token),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('link')
  @HttpCode(HttpStatus.NO_CONTENT)
  async link(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SsoLinkRequestDTO,
  ): Promise<void> {
    void this.commandBus;
    void user.userId;
    void body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('unlink')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlink(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SsoUnlinkRequestDTO,
  ): Promise<void> {
    void this.commandBus;
    void user.userId;
    void body;
  }
}
