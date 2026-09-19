import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { SocialCallbackCommand } from '../../../application/commands/auth/social-callback.command';

interface OAuthAuthorizeRequest {
  provider: string;
  scope: string;
}

interface OAuthCallbackRequest {
  provider: string;
  code: string;
  state: string;
}

@ApiTags('OAuth')
@Controller('auth/oauth')
export class AuthOAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('authorize')
  @HttpCode(HttpStatus.OK)
  async authorize(@Body() body: OAuthAuthorizeRequest): Promise<{ url: string; state: string }> {
    const state = `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    return {
      url: `https://oauth.example.com/${body.provider}/authorize?state=${state}&scope=${encodeURIComponent(body.scope)}`,
      state,
    };
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: OAuthCallbackRequest): Promise<unknown> {
    return this.commandBus.execute(
      new SocialCallbackCommand(body.provider, body.code, body.state),
    );
  }
}
