/**
 * AuthMfaController — REST endpoints for MFA
 * @module identity-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { EnableMfaCommand } from '../../../application/commands/auth/enable-mfa.command.js';
import { DisableMfaCommand } from '../../../application/commands/auth/disable-mfa.command.js';
import { VerifyMfaCommand } from '../../../application/commands/auth/verify-mfa.command.js';
import { SetupMfaCommand } from '../../../application/commands/auth/setup-mfa.command.js';
import { VerifyBackupCodeCommand } from '../../../application/commands/auth/verify-backup-code.command.js';

import { GetAuthMfaSettingsQuery } from '../../../application/queries/auth/get-auth-mfa-settings.query.js';
import { GetAuthRecoveryCodesQuery } from '../../../application/queries/auth/get-auth-recovery-codes.query.js';

import { EnableMfaHttpDTO, DisableMfaHttpDTO } from '../../dtos/requests/auth/enable-mfa.request.dto.js';
import { VerifyMfaHttpDTO } from '../../dtos/requests/auth/verify-mfa.request.dto.js';
import { SetupMfaHttpDTO } from '../../dtos/requests/auth/setup-mfa.request.dto.js';
import { VerifyBackupCodeHttpDTO } from '../../dtos/requests/auth/verify-backup-code.request.dto.js';

import type {
  MfaSetupHttpResponseDTO,
  MfaVerifyHttpResponseDTO,
  MfaDisableHttpResponseDTO,
} from '../../dtos/responses/mfa/index.js';

import { AuthMfaControllerMapper } from '../../mappers/auth-mfa.controller.mapper.js';
import {
  ApiMfaTag,
  ApiSetupMfa,
  ApiVerifyMfa,
  ApiEnableMfa,
  ApiDisableMfa,
} from '../../swagger/auth-mfa.swagger.js';

@ApiMfaTag()
@UseGuards(JwtAuthGuard)
@Controller('auth/mfa')
export class AuthMfaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('setup')
  @HttpCode(HttpStatus.OK)
  @ApiSetupMfa()
  async setup(
    @Body() dto: SetupMfaHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MfaSetupHttpResponseDTO> {
    const appDto = AuthMfaControllerMapper.toSetupAppDto(dto);
    const result = await this.commandBus.execute(
      new SetupMfaCommand(user.userId, appDto as never),
    );
    return AuthMfaControllerMapper.toSetupHttpResponse(result);
  }

  @Post('enable')
  @HttpCode(HttpStatus.OK)
  @ApiEnableMfa()
  async enable(
    @Body() dto: EnableMfaHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; enabled: boolean }> {
    const appDto = AuthMfaControllerMapper.toEnableAppDto(dto);
    return this.commandBus.execute(new EnableMfaCommand(user.userId, appDto as never));
  }

  @Post('disable')
  @HttpCode(HttpStatus.OK)
  @ApiDisableMfa()
  async disable(
    @Body() dto: DisableMfaHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MfaDisableHttpResponseDTO> {
    const appDto = AuthMfaControllerMapper.toDisableAppDto(dto);
    await this.commandBus.execute(new DisableMfaCommand(user.userId, appDto as never));
    return AuthMfaControllerMapper.toDisableHttpResponse();
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiVerifyMfa()
  async verify(@Body() dto: VerifyMfaHttpDTO): Promise<MfaVerifyHttpResponseDTO> {
    const appDto = AuthMfaControllerMapper.toVerifyAppDto(dto);
    const result = await this.commandBus.execute(new VerifyMfaCommand(appDto as never));
    return AuthMfaControllerMapper.toVerifyHttpResponse(result);
  }

  @Post('verify-backup-code')
  @HttpCode(HttpStatus.OK)
  async verifyBackupCode(
    @Body() dto: VerifyBackupCodeHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; verified: boolean }> {
    const appDto = AuthMfaControllerMapper.toVerifyBackupCodeAppDto(dto);
    return this.commandBus.execute(
      new VerifyBackupCodeCommand(user.userId, appDto as never),
    );
  }

  @Get('settings')
  async getSettings(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; enabled: boolean; primaryMethod?: string }> {
    return this.queryBus.execute(new GetAuthMfaSettingsQuery(user.userId));
  }

  @Get('recovery-codes')
  async getRecoveryCodes(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ total: number; remaining: number; used: number }> {
    return this.queryBus.execute(new GetAuthRecoveryCodesQuery(user.userId));
  }
}
