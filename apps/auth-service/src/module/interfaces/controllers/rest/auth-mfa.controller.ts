import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { EnableMfaCommand } from '../../../application/commands/auth/enable-mfa.command';
import { DisableMfaCommand } from '../../../application/commands/auth/disable-mfa.command';
import { VerifyMfaCommand } from '../../../application/commands/auth/verify-mfa.command';
import { GetAuthMfaSettingsQuery } from '../../../application/queries/auth/get-auth-mfa-settings.query';
import { GetAuthRecoveryCodesQuery } from '../../../application/queries/auth/get-auth-recovery-codes.query';
import {
  MfaEnableRequestDTO,
  MfaVerifyRequestDTO,
} from '../../dtos/requests/mfa.request.dto';

@ApiTags('MFA')
@Controller('auth/mfa')
@UseGuards(JwtAuthGuard)
export class AuthMfaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get('settings')
  async getSettings(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetAuthMfaSettingsQuery(user.userId));
  }

  @Get('recovery-codes')
  async getRecoveryCodes(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetAuthRecoveryCodesQuery(user.userId));
  }
}
