import {
  Body,
  Controller,
  Delete,
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
import { SocialLoginCommand } from '../../../application/commands/auth/social-login.command';
import { SocialCallbackCommand } from '../../../application/commands/auth/social-callback.command';
import { LinkSocialCommand } from '../../../application/commands/auth/link-social.command';
import { UnlinkSocialCommand } from '../../../application/commands/auth/unlink-social.command';
import {
  SocialLoginRequestDTO,
  SocialLinkRequestDTO,
  SocialUnlinkRequestDTO,
  SocialCallbackRequestDTO,
} from '../../dtos/requests/social.request.dto';

@ApiTags('Social')
@Controller('auth/social')
export class AuthSocialController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: SocialLoginRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SocialLoginCommand(body.provider, body.providerUserId),
    );
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: SocialCallbackRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SocialCallbackCommand(body.provider, body.code, body.state),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('link')
  @HttpCode(HttpStatus.NO_CONTENT)
  async link(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SocialLinkRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(
      new LinkSocialCommand(user.userId, body.provider, body.providerUserId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unlink')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlink(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SocialUnlinkRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(
      new UnlinkSocialCommand(user.userId, body.provider),
    );
  }
}
