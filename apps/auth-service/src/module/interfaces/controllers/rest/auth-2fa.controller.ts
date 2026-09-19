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
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { EnableMfaCommand } from '../../../application/commands/auth/enable-mfa.command';
import { DisableMfaCommand } from '../../../application/commands/auth/disable-mfa.command';
import { VerifyMfaCommand } from '../../../application/commands/auth/verify-mfa.command';
import {
  MfaEnableRequestDTO,
  MfaVerifyRequestDTO,
} from '../../dtos/requests/mfa.request.dto';

@ApiTags('2FA')
@Controller('auth/2fa')
@UseGuards(JwtAuthGuard)
export class Auth2FaController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('enable')
  async enable(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: MfaEnableRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(new EnableMfaCommand(user.userId, body.method));
  }

  @Delete('disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(@CurrentUser() user: CurrentUserShape): Promise<void> {
    return this.commandBus.execute(new DisableMfaCommand(user.userId));
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: MfaVerifyRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(new VerifyMfaCommand(user.userId, body.code));
  }
}
